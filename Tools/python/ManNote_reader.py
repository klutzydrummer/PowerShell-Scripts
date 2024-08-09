from branutils import load_config
from pathlib import Path
from typing import List, Dict
import re
import tkinter as tk
from pathlib import Path
import json
from datetime import datetime

# Constants
case_number_pattern = re.compile(r'\d{16}')
config = load_config()
MANAGER_NOTES_DIR: Path = Path(config.get("manager_notes_path"))
MANAGER_NOTES_PATTERN = "*.json"
SEPERATOR = "\n\n---\n\n"


class CaseManagementApp:
    def __init__(self, master):
        self.master = master
        master.title("Case Management")
        master.geometry("600x400")
        master.resizable(False, False)

        # Create a TableFrame for better control over resizing
        self.table_frame = tk.Frame(master)
        self.table_frame.pack(fill=tk.BOTH, expand=True)

        # Initialize controls
        self.case_number_label = self.create_control("Label", "Case Number:")
        self.case_number_entry = self.create_control("Entry", width=200)
        self.go_button = self.create_control("Button", "Go", command=self.handle_go_button)

        self.case_title_label = self.create_control("Label", "Case Title:")
        self.case_title_entry = self.create_control("Entry", width=400)

        self.manager_notes_label = self.create_control("Label", "Manager Notes:")
        self.manager_notes_text = self.create_control("Text", isMultiline=True, width=400)
        self.always_on_top_value = False
        self.always_on_top_checkbox = tk.Checkbutton(self.table_frame, text="Always on top", variable=self.always_on_top_value, command=self.handle_always_on_top)
        
        # Add controls to the TableFrame
        self.table_frame.grid_columnconfigure(1, weight=1)
        self.table_frame.grid_rowconfigure(2, weight=1)

        self.case_number_label.grid(row=0, column=0, sticky="w", padx=10, pady=10)
        self.case_number_entry.grid(row=0, column=1, sticky="w", padx=10, pady=10)
        self.go_button.grid(row=0, column=2, sticky="w", padx=10, pady=10)

        self.case_title_label.grid(row=1, column=0, sticky="w", padx=10, pady=10)
        self.case_title_entry.grid(row=1, column=1, columnspan=2, sticky="w", padx=10, pady=10)

        self.manager_notes_label.grid(row=2, column=0, sticky="nw", padx=10, pady=10)
        self.manager_notes_text.grid(row=2, column=1, columnspan=2, sticky="nsew", padx=10, pady=10)

        self.always_on_top_checkbox.grid(row=3, column=1, sticky="w", padx=10, pady=10)

    def create_control(self, control_type, text="", isMultiline=False, width=200, command=None):
        if control_type == "Label":
            return tk.Label(self.table_frame, text=text)
        elif control_type == "Entry":
            return tk.Entry(self.table_frame, width=width)
        elif control_type == "Button":
            return tk.Button(self.table_frame, text=text, command=command)
        elif control_type == "Checkbox":
            return tk.Checkbutton(self.table_frame, text=text, command=command)
        elif control_type == "Text":
            text_control = tk.Text(self.table_frame, width=width, height=5 if isMultiline else 1, wrap=tk.WORD if isMultiline else tk.NONE)
            if isMultiline:
                text_control.config(yscrollcommand=True)
            return text_control

    def handle_go_button(self):
        case_number_field = self.case_number_entry.get()
        match = re.search(case_number_pattern, case_number_field)
        if match:
            case_number = match.group()
            try:
                case_data = self.get_case_data(case_number)
                manager_notes: List[Dict[str, str]] = json.loads(case_data["Manager Notes"])
                manager_notes_string = SEPERATOR.join([f"{key} - {value}" for d in manager_notes for key, value in d.items()])
                
                self.case_title_entry.delete(0, tk.END)
                self.case_title_entry.insert(0, case_data["Case Title"])
                self.manager_notes_text.delete("1.0", tk.END)
                self.manager_notes_text.insert("1.0", manager_notes_string)
            except (FileNotFoundError, KeyError):
                tk.messagebox.showerror(title="Error", message=f"Case Number {case_number} not found in the JSON file.")
        else:
            tk.messagebox.showerror(title="Error", message=f"Case Number invalid.")

    def get_case_data(self, case_number):
        notes_dir = MANAGER_NOTES_DIR
        manager_notes_json_files = notes_dir.glob("*.json")
        sorted_notes_files = sorted(manager_notes_json_files, key=lambda f: f.stat().st_mtime, reverse=True)

        for notes_file in sorted_notes_files:
            with notes_file.open(encoding='utf-8', errors='ignore') as f:
                data = json.load(f)
                if str(case_number) in data:
                    return data[str(case_number)]

        raise FileNotFoundError(f"JSON file not found for case number {case_number}")

    def handle_always_on_top(self):
        self.always_on_top_value = not self.always_on_top_value
        self.master.attributes("-topmost", self.always_on_top_value)

if __name__ == "__main__":
    root = tk.Tk()
    app = CaseManagementApp(root)
    root.mainloop()