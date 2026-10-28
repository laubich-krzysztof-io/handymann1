---
version: 1
slug: "src-pages-lang-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface: home page (/), Polish only, premium variant on branch `premium`

Mode: Persuade. Audience: owners of better guesthouses, 4-star hotels, aparthotels and investment apartments in the Karkonosze. Action: report a fault or ask about regular care. Proof: published net/gross rates, worked sample bill, SEP licence, the same person; nothing invented. User rejected the map world and the architectural-drawing world; pinned: premium, no graphics, no SVG illustrations or icons, existing content only.

## Direction contract
THESIS: Premium through typography, colour and pace alone, like the printed card of a good mountain hotel, on light paper. Refuses icons, illustrations, badges and any decorative graphic.
OWN-WORLD: A light page (user chose the light palette "Len i świerk" over petrol, navy and other dark-field options): warm linen #F7F4EE as paper, stone #ECE7DC and frost #DFE7DF as alternating section fields, ink #1F2A24 for text, spruce #2C4A3E as the only colour for buttons, links and the dark footer. Brygada 1918 for headlines, prices and reading text; Albert Sans only in short capital labels, navigation and buttons. Square buttons, single hairline rules. Only raster: the real job photos. Logo mark kept as the brand, drawn in spruce.
STORY: The owner reads one large serif line on deep green, sees what is repaired and how regular care works, reads exact prices set like a menu, and at the end sees the four steps next to a phone number set larger than any heading. Six chapters, each fact said once.
FIRST VIEWPORT: Light linen header with a hairline, flowing into a linen hero; the headline at display size (max 6rem) on the left in ink; a one-sentence lead and a spruce button below it; in the right column a single real price line from the rate card, set like an entry in a printed menu. No sample entries.
FORM: user-pinned direction (premium, typography only); seed: none (pinned by user)
SIGNATURE: the phone number in the contact section set at headline size in the serif.
MOTION (user requests 2026-10-28: "premium animations", then "be critical, make the client say wow"): typesetting plus four authored moments. Hero letters rise in a wave from line masks with a slight tilt, the 200 zł entry is ruled in and its digits roll like a till counter; on scroll the two headline lines drift apart. One sheet of paper: the page tone crossfades linen/stone/frost per chapter (sections lose their own fills, header follows). The care sentence fills with ink word by word as it is scrolled. Desktop: the first job photo starts full-screen and shrinks into its place while the section is pinned, the other two arrive beside it. Every amount (rates, bill total, phone number) rolls like an odometer and then returns to plain text. Supporting: section titles by line, ink rules drawn from the left, visit log and bill written row by row, magnetic buttons (mouse only), button fill drains/rises, reading-progress hairline, smooth FAQ, cross-document view transitions, Lenis wheel smoothing. GSAP 3.15 (ScrollTrigger, SplitText) + Lenis 1.3 in src/scripts/motion.ts. Reduced motion: none of it; without the script the hero shows after 2.5 s. Known advisory: the care sentence sits at 30 % ink until it is scrolled.
