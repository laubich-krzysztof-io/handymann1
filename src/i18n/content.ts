import { site, type Lang } from '../config';

// Kwoty z config.ts, z twardą spacją przed walutą (cena nie rozpada się między wiersze)
const P = site.pricing;
const zl = (n: number) => `${n}\u00a0zł`;
// Kwota z groszami (86,10), bez groszy, gdy całe złote
const money = (n: number) =>
  `${new Intl.NumberFormat('pl-PL', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)}\u00a0zł`;
const gross = (n: number) => Math.round(n * (100 + P.vatPct)) / 100;
const R = site.radiusKm;
// Przykładowy rachunek: 1 h 20 min pracy = pierwsza godzina + jedno rozpoczęte pół godziny + część
const BILL_PART = 189;
const BILL_NET = P.firstHour + P.halfHour + BILL_PART;
const BILL_VAT = Math.round(BILL_NET * P.vatPct) / 100;
const BILL_GROSS = Math.round((BILL_NET + BILL_VAT) * 100) / 100;
// Polska odmiana liczebnika: 1 godzina, 2–4 godziny, 5+ godzin (12–14 też „godzin”)
const plHours = (n: number) =>
  n === 1 ? 'godzina' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'godziny' : 'godzin';

export interface Content {
  htmlLang: string;
  meta: { title: string; description: string };
  /** Podtytuł pod nazwą marki w nagłówku; także opis obrazka OG */
  brand: { sub: string };
  nav: { services: string; care: string; process: string; prices: string; work: string };
  call: string;
  /** Pierwsza linijka wiadomości WhatsApp otwieranej z przycisków szybkiego kontaktu */
  waGreeting: string;
  hero: {
    title: string;
    lead: string;
    primary: string;
    entryLabel: string;
    entryMore: string;
  };
  log: { title: string; note: string; pause: string; entries: { when: string; where: string; what: string; done: string }[] };
  services: {
    title: string;
    lead: string;
    items: { name: string; text: string }[];
    note: string;
  };
  care: {
    title: string;
    lead: string;
    points: { title: string; text: string }[];
    cta: string;
  };
  process: { title: string; lead: string; steps: { status: string; title: string; text: string }[] };
  pricing: {
    title: string;
    lead: string;
    /** price: kwota netto; gross: brutto z VAT; text: cena słowna zamiast kwoty; extra: dopłata, pokazana ciszej */
    rates: { label: string; price: string; gross?: string; note?: string; text?: boolean; extra?: boolean }[];
    /** etykiety przy kwotach: netto i brutto */
    net: string;
    grossLabel: string;
    surcharges: string;
    area: string;
    care: { title: string; price: string; gross: string; per: string; points: string[]; link: string };
    bill: {
      title: string;
      place: string;
      job: string;
      time: string;
      lines: [string, string][];
      subtotal: [string, string];
      vat: [string, string];
      total: [string, string];
      status: string;
      note: string;
    };
    /** objaśnienie nad stawkami: netto/brutto, waluta */
    fine: string;
  };
  trust: {
    title: string;
    items: { title: string; text: string }[];
  };
  work: {
    title: string;
    lead: string;
    facts: [string, string][];
    photos: { tasma: string; malowanie: string; detal: string; gotowe: string };
  };
  gallery: { title: string };
  faq: { title: string; lead: string; more: string; items: { q: string; a: string }[] };
  contact: {
    title: string;
    lead: string;
    form: {
      name: string;
      phone: string;
      who: string;
      whoOptions: string[];
      what: string;
      whatPlaceholder: string;
      whatsapp: string;
      email: string;
      hint: string;
      /** link do polityki prywatności pod formularzem */
      privacy: string;
      where: string;
      wherePlaceholder: string;
      errName: string;
      errWhat: string;
      sentWa: string;
      sentMail: string;
      required: string;
    };
    direct: string;
    whatsappDirect: string;
    area: string;
  };
  footer: { area: string; rights: string; privacy: string };
}

const raw: Record<Lang, Content> = {
  pl: {
    htmlLang: 'pl',
    meta: {
      title: 'Złota rączka Jelenia Góra, Karpacz, Szklarska Poręba | handyman.karkonosze',
      description: `Hydraulika, elektryka (uprawnienia SEP) i drobne naprawy dla pensjonatów, hoteli i domów, do ${R}\u00a0km od Jeleniej Góry. Pierwsza godzina z dojazdem: ${zl(P.firstHour)} netto.`,
    },
    brand: { sub: 'Naprawy i opieka nad obiektami' },
    nav: { services: 'Usługi', care: 'Stała opieka', process: 'Jak pracuję', prices: 'Cennik', work: 'Realizacja' },
    call: 'Zadzwoń',
    waGreeting: 'Dzień dobry, piszę ze strony handyman.karkonosze.',
    hero: {
      title: 'Naprawię, zanim gość zauważy.',
      lead: 'Złota rączka dla pensjonatów, małych hoteli, firm i domów: hydraulika, elektryka, montaż i drobne remonty. Jelenia Góra, Karpacz, Szklarska Poręba i okolice, jednorazowo albo na stałe.',
      primary: 'Opisz usterkę',
      entryLabel: 'Dziennik obiektu · przykładowy wpis',
      entryMore: 'Tak wygląda stała opieka',
    },
    log: {
      title: 'Dziennik obiektu',
      note: 'Przykładowe wpisy – tak wygląda lista po wizycie.',
      pause: 'Zatrzymaj przewijanie dziennika',
      entries: [
        { when: 'pn 08:10', where: 'Pok. 7', what: 'Bateria prysznicowa kapie', done: 'wymieniona' },
        { when: 'pn 09:40', where: 'Recepcja', what: 'Spalone oświetlenie nad ladą', done: 'naprawione' },
        { when: 'pn 11:15', where: 'Pok. 3', what: 'Klamka drzwi balkonowych luźna', done: 'dokręcona' },
        { when: 'pn 12:30', where: 'Łazienka parter', what: 'Syfon umywalki cuchnie', done: 'wyczyszczony' },
        { when: 'wt 08:00', where: 'Jadalnia', what: 'Gniazdko przy ekspresie iskrzy', done: 'wymienione' },
        { when: 'wt 10:20', where: 'Pok. 5', what: 'Półka nad łóżkiem odpada', done: 'zamontowana' },
        { when: 'wt 13:05', where: 'Kotłownia', what: 'Brak ciśnienia w instalacji', done: 'uzupełnione' },
        { when: 'wt 15:00', where: 'Taras', what: 'Lampa ogrodowa nie świeci', done: 'naprawiona' },
      ],
    },
    services: {
      title: 'Co naprawiam',
      lead: 'Drobne i średnie prace, które nie wymagają całej ekipy, ale nie mogą długo czekać.',
      items: [
        {
          name: 'Hydraulika',
          text: 'Kapiące krany, zatkane odpływy, wymiana baterii, WC i syfonów, podłączenia urządzeń.',
        },
        {
          name: 'Elektryka',
          text: 'Gniazdka, włączniki, oświetlenie, osprzęt rozdzielnic, szukanie przyczyny usterki.',
        },
        {
          name: 'Montaż i drobne remonty',
          text: 'Meble, półki, drzwi i zamki, malowanie, drobne naprawy płytek, okien i okuć.',
        },
        {
          name: 'Stała opieka nad obiektem',
          text: 'Regularne obchody, lista usterek i szybkie naprawy w sezonie. Jeden numer telefonu.',
        },
      ],
      note: 'Prace elektryczne wykonuję na podstawie uprawnień SEP do 1 kV.',
    },
    care: {
      title: 'Stała opieka nad obiektem',
      lead: 'Gość nie zapamięta, że kran kapał. Zapamięta, że kapał trzy dni. Przy stałej opiece usterki trafiają na listę i są usuwane, zanim zrobią się problemem.',
      points: [
        { title: 'Obchód w ustalonym rytmie', text: 'Przechodzę przez pokoje, łazienki, kotłownię i części wspólne. Częstotliwość ustalamy pod Twój obiekt i sezon.' },
        { title: 'Lista po każdej wizycie', text: 'Dostajesz wpisy: co było, co zrobione, co wymaga decyzji. Bez szukania, kto co naprawił.' },
        { title: 'Jeden numer w sezonie', text: 'Gdy coś się zepsuje w trakcie pobytu gości, dzwonisz do tej samej osoby, która zna Twój obiekt.' },
      ],
      cta: 'Zapytaj o stałą opiekę',
    },
    process: {
      title: 'Jak pracuję',
      lead: 'Jedno zgłoszenie, od wiadomości do rachunku.',
      steps: [
        { status: 'zgłoszone', title: 'Opisujesz usterkę', text: 'Telefonem, na WhatsAppie albo formularzem. Najlepiej ze zdjęciem.' },
        { status: 'wycenione', title: 'Dostajesz wycenę', text: 'Orientacyjną na podstawie zdjęcia, dokładną po oględzinach na miejscu.' },
        { status: 'naprawione', title: 'Naprawiam w ustalonym terminie', text: 'Dojeżdżam z narzędziami i podstawowymi częściami. Po robocie sprzątam.' },
        { status: 'rozliczone', title: 'Rozliczamy się jasno', text: 'Rachunek lub faktura, z podziałem na robociznę i materiały.' },
      ],
    },
    pricing: {
      title: 'Ile to kosztuje',
      lead: 'Płacisz za czas pracy według stawek poniżej. Orientacyjną wycenę dostajesz ze zdjęcia, zanim przyjadę.',
      rates: [
        { label: 'Pierwsza godzina pracy z dojazdem', price: zl(P.firstHour), gross: money(gross(P.firstHour)) },
        { label: 'Każde kolejne rozpoczęte 30\u00a0minut', price: zl(P.halfHour), gross: money(gross(P.halfHour)) },
        { label: 'Części i materiały', price: 'po cenie zakupu', note: 'Paragon lub fakturę zakupu dołączam do rachunku.', text: true },
        { label: 'Pilne zlecenie, tego samego dnia', price: `+${P.urgentPct}%`, extra: true },
        { label: `W nocy (${P.night.from}:00–${P.night.to}:00) i w święta`, price: `+${P.nightPct}%`, extra: true },
      ],
      surcharges: 'Dopłaty liczę tylko od robocizny, nie od części.',
      area: `Dojazd w cenie w promieniu ${R}\u00a0km od Jeleniej Góry: Jelenia Góra z Cieplicami, Karpacz, Szklarska Poręba, Świeradów-Zdrój, Podgórzyn, Mysłakowice, Kowary, Piechowice i miejscowości po drodze.`,
      care: {
        title: 'Stała opieka nad obiektem',
        price: `od ${zl(P.careFrom)}`,
        gross: `od ${money(gross(P.careFrom))}`,
        per: 'miesięcznie',
        points: [
          `${P.careHours} ${plHours(P.careHours)} pracy w miesiącu`,
          'Dojazdy w cenie',
          `Reakcja w ciągu ${P.careResponseH}\u00a0godzin`,
          'Lista usterek po każdej wizycie',
        ],
        link: 'Jak wygląda stała opieka',
      },
      bill: {
        title: 'Przykładowy rachunek',
        place: 'Pensjonat, Szklarska Poręba',
        job: 'Pok. 7 · bateria prysznicowa kapie',
        time: 'Czas pracy: 1\u00a0h 20\u00a0min',
        lines: [
          ['Pierwsza godzina z dojazdem', zl(P.firstHour)],
          ['Kolejne rozpoczęte 30\u00a0min', zl(P.halfHour)],
          ['Bateria prysznicowa (cena zakupu)', zl(BILL_PART)],
        ],
        subtotal: ['Razem netto', zl(BILL_NET)],
        vat: [`VAT ${P.vatPct}%`, money(BILL_VAT)],
        total: ['Do zapłaty', money(BILL_GROSS)],
        status: 'rozliczone',
        note: 'Przykład wyliczony według cennika.',
      },
      fine: `Kwoty netto, pod nimi brutto z VAT ${P.vatPct}%.`,
      net: 'netto',
      grossLabel: 'brutto',
    },
    trust: {
      title: 'Dlaczego mi zaufasz',
      items: [
        { title: 'Uprawnienia SEP do 1 kV', text: 'Instalacje, montaż i konserwacja urządzeń elektrycznych. Świadectwo pokażę przed rozpoczęciem pracy.' },
        { title: 'Wycena ze zdjęcia', text: 'Wiesz, czego się spodziewać, zanim ktokolwiek przyjedzie.' },
        { title: 'Ta sama osoba za każdym razem', text: 'Nie pośrednik i nie zmieniająca się ekipa. Znam Twój obiekt.' },
      ],
    },
    work: {
      title: 'Z ostatniego zlecenia',
      lead: 'Ściana z górami w pokoju. Dwa dni pracy, od pierwszego paska taśmy do ostatniego szczytu.',
      facts: [['Zakres', 'Taśmowanie i malowanie'], ['Czas', '2 dni'], ['Termin', '19–20 września 2026']],
      photos: {
        tasma: 'Wyznaczanie szczytów gór taśmą malarską na białej ścianie',
        malowanie: 'Malowanie pomarańczowego szczytu pędzlem przy samej krawędzi taśmy',
        detal: 'Zdejmowanie taśmy z niebieskiego szczytu, widoczna ostra krawędź farby',
        gotowe: 'Gotowa ściana z zielonymi, niebieskimi i pomarańczowymi górami, obok wykonawca',
      },
    },
    gallery: { title: 'Realizacje' },
    faq: {
      title: 'Częste pytania',
      lead: 'Krótkie odpowiedzi na to, o co klienci pytają najczęściej.',
      more: 'Nie ma tu Twojego pytania? Napisz albo zadzwoń',
      items: [
        { q: 'Czy dojedziesz do Karpacza, Szklarskiej Poręby albo Świeradowa?', a: `Tak. Pracuję w promieniu ${R}\u00a0km od Jeleniej Góry, a dojazd jest wliczony w pierwszą godzinę pracy.` },
        { q: 'Ile kosztuje drobna naprawa?', a: `Pierwsza godzina z dojazdem to ${zl(P.firstHour)} netto (${money(gross(P.firstHour))} brutto). Każde kolejne rozpoczęte 30\u00a0minut to ${zl(P.halfHour)} netto. Części liczę po cenie zakupu.` },
        { q: 'Jak dostanę wycenę?', a: 'Wyślij zdjęcie i krótki opis usterki przez WhatsAppa albo formularz. Dostaniesz wycenę orientacyjną, a dokładną po oględzinach na miejscu.' },
        { q: 'Jak szybko przyjedziesz?', a: `Termin ustalamy przy zgłoszeniu. Gdy naprawa musi być zrobiona tego samego dnia, do robocizny doliczam ${P.urgentPct}%. Przy stałej opiece reaguję w ciągu ${P.careResponseH}\u00a0godzin.` },
        { q: 'Czy wystawiasz fakturę VAT?', a: 'Tak. Robocizna i materiały są na niej wpisane osobno.' },
        { q: 'Czy możesz wykonywać prace elektryczne?', a: 'Tak, mam uprawnienia SEP do 1\u00a0kV. Świadectwo pokażę przed rozpoczęciem pracy.' },
        { q: 'Czym stała opieka różni się od jednorazowego zlecenia?', a: `Przychodzę w ustalonym rytmie, spisuję usterki i naprawiam je, zanim zauważą je goście. Abonament zaczyna się od ${zl(P.careFrom)} netto miesięcznie: ${P.careHours} ${plHours(P.careHours)} pracy, dojazdy w cenie i reakcja w ciągu ${P.careResponseH}\u00a0godzin.` },
      ],
    },
    contact: {
      title: 'Opisz, co się dzieje.',
      lead: 'Wypełnij krótki formularz. Po kliknięciu otworzy się wiadomość do mnie z gotowym opisem, wystarczy ją wysłać.',
      form: {
        name: 'Imię i nazwisko',
        phone: 'Telefon',
        who: 'Kim jesteś',
        whoOptions: ['Pensjonat / hotel', 'Firma', 'Osoba prywatna'],
        what: 'Co jest do zrobienia',
        whatPlaceholder: 'Np. cieknie bateria prysznicowa, od wczoraj.',
        whatsapp: 'Wyślij przez WhatsApp',
        email: 'Wyślij e-mailem',
        hint: 'Zdjęcie dołączysz już w otwartej wiadomości.',
        privacy: 'Jak chronię Twoje dane',
        where: 'Gdzie',
        wherePlaceholder: 'Np. pokój 4, łazienka',
        errName: 'Wpisz imię i nazwisko.',
        errWhat: 'Opisz krótko, co jest do zrobienia.',
        sentWa: 'Wiadomość czeka w WhatsAppie. Wyślij ją tam, a odezwę się.',
        sentMail: 'Wiadomość czeka w programie pocztowym. Wyślij ją, a odezwę się.',
        required: 'wymagane',
      },
      direct: 'Wolisz zadzwonić albo napisać?',
      whatsappDirect: 'Napisz na WhatsAppie',
      area: `Pracuję w promieniu ${R}\u00a0km od Jeleniej Góry.`,
    },
    footer: { area: 'Karkonosze, Dolny Śląsk', rights: 'Wszelkie prawa zastrzeżone.', privacy: 'Polityka prywatności' },
  },

};

// Polska typografia: jednoliterowe spójniki i przyimki (a, i, o, u, w, z) nie zostają na końcu wiersza.
// Pomijamy meta (tytuł i opis w Google) i powitanie WhatsApp: tam liczy się czysty tekst.
const glue = (v: unknown): unknown =>
  typeof v === 'string'
    ? v.replace(/(?<=^|\s)([aiouwzAIOUWZ]) /g, '$1\u00a0')
    : Array.isArray(v)
      ? v.map(glue)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, glue(x)]))
        : v;
const { meta, waGreeting, ...plRest } = raw.pl;

export const content: Record<Lang, Content> = {
  pl: { ...(glue(plRest) as Omit<Content, 'meta' | 'waGreeting'>), meta, waGreeting },
};
