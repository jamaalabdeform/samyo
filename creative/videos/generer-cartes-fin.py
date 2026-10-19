import sys, pathlib
R = pathlib.Path(sys.argv[1]); OUT = pathlib.Path(sys.argv[2])
logo_w = (R/"public/brand/samyo-logo-blanc.svg").read_text().replace('<svg ', '<svg class="logo" ', 1)
fonts = f"""@font-face{{font-family:Bric;src:url(file://{R}/src/fonts/bricolage-grotesque-latin-standard-normal.woff2) format('woff2');font-weight:200 800}}
@font-face{{font-family:Fig;src:url(file://{R}/src/fonts/figtree-latin-wght-normal.woff2) format('woff2');font-weight:300 900}}
*{{margin:0;padding:0;box-sizing:border-box}} html,body{{width:100%;height:100%}} body{{font-family:Fig;overflow:hidden}}"""
def card(w, h, u):  # u = unité de base
    return f"""<style>{fonts}
body{{background:radial-gradient(120% 90% at 30% 20%, #3159d6 0%, #2348C4 45%, #1a3699 100%);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}}
.logo{{height:{u*2.6}px;width:auto}}
.bar{{width:{u*4}px;height:{u*0.32}px;border-radius:99px;background:#93C572;margin:{u*1.4}px 0 {u*1.2}px}}
h1{{font-family:Bric;font-weight:700;font-size:{u*2.3}px;line-height:1.05;letter-spacing:-.02em;max-width:{w*0.86}px}}
p{{font-size:{u*1.05}px;opacity:.85;margin-top:{u*0.7}px}}
.cta{{margin-top:{u*1.6}px;background:#fff;color:#0F1E4F;font-weight:700;font-size:{u*1.15}px;padding:{u*0.7}px {u*1.6}px;border-radius:99px}}
.tel{{margin-top:{u*0.9}px;font-weight:600;font-size:{u*1.05}px}}
.edge{{position:absolute;left:0;right:0;bottom:0;height:{u*0.35}px;background:#93C572}}</style>
{logo_w}<div class="bar"></div><h1>Déménagement &amp; transport de meubles</h1>
<p>Montreuil · Île-de-France · partout en France</p>
<div class="cta">samyo-demenagement.com</div><div class="tel">07 44 63 02 06</div><div class="edge"></div>"""
sizes = {"fin-9x16": (1080,1920,42), "fin-16x9": (1920,1080,34), "fin-1x1": (1080,1080,30), "fin-4x5": (1080,1350,34)}
for n,(w,h,u) in sizes.items():
    (OUT/f"{n}.html").write_text(f"<!doctype html><html><head><meta charset='utf-8'></head><body>{card(w,h,u)}</body></html>")
