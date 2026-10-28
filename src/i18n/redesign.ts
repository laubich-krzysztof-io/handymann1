import type { Lang } from '../config';

interface Redesign {
  location: string;
  title: [string, string];
  intro: string;
  estimate: string;
  photoLabel: string;
  photoCaption: string;
  photoLink: string;
  personal: string;
  serviceEyebrow: string;
  serviceTitle: string;
  serviceCta: string;
  workEyebrow: string;
  workTitle: string;
  workTabs: [string, string, string, string];
  careEyebrow: string;
  careTitle: string;
  careLink: string;
  pricingEyebrow: string;
  pricingTitle: string;
  processTitle: string;
  areaEyebrow: string;
  areaTitle: string;
  areaNote: string;
  contactEyebrow: string;
  contactTitle: string;
  serviceLabel: string;
  serviceAny: string;
  noJs: string;
  formIntro: string;
  sendWa: string;
  sendMail: string;
  preparedWa: string;
  preparedMail: string;
  messageSubject: string;
  openWa: string;
  openMail: string;
  calculator: {
    title: string;
    intro: string;
    time: string;
    materials: string;
    net: string;
    vat: string;
    total: string;
    note: string;
    cta: string;
    invalid: string;
    noJs: string;
  };
}

export const redesign: Record<Lang, Redesign> = {
  pl: {
    location: 'Twój fachowiec w Karkonoszach',
    title: ['Małe usterki.', 'Duży spokój.'],
    intro:
      'Od kapiącego kranu po opiekę nad całym pensjonatem. Naprawiam, montuję i dbam o to, żeby wszystko działało. Ty masz czas na swoje sprawy.',
    estimate: 'Sprawdź koszt wizyty',
    photoLabel: 'Z ostatniej realizacji',
    photoCaption: 'Karkonosze, tym razem na ścianie.',
    photoLink: 'Zobacz, jak powstały',
    personal: 'Rozmawiasz ze mną. Przyjeżdżam ja.',
    serviceEyebrow: 'W czym mogę pomóc',
    serviceTitle: 'Jeden kontakt.\nWiele spraw z głowy.',
    serviceCta: 'Zapytaj o tę usługę',
    workEyebrow: 'Zrobione, nie obiecane',
    workTitle: 'Góry zostają.\nTaśma schodzi.',
    workTabs: ['Przygotowanie', 'Malowanie', 'Detal', 'Gotowy efekt'],
    careEyebrow: 'Dla pensjonatów, hoteli i firm',
    careTitle: 'Ty dbasz o gości.\nJa dbam o resztę.',
    careLink: 'Zobacz zakres opieki',
    pricingEyebrow: 'Jasne zasady od początku',
    pricingTitle: 'Wiesz, za co płacisz.',
    processTitle: 'Od „zepsuło się”\ndo „zrobione”.',
    areaEyebrow: 'Blisko Ciebie',
    areaTitle: 'Stąd jestem.\nTutaj pomagam.',
    areaNote: 'Dojazd w cenie pierwszej godziny pracy.',
    contactEyebrow: 'Zacznijmy od rozmowy',
    contactTitle: 'Co mogę\ndla Ciebie zrobić?',
    serviceLabel: 'Rodzaj pracy',
    serviceAny: 'Wybierz lub opisz poniżej',
    noJs: 'Formularz wymaga JavaScript. Możesz zadzwonić lub skorzystać z bezpośredniego linku WhatsApp obok.',
    formIntro:
      'Krótki opis wystarczy na początek. Wiadomość wyślesz w WhatsAppie lub swojej poczcie.',
    sendWa: 'Przygotuj wiadomość WhatsApp',
    sendMail: 'Przygotuj e-mail',
    preparedWa: 'Opis jest gotowy. Otwórz WhatsApp poniżej, dołącz zdjęcie i wyślij wiadomość.',
    preparedMail: 'Opis jest gotowy. Otwórz pocztę poniżej i wyślij wiadomość.',
    messageSubject: 'Zapytanie ze strony handyman.karkonosze',
    openWa: 'Otwórz WhatsApp',
    openMail: 'Otwórz pocztę',
    calculator: {
      title: 'Policz swoją wizytę',
      intro: 'Orientacyjny koszt w standardowym terminie.',
      time: 'Szacowany czas pracy',
      materials: 'Materiały — koszt netto (zł)',
      net: 'Robocizna i materiały netto',
      vat: 'VAT',
      total: 'Orientacyjnie do zapłaty',
      note: 'Dojazd w promieniu {radius} km wliczony. Pilne zlecenia, noce i święta mają dopłaty z cennika. Dokładną cenę ustalamy po oględzinach.',
      cta: 'Zapytaj o termin',
      invalid: 'Wpisz koszt materiałów od 0 do 1 000 000 zł, maksymalnie dwa miejsca po przecinku.',
      noJs: 'To przykład dla jednej godziny bez materiałów. Włącz JavaScript, aby zmienić czas i koszt materiałów, lub skorzystaj z cennika obok.',
    },
  },
  de: {
    location: 'Ihr Handwerker im Riesengebirge',
    title: ['Kleine Mängel.', 'Große Ruhe.'],
    intro:
      'Vom tropfenden Wasserhahn bis zur Betreuung Ihrer Pension. Ich repariere, montiere und halte alles am Laufen. Sie haben Zeit für das Wesentliche.',
    estimate: 'Kosten berechnen',
    photoLabel: 'Ein aktuelles Projekt',
    photoCaption: 'Das Riesengebirge, diesmal an der Wand.',
    photoLink: 'So ist es entstanden',
    personal: 'Sie sprechen mit mir. Ich komme vorbei.',
    serviceEyebrow: 'Wobei ich helfe',
    serviceTitle: 'Ein Kontakt.\nVieles erledigt.',
    serviceCta: 'Diese Leistung anfragen',
    workEyebrow: 'Gemacht, nicht nur versprochen',
    workTitle: 'Die Berge bleiben.\nDas Klebeband geht.',
    workTabs: ['Vorbereitung', 'Streichen', 'Detail', 'Ergebnis'],
    careEyebrow: 'Für Pensionen, Hotels und Firmen',
    careTitle: 'Sie kümmern sich um Gäste.\nIch um den Rest.',
    careLink: 'Betreuung ansehen',
    pricingEyebrow: 'Klare Konditionen',
    pricingTitle: 'Sie wissen, wofür Sie zahlen.',
    processTitle: 'Von „kaputt”\nzu „erledigt”.',
    areaEyebrow: 'In Ihrer Nähe',
    areaTitle: 'Hier zu Hause.\nHier für Sie da.',
    areaNote: 'Anfahrt in der ersten Arbeitsstunde enthalten.',
    contactEyebrow: 'Fangen wir mit einem Gespräch an',
    contactTitle: 'Was kann ich\nfür Sie tun?',
    serviceLabel: 'Art der Arbeit',
    serviceAny: 'Auswählen oder unten beschreiben',
    noJs: 'Das Formular benötigt JavaScript. Rufen Sie an oder nutzen Sie den direkten WhatsApp-Link daneben.',
    formIntro:
      'Eine kurze Beschreibung genügt. Sie senden die Nachricht anschließend in WhatsApp oder Ihrem E-Mail-Programm.',
    sendWa: 'WhatsApp-Nachricht vorbereiten',
    sendMail: 'E-Mail vorbereiten',
    preparedWa:
      'Die Beschreibung ist fertig. Öffnen Sie unten WhatsApp, fügen Sie ein Foto hinzu und senden Sie die Nachricht.',
    preparedMail:
      'Die Beschreibung ist fertig. Öffnen Sie unten Ihr E-Mail-Programm und senden Sie die Nachricht.',
    messageSubject: 'Anfrage über handyman.karkonosze',
    openWa: 'WhatsApp öffnen',
    openMail: 'E-Mail-Programm öffnen',
    calculator: {
      title: 'Besuch kalkulieren',
      intro: 'Ungefähre Kosten für einen regulären Termin.',
      time: 'Geschätzte Arbeitszeit',
      materials: 'Materialkosten netto (zł)',
      net: 'Arbeit und Material netto',
      vat: 'MwSt.',
      total: 'Voraussichtlicher Gesamtpreis',
      note: 'Anfahrt im Umkreis von {radius} km enthalten. Für Eilaufträge, Nächte und Feiertage gelten die Zuschläge der Preisliste. Den genauen Preis vereinbaren wir nach der Besichtigung.',
      cta: 'Termin anfragen',
      invalid:
        'Materialkosten zwischen 0 und 1.000.000 zł mit höchstens zwei Nachkommastellen eingeben.',
      noJs: 'Dieses Beispiel gilt für eine Stunde ohne Material. Aktivieren Sie JavaScript zum Ändern der Werte oder nutzen Sie die Preisliste.',
    },
  },
  en: {
    location: 'Your local handyman in Karkonosze',
    title: ['Small repairs.', 'Peace of mind.'],
    intro:
      'From a dripping tap to looking after your whole guesthouse. I repair, install and keep things working. You get on with your day.',
    estimate: 'Estimate your visit',
    photoLabel: 'A recent project',
    photoCaption: 'Karkonosze, this time on a wall.',
    photoLink: 'See how it came together',
    personal: 'You speak to me. I do the work.',
    serviceEyebrow: 'How I can help',
    serviceTitle: 'One contact.\nA shorter to-do list.',
    serviceCta: 'Ask about this service',
    workEyebrow: 'The work speaks for itself',
    workTitle: 'The mountains stay.\nThe tape comes off.',
    workTabs: ['Preparation', 'Painting', 'Detail', 'Finished wall'],
    careEyebrow: 'For guesthouses, hotels and businesses',
    careTitle: 'You look after your guests.\nI look after the rest.',
    careLink: 'Explore property care',
    pricingEyebrow: 'Clear from the start',
    pricingTitle: 'Know what you are paying for.',
    processTitle: 'From “broken”\nto “sorted”.',
    areaEyebrow: 'In your neighbourhood',
    areaTitle: 'Based here.\nHere to help.',
    areaNote: 'Travel included in the first hour of work.',
    contactEyebrow: 'Let’s start with a conversation',
    contactTitle: 'What can I\nhelp you with?',
    serviceLabel: 'Type of work',
    serviceAny: 'Choose or describe below',
    noJs: 'This form needs JavaScript. You can call or use the direct WhatsApp link next to it.',
    formIntro:
      'A short description is enough to start. You send the message in WhatsApp or your email app.',
    sendWa: 'Prepare WhatsApp message',
    sendMail: 'Prepare email',
    preparedWa:
      'Your description is ready. Open WhatsApp below, add a photo and send your message.',
    preparedMail: 'Your description is ready. Open your email app below and send your message.',
    messageSubject: 'Enquiry via handyman.karkonosze',
    openWa: 'Open WhatsApp',
    openMail: 'Open email app',
    calculator: {
      title: 'Estimate your visit',
      intro: 'An estimate for a standard appointment.',
      time: 'Estimated working time',
      materials: 'Materials — net cost (zł)',
      net: 'Labour and materials, net',
      vat: 'VAT',
      total: 'Estimated total to pay',
      note: 'Travel within {radius} km included. Urgent work, nights and public holidays carry the listed surcharges. We agree the exact price after seeing the job.',
      cta: 'Ask about a date',
      invalid: 'Enter material costs from 0 to 1,000,000 zł with at most two decimal places.',
      noJs: 'This example shows one hour without materials. Enable JavaScript to change the values, or refer to the price list.',
    },
  },
};
