/* =========================================================================
   Ruch strony: jak skład drukowanej karty hotelu.
   Tekst wysuwa się linia po linii spod maski, linie atramentu rysują się od lewej,
   dziennik i rachunek zapisują się wiersz po wierszu, numer telefonu zamyka stronę.
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
      if (entrance) hero();
      root.classList.add('motion-ready');
      reveals();
    }).catch(fail);
  } catch (e) {
    fail(e);
  }
}

function fail(e?: unknown) {
  root.classList.remove('motion');
  if (e) console.error(e);
}

/* ---------- Płynne przewijanie (tylko kółko myszy i gładzik; dotyk zostaje natywny) ---------- */
function smoothScroll() {
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
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
      duration: 1.15,
      easing: (x) => 1 - Math.pow(1 - x, 4),
      onComplete: () => {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      },
    });
    history.pushState(null, '', `#${id}`);
  });
}

/* ---------- Otwarcie: jedna złożona sekwencja ---------- */
function hero() {
  const h1 = document.querySelector<HTMLElement>('[data-hero] h1');
  if (!h1) return;
  const lead = document.querySelector<HTMLElement>('[data-hero] .lead');
  const actions = document.querySelector<HTMLElement>('[data-hero-actions]');
  const proofLine = document.querySelector<HTMLElement>('.proof__line');
  const proofSub = document.querySelector<HTMLElement>('.proof__sub');

  const tl = gsap.timeline({
    defaults: { ease: EASE },
    onComplete: () => root.classList.remove('motion'),
  });

  let placed = false;
  SplitText.create(h1, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'ln',
    aria: 'auto',
    autoSplit: true,
    onSplit(self) {
      gsap.set(h1, { visibility: 'visible' });
      // Przy ponownym podziale (zmiana szerokości) SplitText przenosi postęp na nową animację
      const tw = gsap.from(self.lines, { yPercent: 108, duration: 1.15, stagger: 0.09, ease: EASE });
      if (!placed) { tl.add(tw, 0); placed = true; }
      return tw;
    },
  });

  if (lead) tl.fromTo(lead, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.42);
  if (actions) tl.fromTo(actions, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.58);
  // Pozycja z cennika „wpisuje się” od lewej razem ze swoimi liniami, jak w karcie
  if (proofLine) tl.fromTo(proofLine, { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1 }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' }, 0.55);
  if (proofSub) tl.fromTo(proofSub, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 1.25);
}

/* ---------- Przy przewijaniu ---------- */
const at = (trigger: Element, start = 'top 86%') => ({ trigger, start, once: true });

function reveals() {
  // Tytuły sekcji, zdanie o opiece i zdanie w kontakcie: linia po linii spod maski
  document.querySelectorAll<HTMLElement>('main h2, .care__quote').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'ln',
      aria: el.tagName === 'H2' ? 'auto' : 'none',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 108, duration: 1.1, stagger: 0.08, ease: EASE, scrollTrigger: at(el) }),
    });
  });

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

  // Cennik: pozycje jedna pod drugą
  const rates = document.querySelector('.rates');
  if (rates) {
    gsap.from(rates.querySelectorAll('.rates__row'), {
      autoAlpha: 0, y: 18, duration: 0.85, stagger: 0.1, ease: EASE, scrollTrigger: at(rates, 'top 82%'),
    });
  }

  // Przykładowy rachunek „drukuje się”: kartka, wiersze, na końcu suma i status
  const sheet = document.querySelector<HTMLElement>('.bill__sheet');
  if (sheet) {
    const rows = sheet.querySelectorAll('.bill__meta, .bill__lines tbody tr, .bill__sub, .bill__lines tfoot tr:not(.bill__total):not(.bill__sub)');
    const total = sheet.querySelector('.bill__total');
    const status = sheet.querySelector<HTMLElement>('.bill__status');
    gsap.timeline({ scrollTrigger: at(sheet, 'top 80%'), defaults: { ease: EASE } })
      .fromTo(sheet, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut' })
      .from(rows, { autoAlpha: 0, y: 6, duration: 0.5, stagger: 0.07 }, 0.35)
      .from(total, { autoAlpha: 0, y: 10, duration: 0.8 }, '>-0.1')
      .from(status, { autoAlpha: 0, duration: 0.5, onComplete: () => status?.classList.add('is-live') }, '>-0.3');
  }

  // Zdjęcia z realizacji: odsłonięcie od dołu, obraz lekko się cofa
  const photos = gsap.utils.toArray<HTMLElement>('.work__frame');
  if (photos.length) {
    const tl = gsap.timeline({ scrollTrigger: at(photos[0], 'top 82%'), defaults: { ease: 'power4.out' } });
    photos.forEach((f, i) => {
      const img = f.querySelector('img');
      tl.fromTo(f, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3 }, i * 0.14)
        .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.8 }, i * 0.14);
    });
  }

  // Kulminacja: numer telefonu wchodzi cyfra po cyfrze
  const tel = document.querySelector<HTMLElement>('.direct__tel');
  if (tel) {
    SplitText.create(tel, {
      type: 'words,chars', // najpierw słowa, żeby zostały odstępy w „537 419 388”
      mask: 'chars',
      charsClass: 'ch',
      aria: 'none', // nazwę odnośnika daje aria-label w znaczniku (z odstępami)
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.chars, { yPercent: 110, duration: 0.9, stagger: 0.035, ease: EASE, scrollTrigger: at(tel, 'top 90%') }),
    });
  }

  ScrollTrigger.refresh();
}
