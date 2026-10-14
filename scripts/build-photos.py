"""
Prépare les photos client pour le site : floutage des plaques et des
lettrages tiers, recadrage, harmonisation légère, export WebP.
Usage : python3 scripts/build-photos.py <dossier des photos originales>
Sortie : public/media/terrain/*.webp
Les originaux ne sont pas versionnés (photos brutes du client).
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/media/terrain"
SRC = Path(sys.argv[1])

# nom de sortie : (fichier source, zones à flouter (x1,y1,x2,y2), recadrage (x1,y1,x2,y2))
JOBS = {
    "camion-ouvert-materiel": ("camion-samyo-03.jpeg", [(600, 1330, 830, 1405), (150, 1180, 275, 1235)], (215, 395, 1215, 1545)),
    "camion-chargement-lateral": ("camion-samyo-02.jpeg", [(100, 1350, 225, 1430)], (0, 380, 1536, 1600)),
    "camion-caisse": ("camion-samyo-04.jpeg", [(1845, 980, 1980, 1100), (1415, 215, 1800, 400)], (120, 150, 2040, 1450)),
    # hero : intérieur de la caisse chargée, recadré au-dessus de la plaque
    "hero-caisse": ("camion-samyo-03.jpeg", [], (290, 545, 1110, 1310)),
    "camion-face": ("camion-samyo-05.jpeg", [(905, 1488, 1155, 1585), (165, 470, 315, 660)], (90, 230, 1430, 1790)),
}


def blur(im, box):
    region = im.crop(box).filter(ImageFilter.GaussianBlur(18))
    im.paste(region, box)


OUT.mkdir(parents=True, exist_ok=True)
for name, (src, boxes, crop) in JOBS.items():
    im = ImageOps.exif_transpose(Image.open(SRC / src)).convert("RGB")
    for b in boxes:
        blur(im, b)
    im = im.crop(crop)
    # harmonisation douce : un peu moins saturé, un peu plus de contraste
    im = ImageEnhance.Color(im).enhance(0.9)
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im.thumbnail((1600, 1600), Image.LANCZOS)
    im.save(OUT / f"{name}.webp", "WEBP", quality=82, method=6)
    print(name, im.size)
