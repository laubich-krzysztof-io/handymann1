import { site, type Lang } from '../config';

// Polityka prywatności (RODO). Dane administratora pochodzą z config.ts.
// Przed publikacją na domenie: uzupełnij company, nip, address, email i telefon w config.ts
// i daj tekst do przejrzenia księgowej albo prawnikowi.

export interface PrivacySection { h: string; p?: string[]; list?: string[] }
export interface Privacy {
  title: string;
  /** Nagłówek na stronie; może mieć miękkie dywizy (\u00ad), których nie chcemy w <title> */
  heading?: string;
  description: string;
  lead: string;
  updated: string;
  back: string;
  sections: PrivacySection[];
}

/** Adres strony prywatności */
export const privacyPath = '/prywatnosc/';

const admin = [site.company || site.name, site.address, site.nip && `NIP ${site.nip}`].filter(Boolean).join(', ');
const reach = site.contactReady ? `${site.email}, ${site.phone}` : site.email;

export const privacy: Record<Lang, Privacy> = {
  pl: {
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
};
