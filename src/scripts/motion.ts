/* =========================================================================
   Ruch strony: jak skład drukowanej karty hotelu, z kilkoma momentami „wow”.
   1. Otwarcie: litery nagłówka wchodzą falą, cena nabija się jak licznik w kasie;
      przy przewijaniu linie nagłówka rozjeżdżają się w przeciwne strony.
   2. Jedna kartka: tło strony płynnie zmienia odcień (len, kamień, szron) zamiast twardych krawędzi.
   3. Zdanie o stałej opiece zapełnia się atramentem słowo po słowie, w tempie przewijania.
   4. Zdjęcie z realizacji zaczyna na cały ekran i kurczy się na swoje miejsce (komputer).
   5. Liczby kręcą się jak licznik: stawki, suma rachunku, numer telefonu.
   6. Przyciski przyciągają się do kursora (tylko mysz).
   GSAP (ScrollTrigger, SplitText) + Lenis. Przy „ograniczonym ruchu” nic się nie rusza.
   Treść jest widoczna bez skryptu: klasa .motion na <html> ukrywa tylko otwarcie,
   a zapasowy licznik w <head> zdejmuje ją, gdyby ten plik się nie wczytał.
   ========================================================================= */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global {
  interface Window { __motionFallback?: number }
}

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'expo.out'; // ta sama krzywa co --ease-out w CSS: pewne wejście, łagodny koniec
const DESKTOP = '(min-width: 64rem)';
const MOBILE = '(max-width: 63.99rem)';

window.clearTimeout(window.__motionFallback);

if (reduce) {
  root.classList.remove('motion');
} else {
  try {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    smoothScroll();
    // Podział na linie dopiero po wczytaniu fontów (inaczej linie łamią się inaczej), najwyżej 600 ms czekania
    const fonts = Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 600))]);
    fonts.then(() => {
      // Jeśli strona wczytała się tak wolno, że zapasowy licznik już odsłonił treść, nie animujemy otwarcia
      const entrance = root.classList.contains('motion');
      root.classList.add('motion-ready');
      paper();
      if (entrance) hero();
      reveals();
      magnetic();
      ScrollTrigger.refresh();
    }).catch(fail);
  } catch (e) {
    fail(e);
  }
}

function fail(e?: unknown) {
  root.classList.remove('motion', 'motion-ready');
  if (e) console.error(e);
}

/* ---------- Płynne przewijanie (tylko kółko myszy i gładzik; dotyk zostaje natywny) ---------- */
function smoothScroll() {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Odnośniki do sekcji: płynnie, adres i fokus jak przy zwykłym skoku.
  // Odstęp pod nagłówkiem Lenis bierze sam ze scroll-padding-top w CSS.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a || a.classList.contains('skip')) return; // „Przejdź do treści” zostaje natywne (fokus od razu w treści)
    const id = decodeURIComponent(a.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (x) => 1 - Math.pow(1 - x, 4),
      onComplete: () => {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      },
    });
    history.pushState(null, '', `#${id}`);
  });
}

/* ---------- Licznik: każda cyfra to kolumna 0–9, która dokręca się do właściwej wartości ---------- */
const SPINS = 2; // ile pełnych obrotów robi kolumna przed zatrzymaniem
interface Odo { tracks: HTMLElement[]; restore: () => void }
function odometer(el: Element | null): Odo {
  const tracks: HTMLElement[] = [];
  const pairs: [HTMLElement, HTMLElement, string][] = [];
  // Po zatrzymaniu licznik wraca do zwykłego tekstu (kopiowanie numeru, tłumacz strony, czytnik)
  const restore = () => pairs.splice(0).forEach(([sr, vis, text]) => { vis.remove(); sr.replaceWith(text); });
  if (!el) return { tracks, restore };
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) if (/\d/.test(walker.currentNode.nodeValue || '')) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const text = node.nodeValue || '';
    const frag = document.createDocumentFragment();
    // Czytnik ekranu dostaje zwykły tekst, oko dostaje kolumny cyfr
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    const vis = document.createElement('span');
    vis.setAttribute('aria-hidden', 'true');
    for (const ch of text) {
      if (!/\d/.test(ch)) { vis.append(ch); continue; }
      const col = document.createElement('span');
      col.className = 'odo';
      const track = document.createElement('span');
      track.className = 'odo__track';
      const seq: string[] = [];
      for (let s = 0; s < SPINS; s++) for (let d = 0; d < 10; d++) seq.push(String(d));
      seq.push(ch);
      track.innerHTML = seq.map((d) => `<span>${d}</span>`).join('');
      col.append(track);
      vis.append(col);
      tracks.push(track);
    }
    frag.append(sr, vis);
    node.replaceWith(frag);
    pairs.push([sr, vis, text]);
  });
  return { tracks, restore };
}
const ODO_END = -100 * (SPINS * 10) / (SPINS * 10 + 1);
const roll = (o: Odo, vars: gsap.TweenVars = {}) =>
  gsap.fromTo(o.tracks, { yPercent: 0 }, { yPercent: ODO_END, duration: 1.7, ease: 'power4.out', stagger: { each: 0.07, from: 'end' }, onComplete: o.restore, ...vars });

/* ---------- Jedna kartka: tło strony zmienia odcień razem z rozdziałem ---------- */
function paper() {
  const css = getComputedStyle(root);
  const tone = (s: Element) =>
    css.getPropertyValue(s.classList.contains('section--stone') ? '--stone' : s.classList.contains('section--frost') ? '--frost' : '--linen').trim();
  const sections = [...document.querySelectorAll<HTMLElement>('main > section')];
  if (!sections.length) return;
  const to = (c: string) => gsap.to(root, { '--page': c, duration: 0.9, ease: 'power2.out', overwrite: true });
  sections.forEach((s) => {
    const c = tone(s);
    ScrollTrigger.create({
      trigger: s,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) to(c); },
    });
  });
}

/* ---------- Otwarcie ---------- */
function hero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const h1 = hero?.querySelector<HTMLElement>('h1');
  if (!hero || !h1) return;
  const lead = hero.querySelector<HTMLElement>('.lead');
  const actions = hero.querySelector<HTMLElement>('[data-hero-actions]');
  const proof = hero.querySelector<HTMLElement>('.proof');
  const proofLine = hero.querySelector<HTMLElement>('.proof__line');
  const proofSub = hero.querySelector<HTMLElement>('.proof__sub');
  const price = odometer(hero.querySelector('.proof__price'));

  const tl = gsap.timeline({
    defaults: { ease: EASE },
    onComplete: () => root.classList.remove('motion'),
  });

  let placed = false;
  let drift: gsap.core.Tween | null = null;
  SplitText.create(h1, {
    type: 'lines,words,chars',
    mask: 'lines',
    linesClass: 'ln',
    aria: 'auto',
    autoSplit: true,
    onSplit(self) {
      gsap.set(h1, { visibility: 'visible' });
      // Fala liter: każda wychodzi spod linii z lekkim obrotem i prostuje się
      const tw = gsap.from(self.chars, {
        yPercent: 118, rotate: 9, transformOrigin: '0% 100%', duration: 1.25, stagger: 0.024, ease: EASE,
      });
      if (!placed) { tl.add(tw, 0.05); placed = true; }
      // Przy przewijaniu linie rozjeżdżają się w przeciwne strony
      drift?.scrollTrigger?.kill(); drift?.kill();
      drift = gsap.to(self.masks, {
        x: (i: number) => (i % 2 ? '7vw' : '-7vw'),
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      return tw;
    },
  });

  if (lead) tl.fromTo(lead, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.55);
  if (actions) tl.fromTo(actions, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7);
  // Pozycja z cennika „wpisuje się” od lewej, a cena nabija się jak w kasie
  if (proofLine) tl.fromTo(proofLine, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' }, 0.6);
  if (price.tracks.length) tl.add(roll(price, { duration: 1.9 }), 0.85);
  if (proofSub) tl.fromTo(proofSub, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 1.5);

  // Głębia przy wyjściu z otwarcia: opis i cena odpływają wolniej niż tytuł
  const depth = (el: HTMLElement | null, y: number) =>
    el && gsap.to(el, { y, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  depth(hero.querySelector('.hero__main'), -40);
  depth(proof, -90);
}

/* ---------- Przy przewijaniu ---------- */
const at = (trigger: Element, start = 'top 86%') => ({ trigger, start, once: true });

function reveals() {
  // Tytuły sekcji i zdanie w kontakcie: linia po linii spod maski
  document.querySelectorAll<HTMLElement>('main h2').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'ln',
      aria: 'auto',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 110, duration: 1.15, stagger: 0.09, ease: EASE, scrollTrigger: at(el) }),
    });
  });

  // Zdanie o stałej opiece: atrament wypełnia słowa w tempie czytania (przewijania)
  const quote = document.querySelector<HTMLElement>('.care__quote');
  if (quote) {
    SplitText.create(quote, {
      type: 'words',
      wordsClass: 'wd',
      aria: 'none',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(self.words, { opacity: 0.3 }, {
          opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: quote, start: 'top 85%', end: 'bottom 50%', scrub: 0.4 },
        }),
    });
  }

  // Linie atramentu nad listami rysują się od lewej (jak linie w drukowanej karcie)
  document.querySelectorAll<HTMLElement>('[data-rule]').forEach((el) => {
    gsap.fromTo(el, { '--rule': 0 }, { '--rule': 1, duration: 1.4, ease: 'power3.inOut', scrollTrigger: at(el, 'top 90%') });
  });

  // Dziennik wizyty: wpisy pojawiają się po kolei, jak zapisywane
  const visit = document.querySelector('.visit');
  if (visit) {
    gsap.from(visit.querySelectorAll('li'), {
      autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.14, ease: EASE, scrollTrigger: at(visit, 'top 80%'),
    });
  }

  // Cennik: pozycje jedna pod drugą, a każda kwota dokręca się jak licznik
  const rates = document.querySelector('.rates');
  if (rates) {
    rates.querySelectorAll('.rates__row').forEach((row, i) => {
      const odo = odometer(row.querySelector('.rates__price > span:first-child'));
      const tl = gsap.timeline({ scrollTrigger: at(row, 'top 88%'), delay: i === 0 ? 0 : 0.05 });
      tl.from(row, { autoAlpha: 0, y: 20, duration: 0.9, ease: EASE });
      if (odo.tracks.length) tl.add(roll(odo), 0.1);
    });
  }

  // Przykładowy rachunek „drukuje się”: kartka, wiersze, na końcu suma (licznik) i status
  const sheet = document.querySelector<HTMLElement>('.bill__sheet');
  if (sheet) {
    const rows = sheet.querySelectorAll('.bill__meta, .bill__lines tbody tr, .bill__sub, .bill__lines tfoot tr:not(.bill__total):not(.bill__sub)');
    const total = sheet.querySelector('.bill__total');
    const totalOdo = odometer(total?.querySelector('td') ?? null);
    const status = sheet.querySelector<HTMLElement>('.bill__status');
    const tl = gsap.timeline({ scrollTrigger: at(sheet, 'top 80%'), defaults: { ease: EASE } })
      .fromTo(sheet, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut' })
      .from(rows, { autoAlpha: 0, y: 6, duration: 0.5, stagger: 0.07 }, 0.35)
      .from(total, { autoAlpha: 0, y: 10, duration: 0.6 }, '>-0.1');
    if (totalOdo.tracks.length) tl.add(roll(totalOdo, { duration: 1.5 }), '<');
    tl.from(status, { autoAlpha: 0, duration: 0.5, onComplete: () => status?.classList.add('is-live') }, '>-0.5');
  }

  photos();

  // Kulminacja: numer telefonu dokręca się cyfra po cyfrze
  const tel = document.querySelector<HTMLElement>('.direct__tel');
  const telOdo = odometer(tel);
  if (tel && telOdo.tracks.length) {
    // Rusza, gdy tylko numer wejdzie na ekran; do tej chwili jest niewidoczny (bez „000 000 000”)
    gsap.timeline({ scrollTrigger: at(tel, 'top bottom') })
      .from(tel, { autoAlpha: 0, duration: 0.4 }, 0)
      .add(roll(telOdo, { duration: 2.1, stagger: { each: 0.06, from: 'start' } }), 0);
  }
}

/* ---------- Zdjęcia z realizacji ---------- */
function photos() {
  const section = document.getElementById('realizacja');
  const row = section?.querySelector<HTMLElement>('.work__row');
  const figs = row ? [...row.querySelectorAll<HTMLElement>('.work__photo')] : [];
  if (!section || !row || !figs.length) return;
  const mm = gsap.matchMedia();

  // Komputer: pierwsze zdjęcie zaczyna na cały ekran, przy przewijaniu kurczy się na swoje miejsce,
  // dwa pozostałe dojeżdżają obok, podpisy pojawiają się na końcu
  mm.add(DESKTOP, () => {
    const [first, ...rest] = figs;
    const frame = first.querySelector<HTMLElement>('.work__frame')!;
    const caps = figs.map((f) => f.querySelector('figcaption'));
    // Wymiary bez transformacji: figure się nie skaluje, skaluje się tylko ramka w środku
    const geo = () => {
      const fr = first.getBoundingClientRect();
      const rr = row.getBoundingClientRect();
      const W = window.innerWidth, H = window.innerHeight;
      const w = frame.offsetWidth, h = frame.offsetHeight;
      const s = Math.max(W / w, H / h) * 1.02;
      // Położenie w chwili przypięcia: środek rzędu na środku ekranu
      const cy = H / 2 - rr.height / 2 + (fr.top - rr.top) + h / 2;
      const cx = fr.left + w / 2;
      return { s, x: W / 2 - cx, y: H / 2 - cy };
    };
    gsap.set(frame, { zIndex: 3, position: 'relative' });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: row, start: 'center center', end: '+=120%', pin: section, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 },
      defaults: { ease: 'none' },
    });
    tl.fromTo(frame, { scale: () => geo().s, x: () => geo().x, y: () => geo().y }, { scale: 1, x: 0, y: 0, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(frame.querySelector('img'), { scale: 1.15 }, { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .from(rest, { yPercent: 40, autoAlpha: 0, duration: 0.45, stagger: 0.12, ease: 'power2.out' }, 0.5)
      .from(caps, { autoAlpha: 0, y: 8, duration: 0.25, stagger: 0.06 }, 0.85);
    return () => gsap.set(frame, { clearProps: 'zIndex,position' });
  });

  // Telefon i tablet: odsłonięcie od dołu, obraz lekko się cofa
  mm.add(MOBILE, () => {
    const frames = figs.map((f) => f.querySelector<HTMLElement>('.work__frame')!);
    frames.forEach((f) => {
      gsap.timeline({ scrollTrigger: at(f, 'top 88%'), defaults: { ease: 'power4.out' } })
        .fromTo(f, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3 })
        .fromTo(f.querySelector('img'), { scale: 1.15 }, { scale: 1, duration: 1.8 }, 0);
    });
  });
}

/* ---------- Przyciski przyciągają się do kursora (tylko mysz) ---------- */
function magnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('main .btn, .top .cta').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.22);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}
