---
target: strona główna (premium, tylko PL)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/claude/handymann1/src/pages/index.astro"
target_fingerprint: "sha256:ebdebdccdd1638ce9acb57682bf78559e0bb01883af74125dc3b4b3280adb1d1"
target_path: /home/claude/handymann1/src/pages/index.astro
timestamp: 2026-10-28T07-22-31Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score: 22/32 (69%), Acceptable (n/a: 7, 10)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | "Sent" status shown even if WhatsApp did not open |
| 2 | Match real world | 3 | "SEP", "Dziennik obiektu" unexplained |
| 3 | User control | 3 | Burger label stays "Menu" when open |
| 4 | Consistency | 2 | 5 link styles, 3 price treatments, reading text in sans against contract |
| 5 | Error prevention | 3 | Mail send needs a mail app; address never shown |
| 6 | Recognition | 3 | Care offer split across 4 places |
| 7 | Flexibility | n/a | Persuade |
| 8 | Aesthetic/minimalist | 2 | 9 sections, facts repeated 3-6x, ticker |
| 9 | Error recovery | 3 | Clear messages, focus to first error |
| 10 | Help | n/a | Persuade |

## Design specificity
Content specific (real rates, worked bill, SEP, towns, Polish typesetting); form is a generic local-service template. Detector: 0 findings (source regex scan for .astro is an undercount; URL scans 1440 and 390 clean; overlay "No anti-patterns found"). Browser: labels 11.5-13.8 px; mobile menu focus moves under panel; plan card contrast 4.7:1.

## Priority issues
- [P1] Everything said 3-6 times; 9 sections, ~11 screens. Fix: 6 sections, drop trust section and duplicate FAQs, merge services+care. /impeccable distill
- [P1] Anonymous: no name, company, NIP, e-mail. Fix: signature at contact, colophon footer, real photo as the face. /impeccable clarify, /impeccable harden
- [P1] Same pacing and voice in every section; reading text in grey sans; caps on ~15 element types. Fix: Brygada for reading text 18-19 px, caps only nav/buttons, three section tempos, phone number as climax. /impeccable layout, /impeccable typeset
- [P2] Hero right column holds an invented sample entry; auto-scrolling log; 8 faults in 2 days vs 4 h/month plan; lead starts with "Złota rączka". /impeccable quieter, /impeccable clarify
- [P2] Mobile: bottom bar over hero from load, no phone in menu, sticky hover after tap, unequal send buttons. /impeccable adapt

## Persona red flags
Owner in Wrocław: no name/NIP, no key-access info, only a mural as proof, informal "Ty". Mobile: contact at ~8,900 px. Care enquirer: all CTAs say "Opisz usterkę", form has no care option.

## Minor
OG image from old cream/green world; mail send fails silently without mail app; work grid focusable without name; filler FAQ lead.
