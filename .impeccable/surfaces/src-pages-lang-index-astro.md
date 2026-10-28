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
MOTION (user request 2026-10-28, "premium animations"): typesetting, not effects. Hero lines rise out of line masks, the rate-card entry is ruled in from the left; section titles rise line by line; ink rules above lists draw from the left; the visit log and the sample bill write themselves row by row (total last); photos unmask upward; the contact phone number rises digit by digit. Supporting: button fill drains/rises, reading-progress hairline under the header (scroll-driven CSS), smooth FAQ opening (::details-content), cross-document view transitions, Lenis smooth wheel scrolling. GSAP 3.15 (ScrollTrigger, SplitText) + Lenis 1.3 in src/scripts/motion.ts. Reduced motion: no movement, content visible at once; without the script the hero shows after 2.5 s.
