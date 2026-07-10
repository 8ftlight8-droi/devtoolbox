"""
MIDAS Auto-Promote — Opens all promotion links pre-filled in your browser.
Just click Submit on each tab.

Usage: python promote.py [day1|day2|day3|day5|all]
"""

import webbrowser
import urllib.parse
import sys
import time

SITE_URL = "https://devtoolbox-henna-three.vercel.app"

# === REDDIT POSTS ===

REDDIT_WEBDEV = {
    "subreddit": "webdev",
    "title": "I stopped trusting online dev tools with my data, so I built my own — 7 tools, zero network calls",
    "url": SITE_URL,
}

REDDIT_SIDEPROJECT = {
    "subreddit": "sideproject",
    "title": "Launched a $0/month side project yesterday. Here's the playbook for turning free tools into passive income.",
    "url": SITE_URL,
}

REDDIT_PROGRAMMING = {
    "subreddit": "programming",
    "title": "PSA: Most online developer tools send your pasted data to third-party servers. Here's a collection that doesn't.",
    "url": SITE_URL,
}

REDDIT_INTERNETISBEAUTIFUL = {
    "subreddit": "InternetIsBeautiful",
    "title": "A developer toolkit that works entirely offline after loading — processes everything in your browser with zero server calls",
    "url": SITE_URL,
}

# === HACKER NEWS ===

HN_TITLE = "Show HN: DevToolBox – Developer utilities with zero network calls (verifiable in DevTools)"
HN_URL = SITE_URL

# === DEV.TO ===

DEVTO_TITLE = "I Caught a Dev Tool Stealing My Data — So I Built 7 Alternatives That Make Zero Network Calls"

# === HELPERS ===

def open_reddit(post):
    """Opens Reddit submit page with title and URL pre-filled."""
    params = urllib.parse.urlencode({
        "url": post["url"],
        "title": post["title"],
    })
    url = f"https://www.reddit.com/r/{post['subreddit']}/submit?{params}"
    webbrowser.open(url)
    print(f"  -> Opened r/{post['subreddit']} submit page")


def open_hn():
    """Opens HN submit page with title and URL pre-filled."""
    params = urllib.parse.urlencode({
        "t": HN_TITLE,
        "u": HN_URL,
    })
    url = f"https://news.ycombinator.com/submitlink?{params}"
    webbrowser.open(url)
    print(f"  -> Opened Hacker News submit page")


def open_devto():
    """Opens Dev.to new post page."""
    url = "https://dev.to/new"
    webbrowser.open(url)
    print(f"  -> Opened Dev.to new post page")
    print(f"     (Paste content from PROMOTE.md -> DEV.TO ARTICLE section)")


def open_twitter():
    """Opens Twitter compose with first tweet pre-filled."""
    text = f"""Most online dev tools send your pasted data to servers you can't see.

I built 7 alternatives that make literally zero network calls.

Open DevTools > Network > verify yourself.

Free: {SITE_URL}

Here's what's inside (thread)"""
    params = urllib.parse.urlencode({"text": text})
    url = f"https://twitter.com/intent/tweet?{params}"
    webbrowser.open(url)
    print(f"  -> Opened Twitter compose")


def open_producthunt():
    """Opens Product Hunt submit page."""
    url = "https://www.producthunt.com/posts/new"
    webbrowser.open(url)
    print(f"  -> Opened Product Hunt submit page")
    print(f"     (Use content from PROMOTE.md -> PRODUCT HUNT section)")


# === DAY PLANS ===

def day1():
    print("\n=== DAY 1: Reddit Launch ===\n")
    open_reddit(REDDIT_WEBDEV)
    time.sleep(1)
    open_reddit(REDDIT_SIDEPROJECT)
    print("\n  Done! Just click Submit on each tab.\n")


def day2():
    print("\n=== DAY 2: Dev.to + Hacker News ===\n")
    open_devto()
    time.sleep(1)
    open_hn()
    print("\n  Done! Paste Dev.to article from PROMOTE.md, then submit HN.\n")


def day3():
    print("\n=== DAY 3: Twitter + More Reddit ===\n")
    open_twitter()
    time.sleep(1)
    open_reddit(REDDIT_PROGRAMMING)
    time.sleep(1)
    open_reddit(REDDIT_INTERNETISBEAUTIFUL)
    print("\n  Done! Post the tweet, submit Reddit tabs.\n")


def day5():
    print("\n=== DAY 5: Product Hunt Launch ===\n")
    open_producthunt()
    print("\n  Done! Fill in using PROMOTE.md -> PRODUCT HUNT section.\n")


def all_days():
    print("\n=== OPENING ALL PROMOTION TABS ===\n")
    open_reddit(REDDIT_WEBDEV)
    time.sleep(0.5)
    open_reddit(REDDIT_SIDEPROJECT)
    time.sleep(0.5)
    open_reddit(REDDIT_PROGRAMMING)
    time.sleep(0.5)
    open_reddit(REDDIT_INTERNETISBEAUTIFUL)
    time.sleep(0.5)
    open_hn()
    time.sleep(0.5)
    open_devto()
    time.sleep(0.5)
    open_twitter()
    time.sleep(0.5)
    open_producthunt()
    print("\n  All tabs opened! Submit each one.\n")


if __name__ == "__main__":
    print("=" * 50)
    print("  MIDAS Auto-Promote — DevToolBox")
    print("=" * 50)

    arg = sys.argv[1] if len(sys.argv) > 1 else "day1"

    actions = {
        "day1": day1,
        "day2": day2,
        "day3": day3,
        "day5": day5,
        "all": all_days,
    }

    if arg in actions:
        actions[arg]()
    else:
        print(f"\nUsage: python promote.py [day1|day2|day3|day5|all]")
        print(f"\n  day1 — Reddit (r/webdev + r/sideproject)")
        print(f"  day2 — Dev.to + Hacker News")
        print(f"  day3 — Twitter + Reddit (r/programming + r/InternetIsBeautiful)")
        print(f"  day5 — Product Hunt")
        print(f"  all  — Open everything at once")

    print("\nTip: Posts are pre-filled. You just need to click Submit.")
    print("=" * 50)
