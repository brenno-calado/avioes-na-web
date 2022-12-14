import os
import time
import unicodedata
from urllib.parse import unquote

import requests
from database import create_airplane
from clean_number import clean_number
from clean_role import clean_role
from clean_date import clean_date
from parsel import Selector


def fetch(url: str) -> str:
    time.sleep(2)

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        return response.text
    except requests.ConnectionError as connect_error:
        print(connect_error)
        return None
    except requests.HTTPError or requests.ConnectionError as http_error:
        print(http_error)
        return None
    except requests.ReadTimeout:
        return None
    except requests.exceptions.InvalidURL:
        return None

black_list = ["#", "redlink=1", ":Citation_needed", "books.google", "ISBN_", "Special:", "archive.org"]

def save_airplane_lists(html: str):
    WIKIPEDIA_MAIN_PAGE = "https://en.wikipedia.org"

    selector = Selector(text=html)

    sources = [
        "%s%s"%(WIKIPEDIA_MAIN_PAGE, li.xpath('.//@href').get().strip())
        for li in selector.css("td.sidebar-content div.hlist-separated ul > li")
    ]

    for source in sources:
        html_list = fetch(source)
        source_selector = Selector(text=html_list)
        filename = unquote(source[-15:])

        file = open("temp/%s.txt"%filename, "w")
        file.close()

        print("writing file {f}".format(f=file.name))
        for li in source_selector.css(".mw-parser-output > ul li a"):
            url = "%s%s"%(WIKIPEDIA_MAIN_PAGE, li.xpath('.//@href').get().strip())
            if not any(x in url for x in black_list):
                file = open("temp/%s.txt"%filename, "a")
                file.write("%s\n"%url)
                file.close()

def scrape_airplane_files():
    temp_files = os.listdir("temp")

    for file in temp_files: scrape_airplane("temp/{f}".format(f=file))

def xpath_b_sibling(text):
    return "//b[contains(text(),'%s')]/following-sibling::text()[1]"%text

def scrape_airplane(path: str):
    file = open(path)

    while file:
        url = (file.readline()).strip()
        print(url)
        if (url) == "":
            break

        html = fetch(url)

        selector = Selector(text=html)

        title = selector.xpath("//h1/descendant-or-self::*/text()").get()
        role_main_selector = "//th[contains(text(),'Role') or contains(text(), 'Type')]/following-sibling::td"
        role_descendant = selector.xpath(f"{role_main_selector}/descendant::*/text()").get()
        role_self = selector.xpath(f"{role_main_selector}/text()").get()

        role = f"{role_self} {role_descendant}" if role_descendant else role_self

        crew = selector.xpath(xpath_b_sibling('Crew:')).get()
        length = selector.xpath(xpath_b_sibling('Length:')).get()
        wingspan = selector.xpath(xpath_b_sibling('Wingspan:')).get()
        height = selector.xpath(xpath_b_sibling('Height:')).get()
        empty_weight = selector.xpath(xpath_b_sibling('Empty weight:')).get()
        max_speed = selector.xpath(xpath_b_sibling('Maximum speed:')).get()
        cruise_speed = selector.xpath(xpath_b_sibling('Cruise speed:')).get()
        image = selector.xpath("//table[@class='infobox']//img/@src").get()
        source = selector.xpath("//link[@rel='canonical']/@href").get()

        first_flight_main_selector = "//th[contains(text(),'First flight') or contains(text(), 'Introduction')]/following-sibling::td"
        first_flight_descendant = selector.xpath(f"{first_flight_main_selector}/descendant::*/text()").get()
        first_flight_self = selector.xpath(f"{first_flight_main_selector}/text()").get()

        first_flight = f"{first_flight_self} {first_flight_descendant}" if first_flight_descendant else first_flight_self

        airplane = {
            "Title": unicodedata.normalize("NFKD", title) if title else "",
            "Role": clean_role(role),
            "First Flight": clean_date(first_flight),
            "Crew": unicodedata.normalize("NFKD", crew) if crew else "",
            "Length": clean_number(length, "m"),
            "Wingspan": clean_number(wingspan, "m"),
            "Height": clean_number(height, "m"),
            "Empty weight": clean_number(empty_weight, "kg"),
            "Maximum speed": clean_number(max_speed, "km/h"),
            "Cruise speed": clean_number(cruise_speed, "km/h"),
            "Image": "https:{0}".format(image) if image else "",
            "Source": source
        }

        create_airplane(airplane)

    file.close()
