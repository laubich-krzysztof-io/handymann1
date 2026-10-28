import { site, type Lang } from '../config';

// Kwoty z config.ts, z twardą spacją przed walutą (cena nie rozpada się między wiersze)
const P = site.pricing;
const zl = (n: number) => `${n}\u00a0zł`;
// Kwota z groszami (86,10), bez groszy, gdy całe złote
const money = (n: number) =>
  `${new Intl.NumberFormat('pl-PL', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)}\u00a0zł`;
const gross = (n: number) => Math.round(n * (100 + P.vatPct)) / 100;
const R = site.radiusKm;
// Przykładowy rachunek: pensjonat w strefie 2, trzy usterki przy jednej wizycie, 1 h 30 min pracy
// = pierwsza godzina + jedno rozpoczęte pół godziny + dojazd do strefy 2 + dwie części
const BILL_PARTS: [string, number][] = [
  ['Syfon umywalkowy (cena zakupu)', 42],
  ['Oprawa LED nad lustrem (cena zakupu)', 89],
];
const BILL_NET = P.firstHour + P.halfHour + P.zone2Travel + BILL_PARTS.reduce((s, [, n]) => s + n, 0);
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
  nav: { services: string; care: string; prices: string; work: string };
  call: string;
  /** Pierwsza linijka wiadomości WhatsApp otwieranej z przycisków szybkiego kontaktu */
  waGreeting: string;
  hero: {
    title: string;
    lead: string;
    primary: string;
    /** Konkret w prawej kolumnie: pierwsza stawka z cennika */
    proof: { label: string; price: string; gross: string; area: string; link: string };
  };
  services: { title: string; lead: string; items: { name: string; text: string }[]; note: string };
  care: {
    title: string;
    quote: string;
    lead: string;
    points: { title: string; text: string }[];
    cta: string;
    /** Przykładowa lista po wizycie, oznaczona jako przykład */
    visit: { title: string; label: string; entries: { where: string; what: string; done: string }[] };
  };
  pricing: {
    title: string;
    lead: string;
    /** price: kwota netto; gross: brutto z VAT; text: cena słowna zamiast kwoty */
    rates: { label: string; price: string; gross?: string; note?: string; text?: boolean }[];
    /** Dopłaty: przypis pod stawkami */
    extras: { label: string; price: string }[];
    net: string;
    grossLabel: string;
    surcharges: string;
    /** Strefy dojazdu: nazwa, cena dojazdu, miejscowości */
    zones: { title: string; items: { name: string; price: string; text: string }[] };
    care: { title: string; price: string; gross: string; per: string; points: string[] };
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
    /** objaśnienie nad stawkami: netto/brutto */
    fine: string;
  };
  work: {
    title: string;
    lead: string;
    meta: string;
    photos: Record<'malowanie' | 'detal' | 'gotowe', { alt: string; caption: string }>;
  };
  faq: { title: string; more: string; items: { q: string; a: string }[] };
  contact: {
    title: string;
    steps: { title: string; text: string }[];
    direct: string;
    whatsappDirect: string;
    email: string;
    form: {
      name: string;
      phone: string;
      optional: string;
      topic: string;
      topicOptions: string[];
      who: string;
      whoOptions: string[];
      where: string;
      wherePlaceholder: string;
      what: string;
      whatPlaceholder: string;
      whatsapp: string;
      email: string;
      hint: string;
      /** link do polityki prywatności pod formularzem */
      privacy: string;
      errName: string;
      errWhat: string;
      sentWa: string;
      blockedWa: string;
      sentMail: string;
    };
  };
  footer: { area: string; rights: string; privacy: string };
}

const raw: Record<Lang, Content> = {
  pl: {
    htmlLang: 'pl',
    meta: {
      // „Złota rączka” tylko w tytule dla wyszukiwarki; na stronie mówimy „serwis”
      title: 'Złota rączka Jelenia Góra i Karkonosze | handyman.karkonosze',
      // Do ~160 znaków, żeby Google pokazał całość; kwota z cennika (config.ts)
      description: `Hydraulika, elektryka (SEP) i drobne naprawy dla pensjonatów, hoteli i domów w Karkonoszach. Stała opieka nad obiektem. Pierwsza godzina z dojazdem ${zl(P.firstHour)} netto.`,
    },
    brand: { sub: 'Serwis i opieka nad obiektami' },
    nav: { services: 'Zakres', care: 'Stała opieka', prices: 'Cennik', work: 'Realizacja' },
    call: 'Zadzwoń',
    waGreeting: 'Dzień dobry, piszę ze strony handyman.karkonosze.',
    hero: {
      title: 'Naprawię, zanim gość zauważy.',
      lead: 'Serwis techniczny i stała opieka dla pensjonatów, hoteli, apartamentów i domów w Karkonoszach: hydraulika, elektryka, montaż i drobne remonty.',
      primary: 'Opisz usterkę',
      proof: {
        label: 'Pierwsza godzina z dojazdem',
        price: zl(P.firstHour),
        gross: `netto, ${money(gross(P.firstHour))} brutto`,
        area: 'dojazd w cenie w Jeleniej Górze i okolicy',
        link: 'Pełny cennik',
      },
    },
    services: {
      title: 'Co naprawiam',
      lead: 'Drobne i średnie prace, które nie wymagają całej ekipy, ale nie mogą długo czekać.',
      items: [
        { name: 'Hydraulika', text: 'Kapiące krany, zatkane odpływy, wymiana baterii, WC i syfonów, podłączanie urządzeń.' },
        { name: 'Elektryka', text: 'Gniazdka, włączniki, oświetlenie, osprzęt rozdzielnic, szukanie przyczyny usterki.' },
        { name: 'Montaż i drobne remonty', text: 'Meble, półki, drzwi i zamki, malowanie, drobne naprawy płytek, okien i okuć.' },
      ],
      note: 'Prace elektryczne wykonuję na podstawie świadectwa kwalifikacyjnego SEP do 1 kV. Świadectwo pokazuję przed rozpoczęciem pracy.',
    },
    care: {
      title: 'Stała opieka nad obiektem',
      quote: 'Gość nie zapamięta, że kran kapał. Zapamięta, że kapał trzy dni.',
      lead: 'Przy stałej opiece usterki trafiają na listę i są usuwane, zanim zrobią się problemem.',
      points: [
        { title: 'Obchód w ustalonym rytmie', text: 'Przechodzę przez pokoje, łazienki, kotłownię i części wspólne. Częstotliwość ustalamy pod Państwa obiekt i sezon.' },
        { title: 'Lista po każdej wizycie', text: 'Dostają Państwo spis: co było, co zostało zrobione i co wymaga decyzji.' },
        { title: 'Jeden numer w sezonie', text: 'Gdy coś zepsuje się w trakcie pobytu gości, dzwonią Państwo do tej samej osoby, która zna obiekt.' },
      ],
      cta: 'Zapytaj o stałą opiekę',
      visit: {
        title: 'Lista po wizycie',
        label: 'Przykład',
        entries: [
          { where: 'Recepcja', what: 'Spalone oświetlenie nad ladą', done: 'naprawione' },
          { where: 'Pokój 3', what: 'Luźna klamka drzwi balkonowych', done: 'dokręcona' },
          { where: 'Łazienka, parter', what: 'Zapach z syfonu umywalki', done: 'wyczyszczony' },
          { where: 'Kotłownia', what: 'Za niskie ciśnienie w instalacji', done: 'uzupełnione' },
        ],
      },
    },
    pricing: {
      title: 'Ile to kosztuje',
      lead: 'Płacą Państwo za czas pracy według stawek poniżej. Cenę znają Państwo przed rozpoczęciem pracy.',
      rates: [
        { label: 'Pierwsza godzina pracy z dojazdem', price: zl(P.firstHour), gross: money(gross(P.firstHour)), note: 'Dojazd w cenie w strefie 1: Jelenia Góra i najbliższa okolica.' },
        { label: 'Każde kolejne rozpoczęte 30 minut', price: zl(P.halfHour), gross: money(gross(P.halfHour)) },
        { label: 'Dojazd do strefy 2', price: `+${zl(P.zone2Travel)}`, gross: `+${money(gross(P.zone2Travel))}`, note: 'Np. Karpacz, Kowary, Szklarska Poręba, Świeradów-Zdrój. Raz za wizytę, niezależnie od czasu pracy.' },
        { label: 'Części i materiały', price: 'po cenie zakupu', note: 'Paragon lub fakturę dołączam do rachunku. Gdy część trzeba dokupić w trakcie zlecenia, czas zakupu liczę jak czas pracy.', text: true },
      ],
      extras: [
        { label: 'Pilne zlecenie, tego samego dnia', price: `+${P.urgentPct}%` },
        { label: `W nocy (${P.night.from}:00–${P.night.to}:00) i w święta`, price: `+${P.nightPct}%` },
        { label: 'Soboty i niedziele w dzień', price: 'bez dopłaty' },
        { label: 'Oględziny bez naprawy', price: 'jak pierwsza godzina' },
      ],
      surcharges: 'Dopłaty procentowe liczę tylko od robocizny, nie od dojazdu i części.',
      zones: {
        title: 'Strefy dojazdu',
        items: [
          { name: 'Strefa 1', price: 'dojazd w cenie', text: `${site.zones.one}.` },
          { name: 'Strefa 2', price: `+${zl(P.zone2Travel)} netto za wizytę`, text: `${site.zones.two}.` },
        ],
      },
      care: {
        title: 'Stała opieka nad obiektem',
        price: `od ${zl(P.careFrom)}`,
        gross: `od ${money(gross(P.careFrom))}`,
        per: 'miesięcznie',
        points: [
          `${P.careHours} ${plHours(P.careHours)} pracy w miesiącu`,
          'dojazdy w cenie w obu strefach',
          `reakcja w ciągu ${P.careResponseH} godzin, także w weekendy`,
          'lista usterek po każdej wizycie',
          `praca ponad pakiet: ${zl(P.halfHour)} za 30 minut, bez opłaty za pierwszą godzinę`,
        ],
      },
      bill: {
        title: 'Przykładowy rachunek',
        place: 'Pensjonat, Szklarska Poręba (strefa 2)',
        job: 'Pokoje 4 i 7 · syfon, klamka, oświetlenie nad lustrem',
        time: 'Czas pracy: 1 h 30 min, trzy usterki przy jednej wizycie',
        lines: [
          ['Pierwsza godzina pracy', zl(P.firstHour)],
          ['Kolejne rozpoczęte 30 min', zl(P.halfHour)],
          ['Dojazd do strefy 2', zl(P.zone2Travel)],
          ...BILL_PARTS.map(([k, n]) => [k, zl(n)] as [string, string]),
        ],
        subtotal: ['Razem netto', zl(BILL_NET)],
        vat: [`VAT ${P.vatPct}%`, money(BILL_VAT)],
        total: ['Do zapłaty', money(BILL_GROSS)],
        status: 'rozliczone',
        note: 'Przykład wyliczony według cennika.',
      },
      fine: `Kwoty netto, obok brutto z VAT ${P.vatPct}%.`,
      net: 'netto',
      grossLabel: 'brutto',
    },
    work: {
      title: 'Z ostatniego zlecenia',
      lead: 'Ściana z górami w pokoju. Dwa dni pracy, od pierwszego paska taśmy do ostatniego szczytu.',
      meta: 'Taśmowanie i malowanie · 2 dni · 19–20 września 2026',
      photos: {
        malowanie: { alt: 'Malowanie pomarańczowego szczytu wałkiem przy samej krawędzi taśmy', caption: 'Malowanie przy krawędzi taśmy' },
        detal: { alt: 'Zdejmowanie taśmy z niebieskiego szczytu, widoczna ostra krawędź farby', caption: 'Ostra krawędź po zdjęciu taśmy' },
        gotowe: { alt: 'Gotowa ściana z zielonymi, niebieskimi i pomarańczowymi górami, obok wykonawca', caption: 'Gotowa ściana' },
      },
    },
    faq: {
      title: 'Częste pytania',
      more: 'Inne pytanie? Proszę zadzwonić albo napisać.',
      items: [
        { q: 'Czy dojeżdża Pan do Karpacza, Szklarskiej Poręby i Świeradowa-Zdroju?', a: `Tak. W strefie 1 (${site.zones.one}) dojazd jest w cenie pierwszej godziny. Karpacz, Szklarska Poręba, Świeradów-Zdrój i pozostałe miejscowości do ${R} km od Jeleniej Góry to strefa 2: doliczam ${zl(P.zone2Travel)} netto za wizytę.` },
        { q: 'Jak szybko może Pan przyjechać?', a: `Termin ustalamy przy zgłoszeniu. Gdy naprawa musi być zrobiona tego samego dnia, do robocizny doliczam ${P.urgentPct}%, w nocy i w święta ${P.nightPct}%. W soboty i niedziele w dzień pracuję bez dopłat. Przy stałej opiece reaguję w ciągu ${P.careResponseH} godzin.` },
        { q: 'Ile kosztuje przyjazd, jeśli nic nie naprawimy?', a: `Oględziny i wycena na miejscu kosztują tyle co pierwsza godzina: ${zl(P.firstHour)} netto, w strefie 2 z dopłatą ${zl(P.zone2Travel)} za dojazd. Jeśli naprawę zlecą Państwo przy tej samej wizycie, oględziny są już w cenie.` },
        { q: 'Czy wystawia Pan fakturę VAT?', a: 'Tak. Robocizna, dojazd i materiały są na niej wpisane osobno.' },
        { q: 'Czym stała opieka różni się od jednorazowego zlecenia?', a: `Przychodzę w ustalonym rytmie, spisuję usterki i usuwam je, zanim zauważą je goście. Pakiet kosztuje od ${zl(P.careFrom)} netto miesięcznie: ${P.careHours} ${plHours(P.careHours)} pracy, dojazdy w cenie w obu strefach i reakcja w ciągu ${P.careResponseH} godzin, także w weekendy. Pracę ponad pakiet liczę po ${zl(P.halfHour)} za każde rozpoczęte 30 minut, bez opłaty za pierwszą godzinę. Niewykorzystane godziny nie przechodzą na kolejny miesiąc.` },
      ],
    },
    contact: {
      title: 'Proszę opisać, co się dzieje.',
      steps: [
        { title: 'Zgłoszenie', text: 'Telefonicznie, przez WhatsApp albo formularzem, najlepiej ze zdjęciem.' },
        { title: 'Wycena', text: 'Orientacyjna na podstawie zdjęcia, dokładna po oględzinach na miejscu, zawsze przed rozpoczęciem pracy.' },
        { title: 'Naprawa', text: 'W ustalonym terminie, z narzędziami i podstawowymi częściami. Po pracy sprzątam.' },
        { title: 'Rozliczenie', text: 'Rachunek lub faktura, z robocizną, dojazdem i materiałami wpisanymi osobno.' },
      ],
      direct: 'Telefon i WhatsApp',
      whatsappDirect: 'Wiadomość na WhatsAppie',
      email: 'E-mail',
      form: {
        name: 'Imię i nazwisko',
        phone: 'Telefon',
        optional: 'opcjonalnie',
        topic: 'Czego dotyczy',
        topicOptions: ['Naprawa lub usterka', 'Stała opieka nad obiektem'],
        who: 'Rodzaj obiektu',
        whoOptions: ['Pensjonat lub hotel', 'Apartament', 'Firma', 'Dom prywatny'],
        where: 'Miejsce',
        wherePlaceholder: 'Np. Karpacz, pokój 4',
        what: 'Co jest do zrobienia',
        whatPlaceholder: 'Np. w łazience na parterze cieknie syfon pod umywalką.',
        whatsapp: 'Wyślij przez WhatsApp',
        email: 'Wyślij e-mailem',
        hint: 'Zdjęcie można dołączyć już w otwartej wiadomości.',
        privacy: 'Jak chronię Państwa dane',
        errName: 'Proszę wpisać imię i nazwisko.',
        errWhat: 'Proszę krótko opisać, co jest do zrobienia.',
        sentWa: 'Wiadomość czeka w WhatsAppie. Wystarczy ją wysłać.',
        blockedWa: 'Nie udało się otworzyć WhatsAppa. Proszę zadzwonić albo napisać na podany adres e-mail.',
        sentMail: `Wiadomość czeka w programie pocztowym. Jeśli się nie otworzył, proszę napisać na ${site.email}.`,
      },
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
