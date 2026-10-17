import type { Lang } from '../config';

export interface Content {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { services: string; care: string; process: string; trust: string; contact: string };
  call: string;
  hero: {
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    audience: string[];
  };
  log: { title: string; note: string; entries: { when: string; where: string; what: string; done: string }[] };
  services: {
    title: string;
    lead: string;
    items: { name: string; text: string; examples: string }[];
    note: string;
  };
  care: {
    title: string;
    lead: string;
    points: { title: string; text: string }[];
    cta: string;
  };
  process: { title: string; steps: { title: string; text: string }[] };
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
      error: string;
      required: string;
    };
    direct: string;
    area: string;
  };
  footer: { area: string; rights: string };
}

export const content: Record<Lang, Content> = {
  pl: {
    htmlLang: 'pl',
    meta: {
      title: 'handyman.karkonosze – serwis dla pensjonatów, hoteli i domów',
      description:
        'Hydraulika, elektryka, montaż i drobne remonty oraz stała opieka nad obiektem. Dla pensjonatów, małych hoteli, firm i osób prywatnych w Karkonoszach.',
    },
    nav: { services: 'Usługi', care: 'Stała opieka', process: 'Jak pracuję', trust: 'Zaufanie', contact: 'Kontakt' },
    call: 'Zadzwoń',
    hero: {
      title: 'Naprawię, zanim gość zauważy.',
      lead: 'Hydraulika, elektryka, montaż i drobne remonty. Dla pensjonatów, małych hoteli, firm i domów w Karkonoszach, jednorazowo albo na stałe.',
      primary: 'Opisz usterkę',
      secondary: 'Zobacz stałą opiekę',
      audience: ['Pensjonaty', 'Małe hotele', 'Firmy', 'Domy prywatne'],
    },
    log: {
      title: 'Dziennik obiektu',
      note: 'Przykładowe wpisy – tak wygląda lista po wizycie.',
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
          examples: 'baterie · odpływy · WC · podłączenia',
        },
        {
          name: 'Elektryka',
          text: 'Gniazdka, włączniki, oświetlenie, osprzęt rozdzielnic, szukanie przyczyny usterki.',
          examples: 'gniazdka · oświetlenie · usterki',
        },
        {
          name: 'Montaż i drobne remonty',
          text: 'Meble, półki, drzwi i zamki, malowanie, drobne naprawy płytek, okien i okuć.',
          examples: 'meble · drzwi · malowanie · zamki',
        },
        {
          name: 'Stała opieka nad obiektem',
          text: 'Regularne obchody, lista usterek i szybkie naprawy w sezonie. Jeden numer telefonu.',
          examples: 'obchody · usterki · sezon',
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
      steps: [
        { title: 'Opisujesz usterkę', text: 'Telefonem, na WhatsAppie albo formularzem. Najlepiej ze zdjęciem.' },
        { title: 'Dostajesz wycenę', text: 'Orientacyjną na podstawie zdjęcia, dokładną po oględzinach na miejscu.' },
        { title: 'Naprawiam w ustalonym terminie', text: 'Dojeżdżam z narzędziami i podstawowymi częściami. Po robocie sprzątam.' },
        { title: 'Rozliczamy się jasno', text: 'Rachunek lub faktura, z podziałem na robociznę i materiały.' },
      ],
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
        error: 'Wpisz imię i opisz, co jest do zrobienia.',
        required: 'wymagane',
      },
      direct: 'Wolisz zadzwonić?',
      area: 'Karkonosze i okolice: Jelenia Góra, Lubomierz, Szklarska Poręba i dalej na zapytanie.',
    },
    footer: { area: 'Karkonosze, Dolny Śląsk', rights: 'Wszelkie prawa zastrzeżone.' },
  },

  de: {
    htmlLang: 'de',
    meta: {
      title: 'Handyman Riesengebirge – Handwerker für Pensionen, Hotels und Häuser',
      description:
        'Sanitär, Elektro, Montage und kleine Renovierungen sowie feste Objektbetreuung. Für Pensionen, kleine Hotels, Firmen und Privatkunden im Riesengebirge.',
    },
    nav: { services: 'Leistungen', care: 'Objektbetreuung', process: 'Ablauf', trust: 'Vertrauen', contact: 'Kontakt' },
    call: 'Anrufen',
    hero: {
      title: 'Repariert, bevor Gäste es merken.',
      lead: 'Sanitär, Elektro, Montage und kleine Renovierungen. Für Pensionen, kleine Hotels, Firmen und Häuser im Riesengebirge, einmalig oder dauerhaft.',
      primary: 'Schaden beschreiben',
      secondary: 'Objektbetreuung ansehen',
      audience: ['Pensionen', 'Kleine Hotels', 'Firmen', 'Privathäuser'],
    },
    log: {
      title: 'Objektbuch',
      note: 'Beispieleinträge – so sieht die Liste nach einem Besuch aus.',
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
          examples: 'Armaturen · Abflüsse · WC · Anschlüsse',
        },
        {
          name: 'Elektro',
          text: 'Steckdosen, Schalter, Beleuchtung, Zubehör in Verteilern, Fehlersuche.',
          examples: 'Steckdosen · Licht · Fehlersuche',
        },
        {
          name: 'Montage und kleine Renovierungen',
          text: 'Möbel, Regale, Türen und Schlösser, Malerarbeiten, kleine Reparaturen an Fliesen, Fenstern und Beschlägen.',
          examples: 'Möbel · Türen · Malern · Schlösser',
        },
        {
          name: 'Feste Objektbetreuung',
          text: 'Regelmäßige Rundgänge, Mängelliste und schnelle Reparaturen in der Saison. Eine Telefonnummer.',
          examples: 'Rundgänge · Mängel · Saison',
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
      steps: [
        { title: 'Sie beschreiben den Schaden', text: 'Per Telefon, WhatsApp oder Formular. Am besten mit Foto.' },
        { title: 'Sie erhalten ein Angebot', text: 'Eine Richtschätzung anhand des Fotos, den genauen Preis nach Besichtigung vor Ort.' },
        { title: 'Ich repariere zum vereinbarten Termin', text: 'Ich komme mit Werkzeug und Grundteilen. Nach der Arbeit räume ich auf.' },
        { title: 'Klare Abrechnung', text: 'Rechnung mit getrennten Posten für Arbeit und Material.' },
      ],
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
        error: 'Bitte geben Sie Ihren Namen ein und beschreiben Sie, was zu tun ist.',
        required: 'Pflichtfeld',
      },
      direct: 'Lieber anrufen?',
      area: 'Riesengebirge und Umgebung: Jelenia Góra, Lubomierz, Szklarska Poręba und weiter auf Anfrage.',
    },
    footer: { area: 'Riesengebirge, Niederschlesien', rights: 'Alle Rechte vorbehalten.' },
  },

  en: {
    htmlLang: 'en',
    meta: {
      title: 'Handyman Karkonosze – repairs for guesthouses, small hotels and homes',
      description:
        'Plumbing, electrics, installation and small renovations, plus ongoing property care. For guesthouses, small hotels, businesses and homeowners in the Karkonosze mountains.',
    },
    nav: { services: 'Services', care: 'Property care', process: 'How it works', trust: 'Trust', contact: 'Contact' },
    call: 'Call',
    hero: {
      title: 'Fixed before your guest notices.',
      lead: 'Plumbing, electrics, installation and small renovations. For guesthouses, small hotels, businesses and homes in the Karkonosze, one-off or on a regular basis.',
      primary: 'Describe the problem',
      secondary: 'See property care',
      audience: ['Guesthouses', 'Small hotels', 'Businesses', 'Private homes'],
    },
    log: {
      title: 'Property log',
      note: 'Sample entries – this is what the list looks like after a visit.',
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
          examples: 'mixers · drains · toilets · connections',
        },
        {
          name: 'Electrics',
          text: 'Sockets, switches, lighting, consumer-unit fittings, tracing faults.',
          examples: 'sockets · lighting · faults',
        },
        {
          name: 'Installation and small renovations',
          text: 'Furniture, shelves, doors and locks, painting, minor repairs to tiles, windows and fittings.',
          examples: 'furniture · doors · painting · locks',
        },
        {
          name: 'Ongoing property care',
          text: 'Regular walk-rounds, a defect list and quick repairs in season. One phone number.',
          examples: 'walk-rounds · defects · season',
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
      steps: [
        { title: 'You describe the problem', text: 'By phone, WhatsApp or the form. A photo helps.' },
        { title: 'You get a quote', text: 'A rough one from the photo, an exact one after seeing it on site.' },
        { title: 'I fix it at the agreed time', text: 'I arrive with tools and basic parts, and clean up afterwards.' },
        { title: 'Clear billing', text: 'An invoice with labour and materials listed separately.' },
      ],
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
        error: 'Enter your name and describe what needs doing.',
        required: 'required',
      },
      direct: 'Prefer to call?',
      area: 'Karkonosze and surroundings: Jelenia Góra, Lubomierz, Szklarska Poręba and further on request.',
    },
    footer: { area: 'Karkonosze, Lower Silesia', rights: 'All rights reserved.' },
  },
};
