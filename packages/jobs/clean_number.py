import re
import unicodedata

def clean_number(data: str, unit: str):
    data = unicodedata.normalize("NFKD", data) if data else ""

    if data == "":
        return ""

    found_data = re.search(rf"([\d\,\.]+) {re.escape(unit)}", data)

    if found_data is not None:
        cleaned_data = found_data.group(0).split(' ')[0].replace(",", "")
        if cleaned_data.__contains__('.'): return float(cleaned_data)
        return int(cleaned_data)

    return ""
