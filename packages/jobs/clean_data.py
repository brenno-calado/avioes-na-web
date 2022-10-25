import unicodedata
import re

def clean_data(data: str, unit: str):
    data = unicodedata.normalize("NFKD", data) if data else ""

    if data == "":
        return

    pattern = re.compile(rf"([\d\,\.]+) {re.escape(unit)}")

    found_data = re.match(pattern, data)

    if found_data:
        return found_data.group(0)
