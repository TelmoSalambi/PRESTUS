/**
 * scripts/free-ports.js
 *
 * Libera as portas de desenvolvimento antes de subir a plataforma.
 * Resolve o erro "EADDRINUSE: address already in use" causado por processos
 * node órfãos de execuções anteriores (dev server travado, terminal fechado
 * sem Ctrl+C, etc.).
 *
 * Cross-platform: funciona em Windows, macOS e Linux.
 * Uso: node scripts/free-ports.js
 */

import net from 'node:net';
import { execSync } from 'node:child_process';

const PORTS = [5000, 5173];
const isWindows = process.platform === 'win32';

/**
 * Verifica se uma porta está em uso tentando abrir um servidor nela.
 * @param {number} port
 * @returns {Promise<boolean>} true se a porta está ocupada
 */
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close(() => resolve(false));
    });
    server.listen(port);
  });
}

/**
 * Retorna os PIDs dos processos escutando numa porta.
 * @param {number} port
 * @returns {number[]}
 */
function getPidsListeningOnPort(port) {
  try {
    if (isWindows) {
      // netstat -ano: últimas colunas = PID; linhas LISTENING apenas
      const output = execSync(`netstat -ano -p tcp | findstr ":${port} " | findstr "LISTENING"`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      const pids = new Set();
      for (const line of output.split('\n')) {
        const cols = line.trim().split(/\s+/);
        const pid = Number(cols[cols.length - 1]);
        if (Number.isInteger(pid) && pid > 0) pids.add(pid);
      }
      return [...pids];
    }

    // macOS / Linux
    const output = execSync(`lsof -ti tcp:${port} -sTCP:LISTEN 2>/dev/null || true`, {
      shell: '/bin/bash',
      encoding: 'utf8',
    });
    return output
      .split('\n')
      .map((l) => Number(l.trim()))
      .filter((n) => Number.isInteger(n) && n > 0);
  } catch {
    // findstr sai com código 1 quando não encontra nada — consideramos porta livre
    return [];
  }
}

/**
 * Retorna o nome do executável de um PID (para não matar processos não-node).
 * @param {number} pid
 * @returns {string|null}
 */
function getProcessName(pid) {
  try {
    if (isWindows) {
      const out = execSync(`tasklist //FI "PID eq ${pid}" //FO CSV //NH`, { encoding: 'utf8' });
      const first = out.split('\n').find((l) => l.trim().length > 0);
      if (!first) return null;
      return first.split(',')[0]?.replaceAll('"', '').trim().toLowerCase() ?? null;
    }
    const out = execSync(`ps -o comm= -p ${pid}`, { encoding: 'utf8' });
    return out.trim().split('/').pop().toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Mata um PID de forma cross-platform.
 * @param {number} pid
 */
function killPid(pid) {
  try {
    if (isWindows) {
      execSync(`taskkill //F //T //PID ${pid}`, { stdio: 'ignore' });
    } else {
      execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
    }
  } catch {
    /* processo já saiu ou sem permissão */
  }
}

async function main() {
  console.log('🔍 Verificando portas de desenvolvimento (5000, 5173)...');

  for (const port of PORTS) {
    if (!(await isPortInUse(port))) {
      console.log(`✅ Porta ${port} livre.`);
      continue;
    }

    const pids = getPidsListeningOnPort(port);
    if (pids.length === 0) {
      console.log(`⚠️  Porta ${port} ocupada, mas nenhum PID identificado. Prosseguindo...`);
      continue;
    }

    for (const finalPid of pids) {
      const name = getProcessName(finalPid);
      // Segurança: só matamos processos node (o dev server sempre é node).
      if (name && !name.includes('node')) {
        console.log(
          `⏭️  Porta ${port} ocupada por "${name}" (PID ${finalPid}) — não é um processo node, não vamos matar.`
        );
        continue;
      }
      console.log(`🧹 Liberando porta ${port}: finalizando processo node órfão (PID ${finalPid})...`);
      killPid(finalPid);
    }

    // Revalida após cleanup
    if (await isPortInUse(port)) {
      console.log(`❌ Porta ${port} AINDA ocupada após cleanup. Feche o processo manualmente.`);
      process.exitCode = 1;
    } else {
      console.log(`✅ Porta ${port} liberada.`);
    }
  }
}

main();
