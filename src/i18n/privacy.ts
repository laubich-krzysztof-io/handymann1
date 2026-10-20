import { site, type Lang } from '../config';

// Polityka prywatności (RODO / DSGVO / GDPR). Dane administratora pochodzą z config.ts.
// Przed publikacją na domenie: uzupełnij company, nip, address, email i telefon w config.ts
// i daj tekst do przejrzenia księgowej albo prawnikowi.

export interface PrivacySection { h: string; p?: string[]; list?: string[] }
export interface Privacy {
  slug: string;
  title: string;
  /** Nagłówek na stronie; może mieć miękkie dywizy (\u00ad), których nie chcemy w <title> */
  heading?: string;
  description: string;
  lead: string;
  updated: string;
  back: string;
  sections: PrivacySection[];
}

/** Ścieżki strony prywatności w każdym języku (dla hreflang i przełącznika języka) */
export const privacySlug: Record<Lang, string> = { pl: 'prywatnosc', de: 'datenschutz', en: 'privacy' };
export const privacyPath = (l: Lang) => `/${l}/${privacySlug[l]}/`;

const admin = [site.company || site.name, site.address, site.nip && `NIP ${site.nip}`].filter(Boolean).join(', ');
const reach = site.contactReady ? `${site.email}, ${site.phone}` : site.email;

export const privacy: Record<Lang, Privacy> = {
  pl: {
    slug: privacySlug.pl,
    title: 'Polityka prywatności',
    description: `Jakie dane trafiają do ${site.name}, po co i jakie masz prawa. Formularz niczego nie zapisuje na stronie, a strona nie używa cookies.`,
    lead: 'Krótko i konkretnie: jakie dane do mnie trafiają, po co i jakie masz prawa.',
    updated: 'Aktualizacja: 20 października 2026',
    back: 'Wróć na stronę główną',
    sections: [
      { h: 'Kto jest administratorem', p: [`Administratorem Twoich danych jest ${admin}. W sprawach danych osobowych napisz na ${reach}.`] },
      {
        h: 'Jakie dane do mnie trafiają',
        p: [
          'Tylko te, które sam podasz: imię i nazwisko, telefon, kim jesteś (pensjonat, firma, osoba prywatna), miejsce i opis usterki oraz zdjęcia, jeśli je dołączysz. Przy zleceniu także dane potrzebne do rachunku lub faktury.',
        ],
      },
      {
        h: 'Jak działa formularz',
        p: [
          'Formularz nie zapisuje niczego na tej stronie. Po kliknięciu otwiera WhatsAppa albo Twój program pocztowy z gotową wiadomością, a wysyłasz ją sam.',
          'Wiadomość wysłana przez WhatsAppa przechodzi przez serwis WhatsApp Ireland Limited (Meta), na zasadach jego polityki prywatności.',
        ],
      },
      {
        h: 'Po co i na jakiej podstawie',
        list: [
          'odpowiedź na zapytanie i wycena: art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy),',
          'wykonanie naprawy lub stałej opieki: art. 6 ust. 1 lit. b RODO (umowa),',
          'rachunki, faktury i księgowość: art. 6 ust. 1 lit. c RODO (obowiązek prawny),',
          'ewentualne dochodzenie lub obrona roszczeń: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes).',
        ],
      },
      {
        h: 'Jak długo przechowuję dane',
        p: [
          'Korespondencję przechowuję tak długo, jak jest potrzebna do obsługi zapytania lub zlecenia, a po zleceniu do upływu terminów przedawnienia roszczeń. Dokumenty księgowe przechowuję przez 5 lat od końca roku, w którym upłynął termin płatności podatku.',
        ],
      },
      {
        h: 'Komu przekazuję dane',
        p: [
          'Nikomu nie sprzedaję danych. Dostęp mogą mieć tylko podmioty, bez których nie da się wykonać usługi: osoba lub biuro prowadzące księgowość, dostawca poczty e-mail, WhatsApp oraz Vercel Inc., który utrzymuje tę stronę i zapisuje techniczne dzienniki serwera (m.in. adres IP). Gdy dane trafiają poza Europejski Obszar Gospodarczy, odbywa się to na podstawie mechanizmów przewidzianych w RODO, np. standardowych klauzul umownych.',
        ],
      },
      { h: 'Cookies i statystyki', p: ['Ta strona nie używa plików cookies ani narzędzi śledzących i nie zbiera statystyk odwiedzin.'] },
      {
        h: 'Twoje prawa',
        p: [
          `Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przeniesienia, a także prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie. Wystarczy napisać na ${site.email}.`,
          'Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.',
        ],
      },
      {
        h: 'Czy musisz podać dane',
        p: [
          'Nie musisz, ale bez telefonu albo adresu do odpowiedzi nie mogę się z Tobą skontaktować ani przyjąć zlecenia. Nie podejmuję decyzji w sposób zautomatyzowany i nie profiluję.',
        ],
      },
    ],
  },
  de: {
    slug: privacySlug.de,
    title: 'Datenschutzerklärung',
    heading: 'Daten\u00adschutz\u00aderklärung',
    description: `Welche Daten ${site.name} erhält, wozu und welche Rechte Sie haben. Das Formular speichert nichts auf der Website, Cookies werden nicht verwendet.`,
    lead: 'Kurz und konkret: welche Daten bei mir ankommen, wozu und welche Rechte Sie haben.',
    updated: 'Stand: 20. Oktober 2026',
    back: 'Zur Startseite',
    sections: [
      { h: 'Verantwortlicher', p: [`Verantwortlich für Ihre Daten ist ${admin}. In Datenschutzfragen schreiben Sie an ${reach}.`] },
      {
        h: 'Welche Daten ich erhalte',
        p: [
          'Nur die, die Sie selbst angeben: Name, Telefonnummer, wer Sie sind (Pension, Firma, Privatperson), Ort und Beschreibung des Schadens sowie Fotos, wenn Sie welche anhängen. Bei einem Auftrag zusätzlich die Angaben für die Rechnung.',
        ],
      },
      {
        h: 'So funktioniert das Formular',
        p: [
          'Das Formular speichert nichts auf dieser Website. Nach dem Klick öffnet sich WhatsApp oder Ihr E-Mail-Programm mit einer fertigen Nachricht, die Sie selbst absenden.',
          'Eine über WhatsApp gesendete Nachricht läuft über den Dienst der WhatsApp Ireland Limited (Meta) nach deren Datenschutzbestimmungen.',
        ],
      },
      {
        h: 'Zweck und Rechtsgrundlage',
        list: [
          'Antwort auf Ihre Anfrage und Angebot: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen),',
          'Ausführung der Reparatur oder Objektbetreuung: Art. 6 Abs. 1 lit. b DSGVO (Vertrag),',
          'Rechnungen und Buchhaltung: Art. 6 Abs. 1 lit. c DSGVO (rechtliche Pflicht),',
          'gegebenenfalls Geltendmachung oder Abwehr von Ansprüchen: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
        ],
      },
      {
        h: 'Speicherdauer',
        p: [
          'Korrespondenz bewahre ich so lange auf, wie sie für Anfrage oder Auftrag nötig ist, nach einem Auftrag bis zum Ablauf der Verjährungsfristen. Buchhaltungsunterlagen bewahre ich nach polnischem Recht 5 Jahre ab Ende des Jahres auf, in dem die Steuer fällig wurde.',
        ],
      },
      {
        h: 'Empfänger',
        p: [
          'Ich verkaufe keine Daten. Zugriff haben nur Stellen, ohne die der Auftrag nicht möglich ist: die Buchhaltung, der E-Mail-Anbieter, WhatsApp sowie die Vercel Inc., die diese Website betreibt und technische Server-Protokolle (u. a. IP-Adresse) speichert. Werden Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet, geschieht das auf Grundlage der in der DSGVO vorgesehenen Mechanismen, z. B. Standardvertragsklauseln.',
        ],
      },
      { h: 'Cookies und Statistik', p: ['Diese Website verwendet keine Cookies und keine Tracking-Werkzeuge und erhebt keine Besucherstatistik.'] },
      {
        h: 'Ihre Rechte',
        p: [
          `Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit sowie das Recht auf Widerspruch gegen eine Verarbeitung aufgrund berechtigten Interesses. Eine Nachricht an ${site.email} genügt.`,
          'Sie können sich auch bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa beim polnischen Präsidenten des Amtes für Datenschutz (PUODO, ul. Stawki 2, 00-193 Warschau) oder bei der Behörde an Ihrem Wohnort.',
        ],
      },
      {
        h: 'Pflicht zur Angabe',
        p: [
          'Es gibt keine Pflicht, aber ohne Telefonnummer oder Antwortadresse kann ich Sie nicht erreichen und keinen Auftrag annehmen. Es gibt keine automatisierte Entscheidungsfindung und kein Profiling.',
        ],
      },
    ],
  },
  en: {
    slug: privacySlug.en,
    title: 'Privacy policy',
    description: `What data reaches ${site.name}, why, and what your rights are. The form stores nothing on the site, and the site uses no cookies.`,
    lead: 'Short and specific: what data reaches me, why, and what your rights are.',
    updated: 'Last updated: 20 October 2026',
    back: 'Back to the home page',
    sections: [
      { h: 'Who is responsible', p: [`The controller of your data is ${admin}. For anything about your personal data, write to ${reach}.`] },
      {
        h: 'What data reaches me',
        p: [
          'Only what you provide: your name, phone number, who you are (guesthouse, business, private owner), the place and description of the fault, and photos if you attach them. For a job, also the details needed for the invoice.',
        ],
      },
      {
        h: 'How the form works',
        p: [
          'The form stores nothing on this site. When you click, it opens WhatsApp or your email app with a ready message, and you send it yourself.',
          'A message sent by WhatsApp passes through the service of WhatsApp Ireland Limited (Meta), under its own privacy policy.',
        ],
      },
      {
        h: 'Purpose and legal basis',
        list: [
          'replying to your enquiry and quoting: Art. 6(1)(b) GDPR (steps before a contract),',
          'carrying out the repair or property care: Art. 6(1)(b) GDPR (contract),',
          'invoices and accounting: Art. 6(1)(c) GDPR (legal obligation),',
          'establishing or defending claims if needed: Art. 6(1)(f) GDPR (legitimate interest).',
        ],
      },
      {
        h: 'How long I keep data',
        p: [
          'I keep correspondence as long as it is needed for the enquiry or job, and after a job until the limitation periods for claims expire. Accounting records are kept for 5 years from the end of the year in which the tax fell due, as Polish law requires.',
        ],
      },
      {
        h: 'Who receives data',
        p: [
          'I never sell data. Access is limited to those the service cannot work without: whoever keeps the accounts, the email provider, WhatsApp, and Vercel Inc., which hosts this site and keeps technical server logs (including IP addresses). Where data is processed outside the European Economic Area, this relies on GDPR transfer mechanisms such as standard contractual clauses.',
        ],
      },
      { h: 'Cookies and statistics', p: ['This site uses no cookies or tracking tools and collects no visitor statistics.'] },
      {
        h: 'Your rights',
        p: [
          `You have the right to access, correct, erase, restrict and port your data, and to object to processing based on legitimate interest. A message to ${site.email} is enough.`,
          'You can also complain to a data protection authority, such as the Polish authority (PUODO, ul. Stawki 2, 00-193 Warsaw) or the one in the country where you live.',
        ],
      },
      {
        h: 'Do you have to give your data',
        p: [
          'No, but without a phone number or reply address I cannot reach you or take on the job. There is no automated decision-making and no profiling.',
        ],
      },
    ],
  },
};
