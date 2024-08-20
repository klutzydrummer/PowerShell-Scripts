import json
from pathlib import Path
import shutil
from collections import deque
from datetime import datetime
from zoneinfo import ZoneInfo
from branutils import open_explorer, load_config, get_case_data_from_csv
from pop_up_windows import popup_with_copy, custom_popup_input, migrate_popup_fields
import pathlib
from pprint import pprint
import re
from time import sleep
from typing import List, Dict

def move_paths_to_directory(paths, destination):
    dest_path = Path(destination)
    dest_path.mkdir(parents=True, exist_ok=True)
    
    for path in paths:
        source_path = Path(path)
        if source_path.exists():
            try:
                shutil.move(str(source_path), str(dest_path))
                print(f"Moved {source_path} to {dest_path}")
            except shutil.Error as e:
                print(f"Error moving {source_path}: {e}")
        else:
            print(f"Source path does not exist: {source_path}")



if __name__ == "__main__":
    script_directory = pathlib.Path(__file__).parent.resolve()
    config = load_config()
    url = config.get("all_cases_url", None)
    notes_path = config.get("notes_path", None)
    old_notes_path = config.get("old_notes_path", None)
    if notes_path is None or old_notes_path is None or url is None:
        raise(KeyError('Required keys: "all_cases_url", "notes_path", "old_notes_path" not found in {config_file}'.format(config_file=config_file)))
    
    notes_path = Path(notes_path)
    old_notes_path = Path(old_notes_path)
    
    number_lines = lambda x: "\n".join([f"{i+1}. {line}" for i, line in enumerate(x.split("\n"))])
    
#     url_copy_message = number_lines("""Click 'Copy' to copy the URL.
# Paste into the url bar of your browser.
# Close the window for the next step.""")
#     url_copied = popup_with_copy(
#         title="Copy URL to clipboard.",
#         message=url_copy_message,
#         copy_data=url,
#         always_on_top=True
#     )
    
#     weekly_case_tracker_js_path = script_directory.parent / "bookmarklets/weekly_case_tracker_v2.js"
#     with open(weekly_case_tracker_js_path, 'r', encoding="utf-8", errors="ignore") as f:
#         weekly_case_tracker_js = f.read()
#     weekly_case_tracker_js = "javascript:" + weekly_case_tracker_js
#     js_copy_message = number_lines("""Click 'Copy' to copy the required JavaScript.
# Go to the browser where you opened the URL from the last step.
# Type "javascript:" then paste into the address bar and hit enter.
# The information should be copied to your clipboard in CSV format.
# Close this window to proceed to the next step, where that CSV will be used.""")
#     js_copied = popup_with_copy(
#         title="Copy {filename} to clipboard.".format(filename=weekly_case_tracker_js_path.name),
#         message=js_copy_message,
#         copy_data=weekly_case_tracker_js,
#         always_on_top=True
#     )
#     if js_copied is not True:
#         pass # exit()
    result, confirmed = custom_popup_input(
        title="Enter Case Data CSV.",
        message="Enter CSV from dfm tool suite.",
        fields=[
            {
                "attribute": "data",
                "label": "Paste CSV here:",
                "type": str,
                "kwargs": {"multiline": True}
            }
        ],
    )
    if confirmed is not True:
        print("Exiting script.")
        print(result)
        print(confirmed)
        exit()
    case_data = get_case_data_from_csv(result.get("data"))
    active_case_numbers = [case.get("number") for case in case_data]
    folder_name_pattern = re.compile(r'^\d{16}$')
    case_note_folders = [path for path in notes_path.iterdir() if path.is_dir() and folder_name_pattern.match(path.name)]
    exist_case_notes = [path.name for path in case_note_folders]
    old_case_note_folders = [path for path in case_note_folders if path.name not in active_case_numbers]
    old_cases = [path.name for path in old_case_note_folders]
    new_cases = [case for case in active_case_numbers if case not in exist_case_notes]
    new_case_note_folders = [Path(notes_path / case).mkdir(parents=True, exist_ok=True) for case in new_cases]
    move_paths_to_directory(old_case_note_folders, old_notes_path)
    custom_popup_input(
        title="Results.",
        message="""Moved {old_cases_len} case folders.
        Created {new_cases_len} case folders.""".format(old_cases_len=len(old_cases), new_cases_len=len(new_cases)),
        fields={},
        always_on_top=True
    )        

