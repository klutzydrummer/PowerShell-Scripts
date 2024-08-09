import os
import subprocess
from pathlib import Path
import json
from typing import List, Dict
from io import StringIO
import csv
import win32clipboard
import win32con

TEMP_PATH = Path(os.environ.get("temp"))

DEFAULT_CONFIG = {
    "my_name": "User",
    "my_team": "Team",
    "all_cases_url": "https://dfmsite.com/<view of cases>",
    "notes_path": TEMP_PATH / "Notes",
    "old_notes_path": TEMP_PATH / "Notes/old_cases",
    "email_notes_path": TEMP_PATH / "Notes/emails",
    "manager_notes_path": TEMP_PATH / "Notes/manager_notes",
    "email_templates_path": TEMP_PATH / "Notes/email_templates"
}

def get_base_path() -> Path:
    return Path(__file__).parent.resolve()

def get_config_directory() -> Path:
    script_directory = get_base_path()
    return script_directory.parent / "config"

def get_config_file() -> Path:
    config_base = get_config_directory()
    return config_base / "my_data.json"

def load_config() -> dict:
    config_base = get_config_directory()
    config_file =  config_base / "my_data.json"
    example_file = config_base / "config/my_data.example.json"
    if not config_file.exists():
        raise(FileNotFoundError("Missing config file: {config_file}\nUse example found at {example_file}".format(config_file=str(config_file), example_file=str(example_file))))
    with open(config_file, 'r', encoding="utf-8", errors="ignore") as f:
        json_data = f.read()
    config = json.loads(json_data)
    return config

def create_config() -> None:
    config_file = get_config_file()
    with open(config_file, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(json.dumps(DEFAULT_CONFIG, indent=4))

def get_case_data_from_csv(csv_string: str) -> List[Dict[str, str]]:
    csv_string = csv_string.encode(encoding="utf-8", errors="ignore").decode(encoding="utf-8", errors="ignore")
    csv_file = StringIO(csv_string)
    csv_reader = csv.DictReader(csv_file)
    case_data = []
    for row in csv_reader:
        case_number = row['Case_Number'].rstrip("'")
        case_title = row['Case_Title']
        case_data.append({
            "number": case_number,
            "title": case_title
        })
    return case_data

def open_explorer(path):
    # Normalize the path to ensure it uses backslashes
    normalized_path = os.path.normpath(path)
    
    # Check if the path exists
    if not os.path.exists(normalized_path):
        raise FileNotFoundError(f"The path '{normalized_path}' does not exist.")
    
    # Open Windows Explorer to the specified path
    subprocess.run(['explorer', normalized_path])

class Clipboard():
    def __init__(self):
        self.available_formats = {
            'text': win32con.CF_TEXT,
            'unicode': win32con.CF_UNICODETEXT,
            'html': 49311,
            'bitmap': win32con.CF_BITMAP,
            'dib': win32con.CF_DIB,
            'dibv5': win32con.CF_DIBV5,
            'locale': win32con.CF_LOCALE,
            'hdrop': win32con.CF_HDROP,
            # 'files': clipboard.RegisterClipboardFormat('FileGroupDescriptorW')
        }

    def __enter__(self):
        win32clipboard.OpenClipboard()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        win32clipboard.CloseClipboard()

    def set_clipboard(self, data, format_type='text'):
        format_id = self.available_formats.get(format_type)
        if format_id is None:
            raise ValueError(f"Unsupported format type: {format_type}")
        
        win32clipboard.EmptyClipboard()
        
        if format_type in ['text', 'unicode']:
            win32clipboard.SetClipboardData(format_id, data.encode('utf-8') if format_type == 'text' else data)
        else:
            win32clipboard.SetClipboardData(format_id, data)

    def read_clipboard(self, format_type='text'):
        format_id = self.available_formats.get(format_type)
        if format_id is None:
            raise ValueError(f"Unsupported format type: {format_type}")
        
        if win32clipboard.IsClipboardFormatAvailable(format_id):
            data = win32clipboard.GetClipboardData(format_id)
            return data.decode('utf-8') if format_type == 'text' else data
        else:
            return None
            
# with Clipboard() as cp:
#     test = cp.read_clipboard("html")
#     print(test)