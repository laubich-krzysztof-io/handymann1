/* =========================================================================
   Strona w układzie referencji: zakładki, łagodne pojawianie się sekcji,
   formularz (WhatsApp / e-mail), pasek szybkiego kontaktu i pływająca karta.
   Bez bibliotek; bez skryptu wszystkie zakładki są widoczne jedna pod drugą.
   ========================================================================= */
const root = document.documentElement;
root.classList.add('js');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Zakładki (role tablist/tab/tabpanel, strzałki, Home/End) ---------- */
type Group = { select: (id: string, focus?: boolean) => void; has: (id: string) => boolean };
const groups: Group[] = [];
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((box) => {
  const tabs = [...box.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...box.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const select = (id: string, focus = false) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t.dataset.tab!));
    t.addEventListener('keydown', (e) => {
      const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      let n = -1;
      if (e.key in keys) n = (i + keys[e.key] + tabs.length) % tabs.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = tabs.length - 1;
      if (n < 0) return;
      e.preventDefault();
      select(tabs[n].dataset.tab!, true);
    });
  });
  // Startowo widać tylko pierwszy panel (markup już to ustawia; tu porządek po ewentualnym powrocie strony)
  const first = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
  if (first) select(first.dataset.tab!);
  groups.push({ select, has: (id) => tabs.some((t) => t.dataset.tab === id) });
});

/** Link do panelu zakładki (np. #opieka, #rachunek): otwiera zakładkę i przewija do niej */
const openFromHash = (hash: string) => {
  const id = decodeURIComponent(hash.replace('#', ''));
  const g = groups.find((x) => x.has(id));
  if (!g) return false;
  g.select(id);
  const panel = document.getElementById(id);
  const box = panel?.closest<HTMLElement>('[data-tabs]');
  box?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  panel?.focus({ preventScroll: true });
  return true;
};
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
  if (!a || a.pathname !== location.pathname) return;
  if (openFromHash(a.hash)) { e.preventDefault(); history.pushState(null, '', a.hash); }
});
if (location.hash) openFromHash(location.hash);
// Wstecz / dalej i wejście z linkiem do konkretnej zakładki
window.addEventListener('hashchange', () => openFromHash(location.hash));

/* ---------- Łagodne pojawianie się przy przewijaniu ---------- */
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (!reduce && 'IntersectionObserver' in window) {
  root.classList.add('reveal-on');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
  // Zabezpieczenie: po 4 s wszystko widoczne, nawet jeśli obserwator się nie odezwał
  setTimeout(() => items.forEach((el) => el.classList.add('is-in')), 4000);
}

/* ---------- Formularz: wiadomość do WhatsAppa lub poczty, błędy przy polach ---------- */
const form = document.getElementById('lead') as HTMLFormElement | null;
if (form) {
  const d = form.dataset;
  const field = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  const required = ['name', 'what'];
  const status = form.querySelector<HTMLElement>('.form__status');
  const setError = (n: string, on: boolean) => {
    field(n).setAttribute('aria-invalid', String(on));
    const msg = document.getElementById(`e-${n}`);
    if (msg) msg.hidden = !on;
  };
  const build = () => {
    const f = new FormData(form);
    const line = (label = '', key: string) => `${label}: ${f.get(key) || ''}`;
    return [line(d.lName, 'name'), line(d.lPhone, 'phone'), line(d.lTopic, 'topic'), line(d.lWho, 'who'), line(d.lWhere, 'where'), '', `${d.lWhat}:`, `${f.get('what') || ''}`].join('\n');
  };
  const valid = () => {
    const empty = required.filter((n) => field(n).value.trim() === '');
    required.forEach((n) => setError(n, empty.includes(n)));
    if (empty.length) field(empty[0]).focus();
    return empty.length === 0;
  };
  required.forEach((n) => field(n).addEventListener('input', () => {
    if (field(n).getAttribute('aria-invalid') === 'true' && field(n).value.trim() !== '') setError(n, false);
  }));
  form.querySelectorAll<HTMLButtonElement>('[data-send]').forEach((b) => b.addEventListener('click', () => {
    if (status) status.textContent = '';
    if (!valid()) return;
    const text = build();
    if (b.dataset.send === 'wa') {
      const w = window.open(`https://wa.me/${d.wa}?text=${encodeURIComponent(text)}`, '_blank');
      if (w) w.opener = null;
      if (status) status.textContent = (w ? d.sentWa : d.blockedWa) || '';
    } else {
      const subject = `handyman.karkonosze – ${field('topic').value}`;
      location.href = `mailto:${d.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      if (status) status.textContent = d.sentMail || '';
    }
  }));
  // Przyciski „Zapytaj” przy cenniku i stałej opiece ustawiają temat formularza
  document.querySelectorAll<HTMLAnchorElement>('[data-topic]').forEach((a) => a.addEventListener('click', () => {
    (field('topic') as HTMLSelectElement).selectedIndex = Number(a.dataset.topic) || 0;
  }));
}

/* ---------- Pasek szybkiego kontaktu (telefon) i pływająca karta: poza otwarciem i poza formularzem ---------- */
const quick = document.querySelector<HTMLElement>('[data-quick]');
const float = document.querySelector<HTMLElement>('[data-float]');
const hero = document.querySelector('.hero');
const contact = document.getElementById('kontakt');
if (hero && contact && 'IntersectionObserver' in window) {
  let inHero = true;
  let inContact = false;
  const update = () => {
    quick?.classList.toggle('is-hidden', inHero || inContact);
    float?.classList.toggle('is-hidden', inContact);
  };
  new IntersectionObserver(([en]) => { inHero = en.isIntersecting; update(); }, { threshold: 0.35 }).observe(hero);
  new IntersectionObserver(([en]) => { inContact = en.isIntersecting; update(); }, { threshold: 0.1 }).observe(contact);
}

/* ---------- Strefy dojazdu: wyszukiwarka miejscowości i mapa z konturami miejscowości ---------- */
const check = document.querySelector<HTMLElement>('[data-check]');
if (check) {
  const towns: [string, number][] = JSON.parse(check.dataset.towns || '[]');
  const input = check.querySelector<HTMLInputElement>('input')!;
  const out = check.querySelector<HTMLElement>('.check__result')!;
  const map = document.querySelector<SVGSVGElement>('[data-zmap]');
  const hint = document.querySelector<HTMLElement>('[data-zmap-hint]');
  const chips = [...document.querySelectorAll<HTMLButtonElement>('.chip[data-town]')];
  const z1 = check.dataset.z1 || '';
  const z2 = check.dataset.z2 || '';
  // Jak w Dyspozytorze: bez polskich znaków, małe litery, myślnik = spacja
  const norm = (v: string) => v.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[-\s]+/g, ' ').trim();
  const index = towns.map(([name, zone]) => ({ name, zone, key: norm(name) }));
  const zoneOf = (name: string) => index.find((t) => t.name === name)?.zone ?? 0;
  const zoneText = (zone: number) => (zone === 1 ? `strefa 1, ${z1}` : zone === 2 ? `strefa 2, ${z2}` : 'dalej niż 30 km, dojazd do ustalenia');

  /* --- mapa: wybrana (z pola lub kliknięcia) i wskazana kursorem miejscowość --- */
  let picked: string | null = null;
  let hovered: string | null = null;
  const groups = map ? [...map.querySelectorAll<SVGGElement>('[data-town]')] : [];
  const shapes = map ? [...map.querySelectorAll<SVGPathElement>('[data-shape]')] : [];
  const labels = map ? [...map.querySelectorAll<SVGTextElement>('text')] : [];
  const jg = map?.querySelector('.zmap__jg');
  const touch = !window.matchMedia('(hover: hover)').matches;
  const hintIdle = touch ? 'Proszę dotknąć miejscowości na mapie, pokażę jej granice.' : (hint?.textContent || '');
  if (hint) hint.textContent = hintIdle;
  const overlap = (a: DOMRect, b: DOMRect) => a.x < b.x + b.width + 2 && b.x < a.x + a.width + 2 && a.y < b.y + b.height + 1 && b.y < a.y + a.height + 1;
  const render = () => {
    if (!map) return;
    const on = hovered ?? picked;
    groups.forEach((g) => {
      const name = g.getAttribute('data-town');
      g.classList.toggle('is-on', name === on);
      g.classList.toggle('is-picked', name === picked);
      // Wskazana miejscowość rysowana nad pozostałymi
      if (name === on && jg && g !== jg) jg.before(g);
    });
    shapes.forEach((p) => p.classList.toggle('is-on', p.dataset.shape === on));
    // Nazwy, które zasłaniałyby podpis wskazanej miejscowości, chowają się tylko na ten czas
    const g = on ? groups.find((x) => x.getAttribute('data-town') === on) : null;
    const active = g?.querySelector('text');
    const boxes = g ? [active?.getBBox(), g.querySelector<SVGCircleElement>('.zmap__dot')?.getBBox()].filter(Boolean) as DOMRect[] : [];
    labels.forEach((t) => {
      const tb = t.getBBox() as DOMRect;
      t.classList.toggle('is-masked', t !== active && boxes.some((bx) => overlap(bx, tb)));
    });
    if (hint) {
      if (on) {
        const b = document.createElement('strong');
        b.textContent = on;
        hint.replaceChildren(b, `: ${zoneText(zoneOf(on))}`);
      } else hint.textContent = hintIdle;
    }
  };

  const say = (zone: number | null, parts: (string | HTMLElement)[]) => {
    out.replaceChildren(...parts);
    if (zone === null) out.removeAttribute('data-zone'); else out.dataset.zone = String(zone);
  };
  const strong = (t: string) => { const b = document.createElement('strong'); b.textContent = t; return b; };
  const pick = (name: string | null) => {
    picked = name;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.town === name)));
    render();
  };
  const update = () => {
    const v = norm(input.value);
    if (!v) { say(null, []); pick(null); return; }
    const exact = index.find((t) => t.key === v);
    const starts = index.filter((t) => t.key.startsWith(v));
    const hit = exact ?? (starts.length === 1 && v.length >= 2 ? starts[0] : null);
    if (hit) {
      pick(hit.name);
      say(hit.zone, hit.zone === 1
        ? [strong(hit.name), `: strefa 1, ${z1}. Płacą Państwo tylko za czas pracy.`]
        : hit.zone === 2
          ? [strong(hit.name), `: strefa 2, ${z2}.`]
          : [strong(hit.name), ': dalej niż 30 km, dojazd ustalam osobno. Proszę zapytać.']);
      return;
    }
    pick(null);
    if (starts.length > 1 && v.length >= 2) { say(null, [`Pasuje kilka miejscowości: ${starts.slice(0, 4).map((t) => t.name).join(', ')}…`]); return; }
    if (v.length >= 3) say(0, ['Tej miejscowości nie mam na liście. Do 30 km od Jeleniej Góry to strefa 2, dalej dojazd ustalam osobno. Proszę zapytać, sprawdzę.']);
    else say(null, []);
  };
  const choose = (name: string) => { input.value = name; update(); };
  input.addEventListener('input', update);

  // Przyciski z nazwami: kliknięcie wybiera, najechanie lub fokus pokazuje kontur na mapie
  chips.forEach((c) => {
    const name = c.dataset.town || '';
    c.addEventListener('click', () => choose(name));
    c.addEventListener('mouseenter', () => { hovered = name; render(); });
    c.addEventListener('mouseleave', () => { hovered = null; render(); });
    c.addEventListener('focus', () => { hovered = name; render(); });
    c.addEventListener('blur', () => { hovered = null; render(); });
  });
  // Mapa: najbliższa miejscowość pod kursorem (do ok. 22 px) pokazuje kontur, kliknięcie lub dotknięcie ją wybiera
  if (map) {
    const pts = groups.map((g) => {
      const c = g.querySelector<SVGCircleElement>('.zmap__dot')!;
      return { name: g.getAttribute('data-town') || '', x: c.cx.baseVal.value, y: c.cy.baseVal.value };
    });
    const nearest = (e: PointerEvent | MouseEvent) => {
      const m = map.getScreenCTM();
      if (!m) return null;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      const limit = 22 / m.a;
      let best: string | null = null;
      let d = Infinity;
      pts.forEach((t) => {
        const dt = Math.hypot(t.x - p.x, t.y - p.y);
        if (dt < d && dt <= limit) { d = dt; best = t.name; }
      });
      return best;
    };
    map.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const n = nearest(e);
      map.style.cursor = n ? 'pointer' : '';
      if (n !== hovered) { hovered = n; render(); }
    });
    map.addEventListener('pointerleave', () => { if (hovered) { hovered = null; render(); } });
    map.addEventListener('click', (e) => {
      const n = nearest(e);
      if (n) { hovered = null; choose(n); }
    });
  }
}
