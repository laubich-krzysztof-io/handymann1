import { site, type Lang } from '../config';

// Kwoty z config.ts, z twardą spacją przed walutą (cena nie rozpada się między wiersze)
const P = site.pricing;
const zl = (n: number) => `${n}\u00a0zł`;
// Kwota z groszami w zapisie danego języka (86,10 / 86.10), bez groszy, gdy całe złote
const loc: Record<Lang, string> = { pl: 'pl-PL', de: 'de-DE', en: 'en-GB' };
const money = (n: number, lang: Lang) =>
  `${new Intl.NumberFormat(loc[lang], { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)}\u00a0zł`;
const gross = (n: number) => Math.round(n * (100 + P.vatPct)) / 100;
const R = site.radiusKm;
// Przykładowy rachunek: 1 h 20 min pracy = pierwsza godzina + jedno rozpoczęte pół godziny + część
const BILL_PART = 189;
const BILL_NET = P.firstHour + P.halfHour + BILL_PART;
const BILL_VAT = Math.round(BILL_NET * P.vatPct) / 100;
const BILL_GROSS = Math.round((BILL_NET + BILL_VAT) * 100) / 100;
const h12 = (h: number) => `${h % 12 || 12}\u00a0${h < 12 ? 'am' : 'pm'}`;
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
  footer: { area: string; rights: string };
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
        { label: 'Pierwsza godzina pracy z dojazdem', price: zl(P.firstHour), gross: money(gross(P.firstHour), 'pl') },
        { label: 'Każde kolejne rozpoczęte 30\u00a0minut', price: zl(P.halfHour), gross: money(gross(P.halfHour), 'pl') },
        { label: 'Części i materiały', price: 'po cenie zakupu', note: 'Paragon lub fakturę zakupu dołączam do rachunku.', text: true },
        { label: 'Pilne zlecenie, tego samego dnia', price: `+${P.urgentPct}%`, extra: true },
        { label: `W nocy (${P.night.from}:00–${P.night.to}:00) i w święta`, price: `+${P.nightPct}%`, extra: true },
      ],
      surcharges: 'Dopłaty liczę tylko od robocizny, nie od części.',
      area: `Dojazd w cenie w promieniu ${R}\u00a0km od Jeleniej Góry: Jelenia Góra z Cieplicami, Karpacz, Szklarska Poręba, Świeradów-Zdrój, Podgórzyn, Mysłakowice, Kowary, Piechowice i miejscowości po drodze.`,
      care: {
        title: 'Stała opieka nad obiektem',
        price: `od ${zl(P.careFrom)}`,
        gross: `od ${money(gross(P.careFrom), 'pl')}`,
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
        vat: [`VAT ${P.vatPct}%`, money(BILL_VAT, 'pl')],
        total: ['Do zapłaty', money(BILL_GROSS, 'pl')],
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
    footer: { area: 'Karkonosze, Dolny Śląsk', rights: 'Wszelkie prawa zastrzeżone.' },
  },

  de: {
    htmlLang: 'de',
    meta: {
      title: 'Handwerker Jelenia Góra, Karpacz, Szklarska Poręba | handyman.karkonosze',
      description: `Sanitär, Elektro (SEP-Qualifikation) und Reparaturen für Pensionen, Hotels und Häuser, bis ${R}\u00a0km um Jelenia Góra. Erste Stunde inkl. Anfahrt: ${zl(P.firstHour)} netto.`,
    },
    brand: { sub: 'Reparaturen und Objektbetreuung' },
    nav: { services: 'Leistungen', care: 'Betreuung', process: 'Ablauf', prices: 'Preise', work: 'Referenz' },
    call: 'Anrufen',
    waGreeting: 'Guten Tag, ich schreibe über handyman.karkonosze.',
    hero: {
      title: 'Repariert, bevor Gäste es merken.',
      lead: 'Handwerker für Pensionen, kleine Hotels, Firmen und Häuser: Sanitär, Elektro, Montage und kleine Renovierungen. Jelenia Góra, Karpacz, Szklarska Poręba und Umgebung, einmalig oder dauerhaft.',
      primary: 'Schaden melden',
      entryLabel: 'Objektbuch · Beispieleintrag',
      entryMore: 'So sieht die Objektbetreuung aus',
    },
    log: {
      title: 'Objektbuch',
      note: 'Beispieleinträge – so sieht die Liste nach einem Besuch aus.',
      pause: 'Laufendes Objektbuch anhalten',
      entries: [
        { when: 'Mo 08:10', where: 'Zi. 7', what: 'Duscharmatur tropft', done: 'ersetzt' },
        { when: 'Mo 09:40', where: 'Rezeption', what: 'Beleuchtung über dem Tresen defekt', done: 'repariert' },
        { when: 'Mo 11:15', where: 'Zi. 3', what: 'Balkontürgriff wackelt', done: 'festgezogen' },
        { when: 'Mo 12:30', where: 'Bad EG', what: 'Waschbecken-Siphon riecht', done: 'gereinigt' },
        { when: 'Di 08:00', where: 'Speisesaal', what: 'Steckdose am Kaffeeautomaten funkt', done: 'ersetzt' },
        { when: 'Di 10:20', where: 'Zi. 5', what: 'Regal über dem Bett löst sich', done: 'montiert' },
        { when: 'Di 13:05', where: 'Heizraum', what: 'Anlagendruck zu niedrig', done: 'aufgefüllt' },
        { when: 'Di 15:00', where: 'Terrasse', what: 'Gartenleuchte ohne Licht', done: 'repariert' },
      ],
    },
    services: {
      title: 'Was ich repariere',
      lead: 'Kleine und mittlere Arbeiten, für die man kein ganzes Team braucht, die aber nicht lange warten können.',
      items: [
        {
          name: 'Sanitär',
          text: 'Tropfende Hähne, verstopfte Abflüsse, Austausch von Armaturen, WC und Siphons, Geräteanschlüsse.',
        },
        {
          name: 'Elektro',
          text: 'Steckdosen, Schalter, Beleuchtung, Zubehör in Verteilern, Fehlersuche.',
        },
        {
          name: 'Montage und kleine Renovierungen',
          text: 'Möbel, Regale, Türen und Schlösser, Malerarbeiten, kleine Reparaturen an Fliesen, Fenstern und Beschlägen.',
        },
        {
          name: 'Feste Objektbetreuung',
          text: 'Regelmäßige Rundgänge, Mängelliste und schnelle Reparaturen in der Saison. Eine Telefonnummer.',
        },
      ],
      note: 'Elektroarbeiten führe ich auf Grundlage meiner SEP-Qualifikation bis 1 kV aus.',
    },
    care: {
      title: 'Feste Objektbetreuung',
      lead: 'Ein Gast vergisst, dass ein Hahn getropft hat. Er erinnert sich, dass er drei Tage getropft hat. Bei fester Betreuung landen Mängel auf einer Liste und werden behoben, bevor sie zum Problem werden.',
      points: [
        { title: 'Rundgang im festen Rhythmus', text: 'Ich gehe durch Zimmer, Bäder, Heizraum und Gemeinschaftsflächen. Den Takt legen wir passend zu Ihrem Haus und der Saison fest.' },
        { title: 'Liste nach jedem Besuch', text: 'Sie erhalten Einträge: was war, was erledigt ist, was Ihre Entscheidung braucht. Ohne Nachfragen, wer was repariert hat.' },
        { title: 'Eine Nummer in der Saison', text: 'Geht während des Aufenthalts etwas kaputt, rufen Sie dieselbe Person an, die Ihr Haus kennt.' },
      ],
      cta: 'Objektbetreuung anfragen',
    },
    process: {
      title: 'Ablauf',
      lead: 'Ein Auftrag, von der Nachricht bis zur Rechnung.',
      steps: [
        { status: 'gemeldet', title: 'Sie beschreiben den Schaden', text: 'Per Telefon, WhatsApp oder Formular. Am besten mit Foto.' },
        { status: 'angeboten', title: 'Sie erhalten ein Angebot', text: 'Eine Richtschätzung anhand des Fotos, den genauen Preis nach Besichtigung vor Ort.' },
        { status: 'repariert', title: 'Ich repariere zum vereinbarten Termin', text: 'Ich komme mit Werkzeug und Grundteilen. Nach der Arbeit räume ich auf.' },
        { status: 'abgerechnet', title: 'Klare Abrechnung', text: 'Rechnung mit getrennten Posten für Arbeit und Material.' },
      ],
    },
    pricing: {
      title: 'Was es kostet',
      lead: 'Sie zahlen die Arbeitszeit nach den Sätzen unten. Eine Richtschätzung bekommen Sie anhand eines Fotos, bevor ich anreise.',
      rates: [
        { label: 'Erste Arbeitsstunde inkl. Anfahrt', price: zl(P.firstHour), gross: money(gross(P.firstHour), 'de') },
        { label: 'Jede weitere angefangene halbe Stunde', price: zl(P.halfHour), gross: money(gross(P.halfHour), 'de') },
        { label: 'Ersatzteile und Material', price: 'zum Einkaufspreis', note: 'Den Kaufbeleg lege ich der Rechnung bei.', text: true },
        { label: 'Eilauftrag am selben Tag', price: `+${P.urgentPct}\u00a0%`, extra: true },
        { label: `Nachts (${P.night.from}–${P.night.to}\u00a0Uhr) und an Feiertagen`, price: `+${P.nightPct}\u00a0%`, extra: true },
      ],
      surcharges: 'Zuschläge gelten nur für die Arbeitszeit, nicht für Teile.',
      area: `Anfahrt inklusive im Umkreis von ${R}\u00a0km um Jelenia Góra: Jelenia Góra mit Cieplice, Karpacz, Szklarska Poręba, Świeradów-Zdrój, Podgórzyn, Mysłakowice, Kowary, Piechowice und die Orte dazwischen.`,
      care: {
        title: 'Feste Objektbetreuung',
        price: `ab ${zl(P.careFrom)}`,
        gross: `ab ${money(gross(P.careFrom), 'de')}`,
        per: 'monatlich',
        points: [
          `${P.careHours} ${P.careHours === 1 ? 'Arbeitsstunde' : 'Arbeitsstunden'} im Monat`,
          'Anfahrten inklusive',
          `Reaktion innerhalb von ${P.careResponseH}\u00a0Stunden`,
          'Mängelliste nach jedem Besuch',
        ],
        link: 'So sieht die Objektbetreuung aus',
      },
      bill: {
        title: 'Beispielrechnung',
        place: 'Pension, Szklarska Poręba',
        job: 'Zi. 7 · Duscharmatur tropft',
        time: 'Arbeitszeit: 1\u00a0Std. 20\u00a0Min.',
        lines: [
          ['Erste Stunde inkl. Anfahrt', zl(P.firstHour)],
          ['Weitere angefangene halbe Stunde', zl(P.halfHour)],
          ['Duscharmatur (Einkaufspreis)', zl(BILL_PART)],
        ],
        subtotal: ['Summe netto', zl(BILL_NET)],
        vat: [`MwSt. ${P.vatPct}\u00a0%`, money(BILL_VAT, 'de')],
        total: ['Zu zahlen', money(BILL_GROSS, 'de')],
        status: 'abgerechnet',
        note: 'Beispiel, berechnet nach dieser Preisliste.',
      },
      fine: `Nettobeträge in Złoty (PLN), darunter brutto mit ${P.vatPct}\u00a0% MwSt.`,
      net: 'netto',
      grossLabel: 'brutto',
    },
    trust: {
      title: 'Warum Sie mir vertrauen können',
      items: [
        { title: 'SEP-Qualifikation bis 1 kV', text: 'Polnischer Elektro-Befähigungsnachweis für Installation, Montage und Wartung. Den Nachweis zeige ich vor Arbeitsbeginn.' },
        { title: 'Angebot per Foto', text: 'Sie wissen, was auf Sie zukommt, bevor jemand anreist.' },
        { title: 'Jedes Mal dieselbe Person', text: 'Kein Vermittler und kein wechselndes Team. Ich kenne Ihr Haus.' },
      ],
    },
    work: {
      title: 'Aus dem letzten Auftrag',
      lead: 'Eine Wand mit Bergen im Zimmer. Zwei Arbeitstage, vom ersten Streifen Klebeband bis zum letzten Gipfel.',
      facts: [['Umfang', 'Abkleben und Streichen'], ['Dauer', '2 Tage'], ['Termin', '19.–20. September 2026']],
      photos: {
        tasma: 'Berggipfel werden mit Malerkrepp auf der weißen Wand angezeichnet',
        malowanie: 'Ein orangefarbener Gipfel wird mit dem Pinsel bis an die Klebekante gestrichen',
        detal: 'Klebeband wird von einem blauen Gipfel abgezogen, die Farbkante ist scharf',
        gotowe: 'Fertige Wand mit grünen, blauen und orangefarbenen Bergen, daneben der Handwerker',
      },
    },
    gallery: { title: 'Referenzen' },
    contact: {
      title: 'Beschreiben Sie, was los ist.',
      lead: 'Füllen Sie das kurze Formular aus. Danach öffnet sich eine Nachricht an mich mit fertiger Beschreibung, Sie müssen sie nur absenden.',
      form: {
        name: 'Name',
        phone: 'Telefon',
        who: 'Wer sind Sie',
        whoOptions: ['Pension / Hotel', 'Firma', 'Privatperson'],
        what: 'Was ist zu tun',
        whatPlaceholder: 'Z. B. Duscharmatur tropft seit gestern.',
        whatsapp: 'Per WhatsApp senden',
        email: 'Per E-Mail senden',
        hint: 'Ein Foto fügen Sie in der geöffneten Nachricht hinzu.',
        where: 'Wo',
        wherePlaceholder: 'Z. B. Zimmer 4, Bad',
        errName: 'Bitte geben Sie Ihren Namen ein.',
        errWhat: 'Beschreiben Sie kurz, was zu tun ist.',
        sentWa: 'Die Nachricht wartet in WhatsApp. Senden Sie sie dort ab, ich melde mich.',
        sentMail: 'Die Nachricht wartet in Ihrem E-Mail-Programm. Senden Sie sie ab, ich melde mich.',
        required: 'Pflichtfeld',
      },
      direct: 'Lieber anrufen oder schreiben?',
      whatsappDirect: 'Per WhatsApp schreiben',
      area: `Ich arbeite im Umkreis von ${R}\u00a0km um Jelenia Góra.`,
    },
    footer: { area: 'Riesengebirge, Niederschlesien', rights: 'Alle Rechte vorbehalten.' },
  },

  en: {
    htmlLang: 'en',
    meta: {
      title: 'Handyman Jelenia Góra, Karpacz, Szklarska Poręba | handyman.karkonosze',
      description: `Plumbing, SEP-licensed electrics and repairs for guesthouses, hotels and homes within ${R}\u00a0km of Jelenia Góra. First hour incl. travel: ${zl(P.firstHour)} + VAT.`,
    },
    brand: { sub: 'Repairs and property care' },
    nav: { services: 'Services', care: 'Property care', process: 'How it works', prices: 'Prices', work: 'Recent job' },
    call: 'Call',
    waGreeting: 'Hello, I am writing via handyman.karkonosze.',
    hero: {
      title: 'Fixed before your guest notices.',
      lead: 'A handyman for guesthouses, small hotels, businesses and homes: plumbing, electrics, installation and small renovations. Jelenia Góra, Karpacz, Szklarska Poręba and around, one-off or on a regular basis.',
      primary: 'Report a fault',
      entryLabel: 'Property log · sample entry',
      entryMore: 'This is what property care looks like',
    },
    log: {
      title: 'Property log',
      note: 'Sample entries – this is what the list looks like after a visit.',
      pause: 'Pause the scrolling log',
      entries: [
        { when: 'Mon 08:10', where: 'Room 7', what: 'Shower mixer dripping', done: 'replaced' },
        { when: 'Mon 09:40', where: 'Reception', what: 'Light over the desk dead', done: 'repaired' },
        { when: 'Mon 11:15', where: 'Room 3', what: 'Balcony door handle loose', done: 'tightened' },
        { when: 'Mon 12:30', where: 'Ground-floor bath', what: 'Basin trap smells', done: 'cleaned' },
        { when: 'Tue 08:00', where: 'Dining room', what: 'Socket by the coffee machine sparks', done: 'replaced' },
        { when: 'Tue 10:20', where: 'Room 5', what: 'Shelf over the bed coming off', done: 'fitted' },
        { when: 'Tue 13:05', where: 'Boiler room', what: 'System pressure too low', done: 'topped up' },
        { when: 'Tue 15:00', where: 'Terrace', what: 'Garden light not working', done: 'repaired' },
      ],
    },
    services: {
      title: 'What I repair',
      lead: 'Small and mid-size jobs that do not need a whole crew but cannot wait long.',
      items: [
        {
          name: 'Plumbing',
          text: 'Dripping taps, blocked drains, replacing mixers, toilets and traps, appliance connections.',
        },
        {
          name: 'Electrics',
          text: 'Sockets, switches, lighting, consumer-unit fittings, tracing faults.',
        },
        {
          name: 'Installation and small renovations',
          text: 'Furniture, shelves, doors and locks, painting, minor repairs to tiles, windows and fittings.',
        },
        {
          name: 'Ongoing property care',
          text: 'Regular walk-rounds, a defect list and quick repairs in season. One phone number.',
        },
      ],
      note: 'Electrical work is carried out under my SEP licence up to 1 kV.',
    },
    care: {
      title: 'Regular property care',
      lead: 'A guest will not remember that a tap dripped. They will remember it dripped for three days. With regular care, defects go on a list and get fixed before they become a problem.',
      points: [
        { title: 'Walk-rounds on a fixed rhythm', text: 'I go through rooms, bathrooms, the boiler room and shared areas. We set the frequency to suit your property and season.' },
        { title: 'A list after every visit', text: 'You get entries: what was wrong, what is done, what needs your decision. No chasing who fixed what.' },
        { title: 'One number in season', text: 'When something breaks during a stay, you call the same person who already knows your property.' },
      ],
      cta: 'Ask about property care',
    },
    process: {
      title: 'How it works',
      lead: 'One job, from your message to the invoice.',
      steps: [
        { status: 'reported', title: 'You describe the problem', text: 'By phone, WhatsApp or the form. A photo helps.' },
        { status: 'quoted', title: 'You get a quote', text: 'A rough one from the photo, an exact one after seeing it on site.' },
        { status: 'fixed', title: 'I fix it at the agreed time', text: 'I arrive with tools and basic parts, and clean up afterwards.' },
        { status: 'invoiced', title: 'Clear billing', text: 'An invoice with labour and materials listed separately.' },
      ],
    },
    pricing: {
      title: 'What it costs',
      lead: 'You pay for the time worked at the rates below. You get a rough quote from a photo before I drive out.',
      rates: [
        { label: 'First hour of work, travel included', price: zl(P.firstHour), gross: money(gross(P.firstHour), 'en') },
        { label: 'Each further 30\u00a0minutes or part of it', price: zl(P.halfHour), gross: money(gross(P.halfHour), 'en') },
        { label: 'Parts and materials', price: 'at cost', note: 'The purchase receipt comes with the invoice.', text: true },
        { label: 'Urgent, same-day job', price: `+${P.urgentPct}%`, extra: true },
        { label: `Nights (${h12(P.night.from)}–${h12(P.night.to)}) and public holidays`, price: `+${P.nightPct}%`, extra: true },
      ],
      surcharges: 'Surcharges apply to labour only, never to parts.',
      area: `Travel included within ${R}\u00a0km of Jelenia Góra: Jelenia Góra and Cieplice, Karpacz, Szklarska Poręba, Świeradów-Zdrój, Podgórzyn, Mysłakowice, Kowary, Piechowice and the places in between.`,
      care: {
        title: 'Regular property care',
        price: `from ${zl(P.careFrom)}`,
        gross: `from ${money(gross(P.careFrom), 'en')}`,
        per: 'a month',
        points: [
          `${P.careHours} ${P.careHours === 1 ? 'hour' : 'hours'} of work a month`,
          'Travel included',
          `Response within ${P.careResponseH}\u00a0hours`,
          'A defect list after every visit',
        ],
        link: 'What property care looks like',
      },
      bill: {
        title: 'Sample bill',
        place: 'Guesthouse, Szklarska Poręba',
        job: 'Room 7 · shower mixer dripping',
        time: 'Time on site: 1\u00a0h 20\u00a0min',
        lines: [
          ['First hour incl. travel', zl(P.firstHour)],
          ['Further 30\u00a0min (started)', zl(P.halfHour)],
          ['Shower mixer (at cost)', zl(BILL_PART)],
        ],
        subtotal: ['Net total', zl(BILL_NET)],
        vat: [`VAT ${P.vatPct}%`, money(BILL_VAT, 'en')],
        total: ['To pay', money(BILL_GROSS, 'en')],
        status: 'invoiced',
        note: 'An example priced from this list.',
      },
      fine: `Net amounts in Polish złoty (PLN), with the price incl. ${P.vatPct}% VAT below.`,
      net: 'net',
      grossLabel: 'incl. VAT',
    },
    trust: {
      title: 'Why you can trust me',
      items: [
        { title: 'SEP electrical licence up to 1 kV', text: 'Polish certification for electrical installation, fitting and maintenance. I will show the certificate before work starts.' },
        { title: 'Quote from a photo', text: 'You know what to expect before anyone drives out.' },
        { title: 'The same person every time', text: 'Not a middleman and not a rotating crew. I know your property.' },
      ],
    },
    work: {
      title: 'From the last job',
      lead: 'A mountain wall in a room. Two days of work, from the first strip of tape to the last peak.',
      facts: [['Scope', 'Taping and painting'], ['Time', '2 days'], ['Dates', '19–20 September 2026']],
      photos: {
        tasma: 'Marking mountain peaks on a white wall with masking tape',
        malowanie: 'Painting an orange peak with a brush right up to the tape edge',
        detal: 'Pulling tape off a blue peak, leaving a crisp paint edge',
        gotowe: 'The finished wall with green, blue and orange mountains, the painter beside it',
      },
    },
    gallery: { title: 'Selected work' },
    contact: {
      title: 'Tell me what is going on.',
      lead: 'Fill in the short form. A message to me will open with the description ready, you only need to send it.',
      form: {
        name: 'Name',
        phone: 'Phone',
        who: 'Who you are',
        whoOptions: ['Guesthouse / hotel', 'Business', 'Private owner'],
        what: 'What needs doing',
        whatPlaceholder: 'E.g. shower mixer dripping since yesterday.',
        whatsapp: 'Send via WhatsApp',
        email: 'Send by email',
        hint: 'You can attach a photo in the message that opens.',
        where: 'Where',
        wherePlaceholder: 'E.g. room 4, bathroom',
        errName: 'Enter your name.',
        errWhat: 'Describe briefly what needs doing.',
        sentWa: 'Your message is ready in WhatsApp. Send it there and I will get back to you.',
        sentMail: 'Your message is ready in your email app. Send it and I will get back to you.',
        required: 'required',
      },
      direct: 'Prefer to call or message?',
      whatsappDirect: 'Message on WhatsApp',
      area: `I work within ${R}\u00a0km of Jelenia Góra.`,
    },
    footer: { area: 'Karkonosze, Lower Silesia', rights: 'All rights reserved.' },
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
  ...raw,
  pl: { ...(glue(plRest) as Omit<Content, 'meta' | 'waGreeting'>), meta, waGreeting },
};
