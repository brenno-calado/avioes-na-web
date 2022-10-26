from datetime import datetime
from dateutil import parser


def clean_date(date_string: str):
    default_time = datetime(2000, 1, 1, 0, 0)
    if date_string is None:
        return ''

    if '[' in date_string:
        date_string = date_string[0:date_string.find('[')]
    if '(' in date_string:
        date_string = date_string[date_string.find('(')+1:date_string.find(')')]
    try:
        return parser.parse(date_string.strip(), default=default_time).date().isoformat()
    except:
        return date_string.strip()
