import time

import requests
from parsel import Selector


def fetch(url: str) -> str:
    time.sleep(2)

    try:
        response = requests.get(url, timeout=3)
        response.raise_for_status()

        return response.text
    except requests.HTTPError:
        return None
    except requests.ReadTimeout:
        return None

def scrape_airplane_lists(html: str):
    WIKIPEDIA_MAIN_PAGE = "https://en.wikipedia.org"

    selector = Selector(text=html)

    sources = [
        "%s%s"%(WIKIPEDIA_MAIN_PAGE, li.xpath('.//@href').get().strip())
        for li in selector.css("td.sidebar-content div.hlist-separated ul > li")
    ]

    for source in sources:
        html_list = fetch(source)
        source_selector = Selector(text=html_list)

        file = open("%s.txt"%source[-15:], "w")
        file.close()

        for li in source_selector.css(".mw-parser-output > ul li a"):
            url = "%s%s"%(WIKIPEDIA_MAIN_PAGE, li.xpath('.//@href').get().strip())
            if not (url.__contains__("cite_note") or url.__contains__("index.php")):
                file = open("%s.txt"%source[-15:], "a")
                file.write(url)
                file.close()
