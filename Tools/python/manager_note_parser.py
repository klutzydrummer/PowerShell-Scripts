from pathlib import Path
import re
import pandas as pd
import json
from datetime import datetime

def process_comments(comments: str) -> str:
    comments = str(comments)
    # Regex pattern to match the date and comment
    pattern = r'(\d{2}/\d{2}) - (.*?)(?=\d{2}/\d{2} - |$)'

    # Find all matches
    matches = re.findall(pattern, comments)

    # Convert to list of dictionaries and sort by date
    comment_list = sorted(
        [{datetime.strptime(date, "%m/%d").strftime("%m/%d"): comment.strip()} for date, comment in matches],
        key=lambda x: list(x.keys())[0],
        reverse=True
    )

    return json.dumps(comment_list)

manager_notes_path = Path(r"C:\Users\v-brhouser\OneDrive - Microsoft\Brandon_Susan_Notes_08_02_2024.csv")
column_types = {
    "Case Number": str,
    "Case Title": str,
    "SuHood Comments": str
}
match manager_notes_path.suffix:
    case ".csv":
        df = pd.read_csv(manager_notes_path, dtype=column_types)
    case ".xlsx":
        df = pd.read_excel(manager_notes_path, dtype=column_types)
    case _:
        raise ValueError("Invalid file type.")
print(df.columns)
case_dict = {
    str(row["Case Number"]).rstrip(): {
        "Case Title": row["Case Title"],
        "Manager Notes": process_comments(row["SuHood Comments"])
    }
    for _, row in df.iterrows() if str(row["Case Number"]) != "nan"
}

json_out = json.dumps(case_dict, indent=4)
json_out_path = Path(r"C:\Users\v-brhouser\OneDrive - Microsoft\Brandon_Susan_Notes_08_02_2024.json")
with open(json_out_path, 'w') as f:
    f.write(json_out)