"""Generuje src/data/zones-map.json: mapę stref dojazdu z prawdziwych granic gmin.

Źródło granic: Geoportal (PRG), przez github.com/waszkiewiczja/GeoJSON-Polska-Wojewodztwa-Powiaty-Gminy
(gminy.json, polska.json; WGS84, uproszczone). Uruchomienie:
    python3 scripts/build-zones-map.py <katalog z gminy.json i polska.json>
Strefa 1 = gminy z ZONE1 (jak w config.ts i w Dyspozytorze). Strefa 2 = reszta Polski do 30 km od Jeleniej Góry.
"""
import json, math, sys
from shapely.geometry import shape, Point, Polygon, box, mapping
from shapely.ops import unary_union
import shapely

SRC = sys.argv[1]
OUT = 'src/data/zones-map.json'
LAT0, LNG0 = 50.9044, 15.7194          # Jelenia Góra
KX = math.cos(math.radians(LAT0)) * 111.32
KY = 110.57
W, H = 800, 640
RADIUS_KM = 15                          # promień dojazdu (w linii prostej od centrum Jeleniej Góry), jak w config.ts
S = 12                                  # pikseli na kilometr
S_KONTURY = 8.4                         # skala, w której zapisane są kontury w scripts/data (przeliczane niżej)
CX, CY = W / 2, H / 2 - 6
ZONE1 = {'0261011', '0206082', '0206072', '0206031', '0206062', '0206092'}
# Strefa 2 w całości, także poza promieniem: gminy miejskie Szklarska Poręba (z Jakuszycami), Karpacz i Kowary
ZONE2_EXTRA = {'0206041', '0206011', '0206021'}

def proj(lng, lat, z=None):
    return (CX + (lng - LNG0) * KX * S, CY + (LAT0 - lat) * KY * S)

def to_px(geom):
    return shapely.transform(geom, lambda c: [proj(x, y) for x, y in c])

view = box(-4, -4, W + 4, H + 4)

def path(geom, prec=0):
    geom = geom.intersection(view)
    polys = [geom] if geom.geom_type == 'Polygon' else [g for g in getattr(geom, 'geoms', []) if g.geom_type == 'Polygon']
    out = []
    for p in polys:
        for ring in [p.exterior, *p.interiors]:
            pts = list(ring.coords)
            if len(pts) < 3: continue
            seq = [f'{x:.{prec}f},{y:.{prec}f}' for x, y in pts[:-1]]
            seq = [c for i, c in enumerate(seq) if i == 0 or c != seq[i - 1]]   # bez powtórzeń po zaokrągleniu
            out.append('M' + 'L'.join(seq) + 'Z')
    return ''.join(out)

gm = json.load(open(f'{SRC}/gminy.json'))
pl = json.load(open(f'{SRC}/polska.json'))
poland = to_px(unary_union([shape(f['geometry']) for f in pl['features']])).buffer(0)

gminas, z1, z2x, gm_labels = [], [], [], []
# Miejsca podpisów gmin strefy 1 (lng, lat), gdy środek kształtu wypada niezręcznie
GM_LABEL = {'0206031': (15.600, 50.857), '0206092': (15.620, 50.935)}   # Piechowice, Stara Kamienica
for f in gm['features']:
    g = to_px(shape(f['geometry'])).buffer(0)
    if not g.intersects(view): continue
    code = f['properties']['JPT_KOD_JE']
    gminas.append({'name': f['properties']['JPT_NAZWA_'], 'zone1': code in ZONE1, 'd': path(g)})
    if code in ZONE2_EXTRA: z2x.append(g)
    if code in ZONE1:
        z1.append(g)
        if code != '0261011':   # miasto Jelenia Góra ma własny podpis
            pt = g.representative_point() if code not in GM_LABEL else Point(proj(*GM_LABEL[code]))
            assert g.buffer(1).contains(pt), f['properties']['JPT_NAZWA_']
            gm_labels.append({'name': f['properties']['JPT_NAZWA_'], 'x': round(pt.x, 1), 'y': round(pt.y, 1)})

zone1 = unary_union(z1).buffer(0)
circle = Point(CX, CY).buffer(RADIUS_KM * S, 128)
zone2 = unary_union([circle, *z2x]).intersection(poland).difference(zone1).buffer(0)
outside = box(0, 0, W, H).difference(poland)

# Miejscowości do wyszukiwarki i na mapę (współrzędne jak w Dyspozytorze, lib/area.ts).
# Strefa liczona z geometrii: punkt w gminach strefy 1 → 1, w strefie 2 (okrąg i Szklarska Poręba) → 2, dalej → 0:
# tam nie dojeżdżam (miejscowości 0 są tylko w wyszukiwarce, nie na mapie).
# side: podpis po prawej (start), po lewej (end) albo pod punktem (below); major: podpis zawsze widoczny (pozostałe tylko po wybraniu w wyszukiwarce)
TOWNS = [
    ('Jelenia Góra', 50.9044, 15.7194, 'start', True), ('Cieplice', 50.865, 15.678, 'end', False),
    ('Sobieszów', 50.862, 15.645, 'end', False), ('Jagniątków', 50.8346, 15.6098, 'end', False),
    ('Podgórzyn', 50.8331, 15.6797, 'start', False), ('Przesieka', 50.8165, 15.6347, 'end', False),
    ('Sosnówka', 50.8236, 15.7175, 'start', False), ('Miłków', 50.8075, 15.7317, 'start', False),
    ('Ściegny', 50.8, 15.735, 'start', False), ('Zachełmie', 50.8274, 15.6545, 'end', False),
    ('Borowice', 50.7833, 15.6833, 'end', False), ('Staniszów', 50.8686, 15.7339, 'start', False),
    ('Mysłakowice', 50.8435, 15.7854, 'start', False), ('Łomnica', 50.8647, 15.7717, 'start', False),
    ('Piechowice', 50.8503, 15.5891, 'end', False), ('Jeżów Sudecki', 50.9417, 15.7086, 'end', False),
    ('Stara Kamienica', 50.9204, 15.6016, 'end', False), ('Wojcieszyce', 50.8706, 15.6197, 'end', False),
    ('Karpacz', 50.7766, 15.7556, 'end', True), ('Kowary', 50.7929, 15.8356, 'start', True),
    ('Szklarska Poręba', 50.8273, 15.523, 'start', True), ('Świeradów-Zdrój', 50.9091, 15.3366, 'start', False),
    ('Janowice Wielkie', 50.881, 15.925, 'end', True), ('Mirsk', 50.9706, 15.3856, 'start', False),
    ('Gryfów Śląski', 51.0302, 15.42, 'start', False), ('Lubomierz', 51.0122, 15.5094, 'start', False),
    ('Wleń', 51.0153, 15.6739, 'start', True), ('Lwówek Śląski', 51.1103, 15.5869, 'start', False),
    ('Kamienna Góra', 50.7836, 16.0303, 'below', False), ('Bolków', 50.9223, 16.1006, 'end', False),
    ('Lubawka', 50.7044, 15.9997, 'end', False), ('Złotoryja', 51.1266, 15.9198, 'end', False),
]
towns = []
for name, lat, lng, side, major in TOWNS:
    x, y = proj(lng, lat)
    p_ = Point(x, y)
    zone = 1 if zone1.buffer(0.5).contains(p_) else (2 if zone2.buffer(0.5).contains(p_) else 0)
    towns.append({'name': name, 'x': round(x, 1), 'y': round(y, 1), 'side': side, 'major': major, 'zone': zone})
EXPECT1 = {'Jelenia Góra', 'Cieplice', 'Sobieszów', 'Jagniątków', 'Podgórzyn', 'Przesieka', 'Sosnówka', 'Miłków', 'Ściegny',
           'Zachełmie', 'Borowice', 'Staniszów', 'Mysłakowice', 'Łomnica', 'Piechowice', 'Jeżów Sudecki', 'Stara Kamienica', 'Wojcieszyce'}
for t in towns:
    if (t['zone'] == 1) != (t['name'] in EXPECT1): print('UWAGA, strefa z mapy inna niż w tabeli:', t['name'], t['zone'])
# Kontury miejscowości (granice administracyjne z OpenStreetMap, przez Nominatim; już w pikselach tej mapy,
# ten sam rzut co wyżej). Plik: scripts/data/kontury-miejscowosci.tsv (nazwa, relacja OSM, punkty x y …, wielokąty po „|”)
import os
KONTURY = os.path.join(os.path.dirname(__file__), 'data', 'kontury-miejscowosci.tsv')
shapes = {}
K = S / S_KONTURY
for line in open(KONTURY, encoding='utf-8'):
    if not line.strip(): continue
    name, osm, pts = line.rstrip('\n').split('\t')
    d = ''
    for part in pts.split('|'):
        n = [float(v) for v in part.split()]
        n = [(CX + (n[i] - CX) * K) if i % 2 == 0 else (CY + (n[i] - CY) * K) for i in range(len(n))]
        d += 'M' + 'L'.join(f'{n[i]:.1f},{n[i + 1]:.1f}' for i in range(0, len(n), 2)) + 'Z'
    shapes[name] = d
    # kontrola: punkt miejscowości leży w jej konturze
    polys = [Polygon([(CX + (float(n[i]) - CX) * K, CY + (float(n[i + 1]) - CY) * K) for i in range(0, len(n), 2)]) for n in (q.split() for q in pts.split('|'))]
    t = next(t for t in towns if t['name'] == name)
    if t['zone'] == 0: continue
    if not any(pl.buffer(3).contains(Point(t['x'], t['y'])) for pl in polys):
        # współrzędne z tabeli wypadają poza granicą wsi: punkt na mapie w środku konturu
        from shapely.ops import polylabel
        c = polylabel(max(polys, key=lambda q: q.area), 0.5)
        print('punkt przesunięty do środka konturu:', name, (t['x'], t['y']), '->', (round(c.x, 1), round(c.y, 1)))
        t['x'], t['y'] = round(c.x, 1), round(c.y, 1)
for t in towns:
    t['c'] = shapes.get(t['name'], '') if t['zone'] else ''
jg = proj(LNG0, LAT0)
sn = proj(15.7399, 50.7360)   # Śnieżka
cz = proj(15.60, 50.748)      # podpis „Czechy”
r = RADIUS_KM * S
nt = (CX + r * math.cos(math.radians(-42)) + 10, CY + r * math.sin(math.radians(-42)) - 4)   # podpis z promieniem tuż za okręgiem
bx0, by0, bx1, by1 = unary_union([circle, zone1, zone2]).bounds
by1 = max(by1, sn[1] + 26)
crop = [round(bx0 - 14), round(by0 - 14), round(bx1 - bx0 + 28), round(by1 - by0 + 28)]

data = {
    'w': W, 'h': H,
    'outside': path(outside),
    'poland': path(poland),
    'gminas': gminas,
    'zone1': path(zone1),
    'zone2': path(zone2),
    'circle': {'cx': CX, 'cy': CY, 'r': r},
    'radiusKm': RADIUS_KM,
    'note': {'x': round(nt[0], 1), 'y': round(nt[1], 1)},
    'crop': crop,
    'jg': {'x': round(jg[0], 1), 'y': round(jg[1], 1)},
    'sniezka': {'x': round(sn[0], 1), 'y': round(sn[1], 1)},
    'czechy': {'x': round(cz[0], 1), 'y': round(cz[1], 1)},
    'towns': towns,
    'gmLabels': gm_labels,
    'source': 'Granice: Geoportal (PRG) 2025, © OpenStreetMap',
}
json.dump(data, open(OUT, 'w'), ensure_ascii=False, separators=(',', ':'))
print(OUT, len(gminas), 'gmin', round(len(json.dumps(data)) / 1024), 'KB')
