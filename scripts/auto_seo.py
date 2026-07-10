"""
MIDAS Auto-SEO — Automated search engine submissions and backlink building.
No manual effort required. Run daily via Task Scheduler or cron.

Usage: python auto_seo.py
"""

import json
import urllib.request
import urllib.error
import time
from datetime import datetime

SITE_URL = "https://devtoolbox-henna-three.vercel.app"
INDEXNOW_KEY = "a1b2c3d4e5f6g7h8"

PAGES = [
    "/",
    "/json-formatter",
    "/regex-tester",
    "/base64",
    "/jwt-decoder",
    "/hash-generator",
    "/url-encoder",
    "/color-converter",
]

FULL_URLS = [f"{SITE_URL}{page}" for page in PAGES]


def submit_indexnow():
    """Submit all pages to IndexNow (Bing, Yandex, Seznam, Naver)."""
    print("\n[IndexNow] Submitting to Bing/Yandex/Seznam...")

    payload = json.dumps({
        "host": "devtoolbox-henna-three.vercel.app",
        "key": INDEXNOW_KEY,
        "keyLocation": f"{SITE_URL}/{INDEXNOW_KEY}.txt",
        "urlList": FULL_URLS,
    }).encode("utf-8")

    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://yandex.com/indexnow",
    ]

    for endpoint in endpoints:
        try:
            req = urllib.request.Request(
                endpoint,
                data=payload,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                print(f"  ✓ {endpoint} — {resp.status}")
        except urllib.error.HTTPError as e:
            print(f"  ✗ {endpoint} — HTTP {e.code}: {e.reason}")
        except Exception as e:
            print(f"  ✗ {endpoint} — {e}")
        time.sleep(2)


def ping_google():
    """Ping Google with sitemap URL."""
    print("\n[Google] Pinging sitemap...")
    sitemap_url = f"{SITE_URL}/sitemap.xml"
    try:
        url = f"https://www.google.com/ping?sitemap={urllib.parse.quote(sitemap_url, safe='')}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"  ✓ Google ping — {resp.status}")
    except Exception as e:
        print(f"  ✗ Google ping — {e} (deprecated, use Search Console)")


def submit_to_aggregators():
    """Submit to free web directories and ping services."""
    print("\n[Aggregators] Pinging web directories...")

    # These are all free ping/submission endpoints
    ping_urls = [
        f"http://www.google.com/webmasters/tools/ping?sitemap={SITE_URL}/sitemap.xml",
        f"http://www.bing.com/webmaster/ping.aspx?siteMap={SITE_URL}/sitemap.xml",
        f"http://ping.blo.gs/",
        f"http://rpc.pingomatic.com/",
    ]

    for url in ping_urls:
        try:
            req = urllib.request.Request(url, method="GET")
            with urllib.request.urlopen(req, timeout=10) as resp:
                print(f"  ✓ {url[:50]}... — {resp.status}")
        except Exception as e:
            print(f"  ✗ {url[:50]}... — {e}")
        time.sleep(1)


def generate_backlink_targets():
    """Generate a list of places to submit for backlinks (manual one-time)."""
    print("\n[Backlinks] Free submission targets:")
    targets = [
        ("AlternativeTo", "https://alternativeto.net/manage-app/", "Add as alternative to jwt.io, regex101.com, jsonformatter.org"),
        ("DevResources", "https://devresourc.es", "Submit as free tool"),
        ("Free-for.dev", "https://github.com/ripienaar/free-for-dev", "Submit PR adding DevToolBox"),
        ("SaaSHub", "https://www.saashub.com/submit", "List for free"),
        ("ToolsForDevs", "https://toolsfordevs.com", "Submit tool"),
        ("Undesign", "https://undesign.tools", "Submit collection"),
    ]
    for name, url, action in targets:
        print(f"  • {name}: {url}")
        print(f"    Action: {action}")


def log_run():
    """Log this run."""
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "pages_submitted": len(FULL_URLS),
        "status": "completed",
    }
    print(f"\n[Log] Run completed at {log_entry['timestamp']}")
    print(f"  Submitted {log_entry['pages_submitted']} pages to search engines.")


if __name__ == "__main__":
    import urllib.parse
    
    print("=" * 55)
    print("  MIDAS Auto-SEO — Automated Search Engine Submissions")
    print("=" * 55)

    submit_indexnow()
    submit_to_aggregators()
    generate_backlink_targets()
    log_run()

    print("\n" + "=" * 55)
    print("  Done. Run daily for best results.")
    print("  Set up Task Scheduler: python auto_seo.py")
    print("=" * 55)
