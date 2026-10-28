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
