from pathlib import Path
import re
import pandas as pd
import json
from datetime import datetime
from branutils import load_config
from pop_up_windows import file_folder_picker
from io import StringIO

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

if __name__ == "__main__":
    config = load_config()
    
    manager_notes_parent_path = Path(config.get("manager_notes_path"))
    manager_notes_path = file_folder_picker(
        title = "Select File or Folder",
        mode = "file",
        action = "open",
        file_types = [("Comma Separated Values file", "*.csv"), ("All files", "*.*")],
        initial_dir = manager_notes_parent_path,
        default_extension = None
    )
    manager_notes_path = Path(manager_notes_path)
    column_types = {
        "Case Number": str,
        "Case Title": str,
        "SuHood Comments": str
    }
    match manager_notes_path.suffix:
        case ".csv":
            with open(manager_notes_path, 'r', encoding='utf-8', errors='ignore') as f:
                csv_string = f.read()
            df = pd.read_csv(StringIO(csv_string), dtype=column_types)
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
    json_out_path = manager_notes_path.with_suffix('.json')
    with open(json_out_path, 'w', encoding="utf-8", errors="ignore") as f:
        f.write(json_out)
    print("Succesfulyl parsed manager notes.\nFile saved to: {path}".format(path=json_out_path))