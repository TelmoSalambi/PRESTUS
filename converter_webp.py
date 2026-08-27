# -*- coding: utf-8 -*-
"""Converte as imagens pesadas do site PRESTUS para WebP (com redimensionamento)."""
import os
from PIL import Image

IMG = "IMG"
QUALITY = 82

# ficheiro -> largura máxima
IMAGENS = {
    "Banner 01.jpg": 1920,                                   # hero (PT/EN)
    "Quem somos.png": 1400,                                  # Quem Somos (PT)
    "Gemini_Generated_Image_adhk5hadhk5hadhk.png": 1400,     # Quem Somos (EN)
    "Construção Civil.png": 1200,
    "Fiscalização.png": 1200,
    "Saúde.png": 1200,
    "Limpeza.png": 1200,
    "Gemini_Generated_Image_8jf59h8jf59h8jf5.png": 1200,     # Informática
    "Escritório.png": 1200,
    "Gemini_Generated_Image_nubrncnubrncnubr.png": 1200,     # Bens e Serviços
    "Merenda Escolar.png": 1200,
    "Logística.png": 1200,
    "Pesca.png": 1200,
}

total_antes = 0
total_depois = 0

for nome, max_larg in IMAGENS.items():
    origem = os.path.join(IMG, nome)
    if not os.path.exists(origem):
        print(f"FALTA: {nome}")
        continue
    destino = os.path.join(IMG, os.path.splitext(nome)[0] + ".webp")
    with Image.open(origem) as im:
        im = im.convert("RGB")
        if im.width > max_larg:
            nova_alt = round(im.height * max_larg / im.width)
            im = im.resize((max_larg, nova_alt), Image.LANCZOS)
        im.save(destino, "WEBP", quality=QUALITY, method=6)
    a = os.path.getsize(origem) // 1024
    d = os.path.getsize(destino) // 1024
    total_antes += a
    total_depois += d
    print(f"{nome}: {a} KB -> {os.path.basename(destino)}: {d} KB")

print(f"\nTOTAL: {total_antes} KB -> {total_depois} KB "
      f"({100 - round(total_depois / total_antes * 100)}% mais leve)")
