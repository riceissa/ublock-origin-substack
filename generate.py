#!/usr/bin/env python3

import datetime

DOMAINS = [
    "substack.com",
    "overcomingbias.com",
    "www.astralcodexten.com",
    "mindthefuture.info",
    "benlandautaylor.com",
    "news.manifold.markets",
    "betonit.ai",
    "richardhanania.com",
    "computerenhance.com",
    "tomaspueyo.com",
]

RULES = [
    # ".subscribe-dialog",

    # Block the "Share" button that appears when selecting text in the article,
    # without blocking the popup that appears when clicking on the
    # table-of-contents hamburger on the left edge.
    '[class*="popover-"]:not([class*="elevated"])',

    # Make the cursor work normally, i.e. make the cursor turn into an I-beam
    # when it is over regular text. (By default Substack forces the cursor to
    # still be a pointy arrow.)
    "body:style(cursor: auto !important;)",

    # Block the subscribe dialog that randomly pops up and covers the entire
    # screen as you are scrolling.
    '[class*="subscribeDialog"]',
    # And make sure to also block the dark overlay that covers up the whole
    # page whenever the subscribe dialog appears.
    '[class*="background-"]',

    # Get rid of the "navbar" (what, you think it's actually helping me to
    # navigate the site or something?) at the top that shows up every time you
    # scroll up.
    '[class*="topBar-"]:style(display: none !important;)',

    # Bring back the default scrollbar (Substack seems to want to hide the
    # scrollbar and make it super thin and light-colored so that I can never
    # tell where I am on the page).
    '* { scrollbar-width: auto !important; scrollbar-color: auto !important; }',

    # Block the subscribe box at the end of each post. This one seems
    # especially brittle so it will probably need to be changed.
    '.post.newsletter-post.typography > div > .pc-reset.pc-paddingBottom-32.pc-paddingTop-32.pc-gap-16.pc-flexDirection-column.pc-display-flex.pencraft',

    # Skip the whole-page intro when first visiting a site. From
    # https://www.reddit.com/r/uBlockOrigin/comments/1fhvrxt/blockbypass_intro_page_for_substack_sites/lnd6qij/
    ".intro-popup",
    "#main:style(visibility: visible !important;)",
    "html.modal-in, html.show-intro-popup:style(overflow: auto !important;)",
    ".has-intro-popup.show-intro-popup body:style(height: auto !important; width: auto !important; overflow: auto !important;)",
]

if __name__ == "__main__":
    print("! Block annoying Substack stuff -- generated from script on " + datetime.date.today().strftime("%Y-%m-%d"))
    for rule in RULES:
        domains = ",".join(DOMAINS)
        print(domains + "##" + rule)
