import os
import time
import unicodedata

import requests
from database import create_airplane
from parsel import Selector


def fetch(url: str) -> str:
    time.sleep(2)

    try:
        response = requests.get(url, timeout=3)
        response.raise_for_status()

        return response.text
    except requests.HTTPError or requests.ConnectionError as http_error:
        print(http_error)
        return None
    except requests.ReadTimeout:
        return None

black_list = ["#", "redlink=1", ":Citation_needed", "books.google"]

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
        filename = source[-15:]

        file = open("temp/%s.txt"%filename, "w")
        file.close()

        print("writing file {f}".format(f=file.name))
        for li in source_selector.css(".mw-parser-output > ul li a"):
            url = "%s%s"%(WIKIPEDIA_MAIN_PAGE, li.xpath('.//@href').get().strip())
            if not (url.__contains__("#") or url.__contains__("redlink=1") or url.__contains__(":Citation_needed")):
                file = open("temp/%s.txt"%filename, "a")
                file.write("%s\n"%url)
                file.close()

    temp_files = os.listdir("temp")

    for file in temp_files: scrape_airplane("temp/{f}".format(f=file))

def xpath_b_sibling(text):
    return "//b[contains(text(),'%s')]/following-sibling::text()[1]"%text

def scrape_airplane(path: str) -> 'list[dict]':
    file = open(path)


    while file:
        url = (file.readline()).strip()
        print(url)
        if (url) == "":
            break

        html = fetch(url)

        selector = Selector(text=html)

        title = selector.css("#firstHeading").get()
        role = selector.xpath("//th[contains(text(),'Role') or contains(text(), 'Type')]/following-sibling::td/text()").get()
        crew = selector.xpath(xpath_b_sibling('Crew:')).get()
        length = selector.xpath(xpath_b_sibling('Length:')).get()
        wingspan = selector.xpath(xpath_b_sibling('Wingspan:')).get()
        height = selector.xpath(xpath_b_sibling('Height:')).get()
        empty_weight = selector.xpath(xpath_b_sibling('Empty weight:')).get()
        max_speed = selector.xpath(xpath_b_sibling('Maximum speed:')).get()

        airplane = {
            "Title": unicodedata.normalize("NFKD", title) if title else "",
            "Role": unicodedata.normalize("NFKD", role) if role else "",
            "Crew": unicodedata.normalize("NFKD", crew) if crew else "",
            "Length": unicodedata.normalize("NFKD", length) if length else "",
            "Wingspan": unicodedata.normalize("NFKD", wingspan) if wingspan else "",
            "Height": unicodedata.normalize("NFKD", height) if height else "",
            "Empty weight": unicodedata.normalize("NFKD", empty_weight) if empty_weight else "",
            "Maximum speed": unicodedata.normalize("NFKD", max_speed) if max_speed else ""
        }

        create_airplane(airplane)

    file.close()
