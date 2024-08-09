import os
import tkinter as tk
from tkinter import ttk
from pathlib import Path
import json
from branutils import get_config_directory, get_config_file, load_config, create_config, open_explorer

BOOKMARKLET_PATH = Path(__file__).parent / "bookmarklets/weekly_case_tracker_v2.js"

def copy_to_clipboard(data):
    root.clipboard_clear()
    root.clipboard_append(data)
    root.update()

def open_bookmarklet_instructions():
    message = """
1. Copy the following URL:
   {all_cases_url}

2. Navigate to the URL in your web browser.

3. Copy the following JavaScript bookmarklet:
   {bookmarklet_js}

4. In your web browser, type "javascript:" in the address bar, 
   then paste the bookmarklet code and hit Enter.
   This will copy a CSV-formatted string to your clipboard.

5. Click the 'Load from clipboard' button to the right.
""".format(all_cases_url=config.get("all_cases_url", ""), bookmarklet_js=BOOKMARKLET_PATH.read_text())
    popup_with_copy(title="Instructions", message=message, copy_data=BOOKMARKLET_PATH.read_text())

def load_from_clipboard():
    try:
        clipboard_data = root.clipboard_get()
        cases = []
        for line in clipboard_data.split("\n"):
            case_number, case_title = line.split(",")
            case_number = case_number.strip("'")
            cases.append({"case_number": case_number, "case_title": case_title.strip()})
        update_case_dropdown(cases)
    except:
        popup_with_message("Error", "No valid data found in clipboard.")

def update_case_dropdown(cases):
    case_dropdown["values"] = [f"{case['case_number']} - {case['case_title']}" for case in cases]
    case_dropdown.configure(state="normal")
    popup_with_message.destroy()

def open_case_directory(event):
    selected_case = case_dropdown.get().split(" - ")
    case_number = selected_case[0]
    notes_path = Path(config.get("notes_path", "C:/temp"))
    case_dir = notes_path / case_number
    if not case_dir.exists():
        old_case_dir = Path(config.get("old_notes_path", "C:/temp/old_cases")) / case_number
        if old_case_dir.exists():
            old_case_dir.replace(case_dir)
        else:
            case_dir.mkdir(parents=True, exist_ok=True)
    open_explorer(str(case_dir))

def popup_with_message(title, message):
    popup = tk.Toplevel(root)
    popup.title(title)
    popup.geometry("400x200")
    label = tk.Label(popup, text=message, wraplength=380)
    label.pack(pady=20)
    ok_button = tk.Button(popup, text="OK", command=popup.destroy)
    ok_button.pack(side=tk.RIGHT, padx=10, pady=10)

def popup_with_copy(title, message, copy_data):
    popup = tk.Toplevel(root)
    popup.title(title)
    popup.geometry("400x200")
    label = tk.Label(popup, text=message, wraplength=380)
    label.pack(pady=20)
    copy_button = tk.Button(popup, text="Copy", command=lambda: copy_to_clipboard(copy_data))
    copy_button.pack(side=tk.RIGHT, padx=10, pady=10)
    ok_button = tk.Button(popup, text="OK", command=popup.destroy)
    ok_button.pack(side=tk.RIGHT, padx=10, pady=10)

def main():
    global root, case_dropdown, config, popup_with_message

    root = tk.Tk()
    root.title("Weekly Case Tracker")

    config_file = get_config_file()
    if not config_file.exists():
        config = create_config()
    else:
        config = load_config()

    if config.get("all_cases_url") is None or config.get("notes_path") is None:
        popup_with_copy(title="Missing Configuration", message="No case configuration file found. Please follow the instructions to create one.", copy_data=BOOKMARKLET_PATH.read_text())
        return

    case_dropdown = ttk.Combobox(root, state="disabled")
    case_dropdown.pack(pady=20)
    case_dropdown.bind("<<ComboboxSelected>>", open_case_directory)

    load_button = tk.Button(root, text="Load from clipboard", command=load_from_clipboard)
    load_button.pack(side=tk.RIGHT, padx=10, pady=10)

    root.mainloop()

if __name__ == "__main__":
    main()