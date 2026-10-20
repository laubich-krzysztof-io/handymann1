---
target: cała strona (index.astro, PL/DE/EN)
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:/home/claude/handymann1/src/pages/[lang]/index.astro"
target_fingerprint: "sha256:a5d985a3d2f10e9aecf7104b35159be1182d7dae7ea8a4ac3620b7fed1a870a9"
target_path: /home/claude/handymann1/src/pages/[lang]/index.astro
timestamp: 2026-10-20T05-40-45Z
slug: src-pages-lang-index-astro
---
Method: dual-agent (A: przegląd projektu · B: detektor + przeglądarka)

## Ocena projektu (heurystyki Nielsena)

| # | Heurystyka | Ocena | Kluczowy problem |
|---|---|---|---|
| 1 | Widoczność stanu | 3 | Podświetlenie w menu zostaje na „Jak pracuję” w sekcjach Zaufanie i Kontakt; błąd formularza nie znika po poprawieniu pola |
| 2 | Język użytkownika | 3 | Świetny język właściciela pensjonatu; „Realizacje” prowadzą do jednego muralu, brak słowa o pilnych zgłoszeniach |
| 3 | Kontrola i swoboda | 3 | Esc działa, dane formularza zostają; zmiana języka gubi miejsce na stronie, Dziennika nie da się zatrzymać |
| 4 | Spójność | 2 | Chipy w hero wyglądają jak przyciski, a są martwe; tagi kart wyglądają jak linki; różne etykiety przycisku w DE/EN; dwa style gór |
| 5 | Zapobieganie błędom | 3 | Dobre pola i podpowiedzi, ale pole „Gdzie” (np. pokój 4) jest w treściach i nie zostało wyświetlone |
| 6 | Rozpoznawanie | 3 | Etykiety wszędzie; jedyny link do telefonu jest na samym dole strony |
| 7 | Elastyczność | 2 | Brak skrótu „Zadzwoń / WhatsApp” poza ostatnim ekranem; WhatsApp tylko przez formularz |
| 8 | Estetyka i minimalizm | 3 | Spokojnie; powtórzenia: chipy = lead, tagi = tekst kart, „Stała opieka” ma 6 wejść |
| 9 | Wychodzenie z błędów | 3 | Prosty język i fokus na błędnym polu; jeden ogólny komunikat, który nie znika przy pisaniu |
| 10 | Pomoc | n/a | Strona jednostronicowa; rolę pomocy pełni „Jak pracuję” |
| | **Razem** | **25/36 (69%)** | **Zadowalająco, tuż pod progiem „dobrze”** |

## Werdykt: na ile projekt jest autorski

Ocena projektu: częściowo autorski. Navbar (znak, pejzaż, Śnieżka), Dziennik obiektu i język tekstów są zrobione pod tę firmę. Od sekcji powitalnej w dół szkielet pasuje do dowolnej firmy usługowej: 4 karty z ikonami, 4 karty kroków, 3 kolumny zaufania, płaska grań SVG obok malowanego pejzażu. Najmocniejszy pomysł (Dziennik) leży na boku w połowie strony, a pierwszy ekran tylko obiecuje, niczego nie pokazuje.

Detektor: na wyrenderowanej stronie 3 języki × 4 szerokości (320, 390, 768, 1440) dają po 1 zgłoszeniu: kremowe tło (paleta właściciela, zaakceptowane). Skan zbudowanego HTML dał 20 zgłoszeń „cramped-padding”: fałszywe, bo bez prawdziwego układu (pomiary pokazują 16–55 px odstępu). Detektor nie wyłapał tego, co widzi tylko człowiek w interakcji: Dziennika bez pauzy, obwódki fokusu 2,82:1, błędu menu „Usługi”, braku telefonu na komórce.

Nakładka: wstrzyknięcie detektora zadziałało w 5 widokach (konsola: 1 problem, kremowe tło). Nie ma widocznej nakładki w Twojej przeglądarce, bo test szedł w przeglądarce bez okna na serwerze.

## Ogólne wrażenie

Pierwsze 5 sekund działa: „lokalny fachowiec dla pensjonatów w Karkonoszach, naprawi zanim gość zauważy”. Potem strona traci charakter i chowa najważniejsze: telefon, twarz i dowód. Największa szansa: na telefonie szybki kontakt w zasięgu kciuka i Dziennik jako dowód już na pierwszym ekranie.

## Co działa

1. Głos i nagłówek: „Naprawię, zanim gość zauważy.” i „Gość nie zapamięta, że kran kapał. Zapamięta, że kapał trzy dni.” mówią o lęku właściciela, nie o katalogu usług. DE i EN są przetłumaczone naturalnie.
2. Dziennik obiektu: pokazuje produkt stałej opieki zamiast go opisywać, uczciwie podpisany jako przykład; krój o stałej szerokości służy tu danym.
3. Świat navbaru i paleta: własny znak, regionalny pejzaż, czyste zwijanie, kontrasty tekstu z zapasem.

## Problemy priorytetowe

1. [P1] Na telefonie nie ma telefonu. Poniżej 960 px przycisk z paska trafia do menu, hero ma tylko kotwicę do formularza, a jedyny link do dzwonienia jest ~8,6 ekranu niżej; WhatsApp działa tylko przez formularz. Właściciel z awarią chce zadzwonić teraz. Poprawka: przypięty dolny pasek „Zadzwoń | WhatsApp” na telefonie (chowany przy formularzu), numer obok przycisku na komputerze; miejsce przygotować już teraz. Komenda: /impeccable adapt
2. [P1] Brak dowodu i twarzy tam, gdzie zapada decyzja. Oferta „ta sama osoba za każdym razem” nie ma imienia ani portretu; jedynym dowodem jest malowanie ściany, a zaufanie to same deklaracje. Poprawka: imię i zdjęcie przy Zaufaniu i formularzu, w hero wpis z Dziennika lub zdjęcie zamiast chipów, mural krócej na telefonie, miniatura świadectwa SEP. Komenda: /impeccable layout
3. [P1] Stany i dostępność. Dziennik przewija się w pętli bez pauzy (WCAG 2.2.2, poziom A); obwódka fokusu 2,82:1 na kremie (wymagane 3:1); błąd formularza ogólny i lepki; podświetlenie menu zawiesza się; niemiecki odstęp psuje panel na telefonie. Poprawka: pauza przy najechaniu, fokusie i dotyku; ciemniejsza obwódka (#2f7484, 4,9:1); komunikaty przy polach, czyszczone przy pisaniu; Kontakt w podświetlaniu; reguła DE tylko dla komputera. Komenda: /impeccable harden
4. [P2] Korpus jest szablonem. Karty, karty, kolumny i płaska grań; po pierwszym ekranie to każda firma usługowa. Poprawka: Dziennik jako kręgosłup strony, „Jak pracuję” jako życie jednego wpisu (zgłoszenie, wycena, naprawa, rachunek), grań usunąć albo zastąpić krawędzią malowanego pejzażu. Komenda: /impeccable shape
5. [P2] Rozwijane „Usługi” jest zbędne i ma błąd: najechanie otwiera, a kliknięcie zamyka; wszystkie 4 pozycje prowadzą do tego samego rzędu kart, czwarta dubluje link „Stała opieka”. Poprawka: „Usługi” jako zwykły link do sekcji. Komenda: /impeccable distill

## Czerwone flagi według person

- Jordan (pierwszy raz): tapie chip „Domy prywatne” i nic się nie dzieje; bierze turkusowe tagi za linki; klika „Usługi ▾” po najechaniu i menu znika; „Realizacje” to jedno malowanie; nigdzie ceny ani czasu dojazdu.
- Riley (testerka): po wpisaniu imienia komunikat dalej każe „Wpisz imię”; zmiana PL→DE na „Stałej opiece” wraca na górę; przy Zaufaniu podświetla się „Jak pracuję”; panel DE ma inne odstępy; przyciski mają różne etykiety w DE/EN; przykładowy numer wybierze bzdurę.
- Casey (telefon w biegu): tylko burger w prawym górnym rogu; do telefonu ~8,6 ekranu; mural ~2,5 ekranu; WhatsApp tylko przez formularz.
- Właścicielka pensjonatu w sezonie, w trakcie awarii: brak pilnej ścieżki i obietnicy czasu reakcji; formularz pyta „Kim jesteś”, nie o pokój; nie zna imienia osoby; „Zadzwoń” poza zasięgiem kciuka.

## Drobne obserwacje

- Pole „Gdzie” (np. „pokój 4, łazienka”) jest w treściach, ale nie ma go w formularzu.
- Przycisk w pasku i w hero mają różne etykiety w DE („Schaden melden” / „Schaden beschreiben”) i EN.
- Etykieta „Zadzwoń” istnieje w treściach i nie jest nigdzie użyta.
- „Stała opieka” ma 6 wejść; e-mail jest w kontakcie dwa razy.
- Na komputerze dwa przyciski w hero łamią się w nierówną kolumnę; mozaika zdjęć ma poszarpane dolne krawędzie.
- Po przekazaniu do WhatsAppa lub poczty strona nie pokazuje stanu „gotowe, wyślij w aplikacji”.
- Długi lead w Space Mono czyta się jak maszynopis i odbiera Dziennikowi odrębność (krój wynika z briefu).

## Pytania do przemyślenia

- Co gdyby pierwszy ekran zamiast czterech chipów pokazywał jeden wpis z Dziennika („Pok. 7 · bateria kapie · wymieniona 08:10”)? Obietnica i dowód w jednym kadrze.
- Skoro oferta to „ta sama osoba za każdym razem”, dlaczego ta osoba nie ma imienia, a pierwszy raz pojawia się na zdjęciu muralu?
- Czy właścicielka z zalanym pokojem powinna w ogóle widzieć formularz? A gdyby na telefonie pierwszą akcją było „Zadzwoń / WhatsApp”, a formularz został dla spokojnych zapytań o stałą opiekę?
