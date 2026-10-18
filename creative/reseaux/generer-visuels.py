import sys, pathlib
R = pathlib.Path(sys.argv[1]); OUT = pathlib.Path(sys.argv[2])
logo_w = (R/"public/brand/samyo-logo-blanc.svg").read_text().replace('<svg ', '<svg class="logo" ', 1)
fonts = f"""@font-face{{font-family:Bric;src:url(file://{R}/src/fonts/bricolage-grotesque-latin-standard-normal.woff2) format('woff2');font-weight:200 800}}
@font-face{{font-family:Fig;src:url(file://{R}/src/fonts/figtree-latin-wght-normal.woff2) format('woff2');font-weight:300 900}}
*{{margin:0;padding:0;box-sizing:border-box}} html,body{{width:100%;height:100%}} body{{font-family:Fig;overflow:hidden}}"""
van = f"file://{R}/public/media/samyo-van-v3.webp"
BLUE, NIGHT, PIST, AQUA = "#2348C4", "#0F1E4F", "#93C572", "#3EC3D3"

def symbol(stroke="#FFFFFF", dot=AQUA):
    return f'''<svg viewBox="0 0 40 40" class="sym"><path d="M13.4 29.5H24a4.75 4.75 0 0 0 0-9.5h-8a4.75 4.75 0 0 1 0-9.5h10.4" fill="none" stroke="{stroke}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.6" cy="29.5" r="2.35" fill="none" stroke="{stroke}" stroke-width="2"/><circle cx="30.6" cy="10.5" r="3.1" fill="{dot}"/></svg>'''

pages = {}
# 1. Icône profil — bleu (principale)
pages["profil-bleu"] = (1080,1080, f"""<style>{fonts}
body{{background:radial-gradient(120% 120% at 30% 20%, #3159d6 0%, {BLUE} 45%, #1c3aa6 100%);display:grid;place-items:center}}
.sym{{width:620px;height:620px;transform:translate(-8px,6px)}}</style>{symbol()}""")
# 2. Icône profil — blanc
pages["profil-blanc"] = (1080,1080, f"""<style>{fonts}
body{{background:#fff;display:grid;place-items:center}} .sym{{width:620px;height:620px;transform:translate(-8px,6px)}}</style>{symbol(BLUE)}""")
# 3. Icône profil — nuit avec liseré pistache (variante)
pages["profil-nuit"] = (1080,1080, f"""<style>{fonts}
body{{background:{NIGHT};display:grid;place-items:center}} .ring{{position:absolute;inset:60px;border-radius:50%;border:14px solid {PIST}}}
.sym{{width:560px;height:560px;transform:translate(-8px,6px)}}</style><div class="ring"></div>{symbol()}""")

def cover(w, h, title_size, sub_size, pad_left, van_h, van_right, van_bottom, logo_h, extra=""):
    return f"""<style>{fonts}
body{{background:linear-gradient(115deg, {BLUE} 0%, {BLUE} 48%, #1a3699 100%);position:relative}}
.arch{{position:absolute;right:{van_right+van_h*0.25}px;top:{h*0.12}px;width:{van_h*1.25}px;height:{h*1.2}px;border-radius:{van_h}px {van_h}px 0 0;background:linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.03))}}
.van{{position:absolute;right:{van_right}px;bottom:{van_bottom}px;height:{van_h}px;filter:drop-shadow(0 {van_h*0.05}px {van_h*0.06}px rgba(8,16,48,.45))}}
.txt{{position:absolute;left:{pad_left}px;top:50%;transform:translateY(-50%);color:#fff;max-width:{w*0.5}px}}
.logo{{height:{logo_h}px;width:auto;display:block}}
.bar{{width:{title_size*1.4}px;height:{max(6,title_size*0.11)}px;border-radius:99px;background:{PIST};margin:{title_size*0.45}px 0 {title_size*0.4}px}}
h1{{font-family:Bric;font-weight:700;font-size:{title_size}px;line-height:1.02;letter-spacing:-.02em}}
p{{font-size:{sub_size}px;opacity:.85;margin-top:{sub_size*0.6}px;letter-spacing:.01em}}
.pill{{display:inline-flex;gap:{sub_size*0.8}px;margin-top:{sub_size*1.1}px;font-weight:600;font-size:{sub_size}px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);padding:{sub_size*0.45}px {sub_size*1}px;border-radius:99px}}
.pill b{{color:{PIST}}}
.edge{{position:absolute;left:0;right:0;bottom:0;height:{max(6,h*0.018)}px;background:{PIST}}}
{extra}</style>
<div class="arch"></div><img class="van" src="{van}"><div class="edge"></div>"""

# Facebook couverture 1640x624 (affichage 820x312 ; mobile recadre les côtés)
pages["facebook-couverture"] = (1640,624, cover(1640,624,62,23,330,380,80,52,52) + f"""
<div class="txt">{logo_w}<div class="bar"></div><h1>Déménagement<br>&amp; transport<br>de meubles</h1>
<p>Montreuil · Île-de-France · partout en France</p>
<div class="pill"><span>07 44 63 02 06</span><b>•</b><span>samyo-demenagement.com</span></div></div>""")
# LinkedIn couverture entreprise 1128x191 → rendu x2 : 2256x382
pages["linkedin-couverture"] = (2256,382, cover(2256,382,56,24,520,290,130,26,46,
  ".txt{max-width:1200px} h1 br{display:none} .bar{margin:22px 0 18px}") + f"""
<div class="txt">{logo_w}<div class="bar"></div><h1>Déménagement &amp; transport de meubles</h1>
<p>Montreuil · Île-de-France · partout en France — samyo-demenagement.com</p></div>""")
# LinkedIn profil personnel (bannière 1584x396)
pages["linkedin-banniere-profil"] = (1584,396, cover(1584,396,50,21,420,280,70,24,42,
  ".txt{max-width:820px} .bar{margin:18px 0 16px}") + f"""
<div class="txt">{logo_w}<div class="bar"></div><h1>Déménagement &amp; transport<br>de meubles</h1>
<p>Montreuil · Île-de-France · partout en France</p></div>""")

for name,(w,h,body) in pages.items():
    (OUT/f"{name}.html").write_text(f"<!doctype html><html><head><meta charset='utf-8'></head><body>{body}</body></html>")
    print(name, w, h)
