const RULES = [
    // Block the "Share" button that appears when selecting text in the article,
    // without blocking the popup that appears when clicking on the
    // table-of-contents hamburger on the left edge.
    '[class*="popover-"]:not([class*="elevated"])',

    // Make the cursor work normally, i.e. make the cursor turn into an I-beam
    // when it is over regular text. (By default Substack forces the cursor to
    // still be a pointy arrow.)
    "body:style(cursor: auto !important;)",

    // Block the subscribe dialog that randomly pops up and covers the entire
    // screen as you are scrolling.
    '[class*="subscribeDialog"]',
    // And make sure to also block the dark overlay that covers up the whole
    // page whenever the subscribe dialog appears.
    '[class*="background-"]',

    // Hide the "Thanks for reading [name of blog]! This post is public so feel
    // free to share it." message that appears within the post sometimes.
    '.captioned-button-wrap',

    // Make the navbar stay at the top instead of always appearing every time I
    // scroll up.
    '[class*="mainMenuContent-"]:style(position: relative !important; top: 0px !important;)',
    // If you instead want the navbar to completely disappear, you can do it
    // like this (you can't just "display: none" the mainMenuContent because
    // then the navbar will disappear from the homepage as well, and then it's
    // harder to find things like the archives page):
    // '[class*="topBar-"]:style(display: none !important;)',

    // Bring back the default scrollbar (Substack seems to want to hide the
    // scrollbar and make it super thin and light-colored so that I can never
    // tell where I am on the page).
    '* { scrollbar-width: auto !important; scrollbar-color: auto !important; }',

    // Block the subscribe box at the end of each post. This one seems
    // especially brittle so it will probably need to be changed.
    '.post.newsletter-post.typography > div > .pc-reset.pc-paddingBottom-32.pc-paddingTop-32.pc-gap-16.pc-flexDirection-column.pc-display-flex.pencraft',

    // Hide the list of users who have 'liked' the post, which appears at the
    // bottom of the post.
    '.post.newsletter-post.typography > div > [class*="border-top-detail-themed-"]',

    // Hide the number of 'likes', comments, and 'restacks' everywhere. By
    // default this shows up at the top of the post, at the bottom of the post,
    // and also on things like the archive page when you hover over a post.
    '.post-ufi',
    // If you want a more granular approach, you can do things like this instead:
    // '.post-header > * > .post-ufi',  // Hides the 'likes' at the top of the post
    // '.post-footer > .post-ufi',      // Hides the 'likes' at the bottom of the post

    // Skip the whole-page intro when first visiting a site. From
    // https://www.reddit.com/r/uBlockOrigin/comments/1fhvrxt/blockbypass_intro_page_for_substack_sites/lnd6qij/
    ".intro-popup",
    "#main:style(visibility: visible !important;)",
    "html.modal-in, html.show-intro-popup:style(overflow: auto !important;)",
    ".has-intro-popup.show-intro-popup body:style(height: auto !important; width: auto !important; overflow: auto !important;)",
];

const DEFAULT_DOMAINS = [
    "substack.com",
    "overcomingbias.com",
    "astralcodexten.com",
    "mindthefuture.info",
    "benlandautaylor.com",
    "news.manifold.markets",
    "betonit.ai",
    "richardhanania.com",
    "computerenhance.com",
    "tomaspueyo.com",
    "rfleury.com",
    "250bpm.com",
];

const STORAGE_KEY = 'substackDomains';

const domainInput = document.getElementById('domainInput');
const generateBtn = document.getElementById('generateBtn');
const outputWrapper = document.getElementById('outputWrapper');
const outputBlock = document.getElementById('outputBlock');
const toast = document.getElementById('toast');

window.addEventListener('DOMContentLoaded', () => {
    const storedDomains = localStorage.getItem(STORAGE_KEY);

    if (storedDomains) {
        domainInput.value = storedDomains;
    } else {
        domainInput.value = DEFAULT_DOMAINS.join(',\n') + ",\n";
    }
});

generateBtn.addEventListener('click', () => {
    const rawInput = domainInput.value;
    const domainList = rawInput.split(',')
        .map(d => d.trim())
        .filter(d => d.length > 0); // Remove empty lines

    if (domainList.length === 0) {
        alert("Please enter at least one domain.");
        return;
    }

    localStorage.setItem(STORAGE_KEY, rawInput);

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const header = `! Block annoying Substack stuff -- generated on ${today} using https://riceissa.github.io/ublock-origin-substack/`;
    const joinedDomains = domainList.join(',');
    const ruleLines = RULES.map(rule => `${joinedDomains}##${rule}`);
    const finalOutput = [header, ...ruleLines].join('\n');

    navigator.clipboard.writeText(finalOutput).then(() => {
        toast.className = "show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy to clipboard automatically. You can copy the text below manually.");
    });

    outputWrapper.classList.remove('hidden');
    outputBlock.textContent = finalOutput;
    outputWrapper.scrollIntoView({ behavior: 'smooth' });
});
