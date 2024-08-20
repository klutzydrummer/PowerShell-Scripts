import tkinter as tk
from tkinter import ttk, simpledialog, messagebox
import pyperclip
from typing import Dict, List, Tuple, Optional
from tkcalendar import DateEntry
from datetime import datetime

def migrate_popup_fields(fields: Dict[str,str]) -> List[Dict]:
    return [{"attribute": key, "label": value, "type": str} for key, value in fields.items()]

import tkinter as tk
from tkinter import ttk
from typing import List, Dict, Tuple, Optional
from tkcalendar import DateEntry
from datetime import datetime

TYPE_MAPPINGS = {
    str: "text",
    int: "whole integer number",
    float: "decimal number",
    datetime: "datetime",
    bool: "checkbox"
}

def custom_popup_input(title: str, message: str, fields: List[Dict[str, str]], always_on_top: bool = True) -> Tuple[Optional[Dict[str, str]], bool]:
    # Constants
    PADDING = 5
    RIGHT_COLUMN_WIDTH = 200
    MULTILINE_HEIGHT = 5
    result = {}
    confirmed = False

    root = tk.Tk()
    root.title(title)
    root.attributes("-topmost", always_on_top)

    # Message label
    message_label = ttk.Label(root, text=message)
    message_label.pack(pady=PADDING)

    # Create a frame for the canvas and scrollbar
    frame = ttk.Frame(root)
    frame.pack(fill=tk.BOTH, expand=True, padx=PADDING, pady=PADDING)

    # Create a canvas
    canvas = tk.Canvas(frame)
    canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

    # Add a scrollbar to the canvas
    scrollbar = ttk.Scrollbar(frame, orient=tk.VERTICAL, command=canvas.yview)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    # Configure the canvas
    canvas.configure(yscrollcommand=scrollbar.set)
    
    # Create another frame inside the canvas
    inner_frame = ttk.Frame(canvas)
    inner_frame.columnconfigure(0, weight=1)
    inner_frame.columnconfigure(1, weight=1, minsize=RIGHT_COLUMN_WIDTH)

    # Create a window within the canvas
    canvas_window = canvas.create_window((0, 0), window=inner_frame, anchor="nw")

    # Ensure the canvas resizes properly
    def on_frame_resize(event):
        canvas_width = event.width
        canvas.itemconfig(canvas_window, width=canvas_width)
        update_wraplengths(canvas_width)

    canvas.bind('<Configure>', on_frame_resize)

    # Wrapper class to handle different input widget types
    class InputWrapper:
        def __init__(self, widget, field_type, kwargs):
            self.widget = widget
            self.field_type = field_type
            self.kwargs = kwargs

        def get(self):
            if self.field_type == str:
                if self.kwargs is not None and self.kwargs.get("multiline") is True:
                    return self.widget.get("1.0",'end-1c')
                else:
                    return self.widget.get()
            elif self.field_type == bool:
                return self.widget.instate(['selected'])  # For checkbuttons
            elif self.field_type == datetime:
                return self.widget.get_date()  # For date entries
            else:
                return self.widget.get()  # For entries

    # Store labels to update their wraplength dynamically
    labels = []

    # Function to create input widgets based on field type
    def create_input_widget(parent, field_type, value=None, kwargs=None):
        if field_type == str:
            if kwargs is not None and kwargs.get("multiline") == True:
                text_widget = tk.Text(parent, height=MULTILINE_HEIGHT)
                if value is not None:
                    text_widget.insert("1.0", value)
                return text_widget
            else:
                entry_widget = ttk.Entry(parent)
                if value is not None:
                    entry_widget.insert(0, value)
                return entry_widget
        elif field_type == int or field_type == float:
            entry_widget = ttk.Entry(parent, validate="key", validatecommand=(parent.register(lambda P: P == "" or P.replace(".", "").isdigit()), "%P"))
            if value is not None:
                entry_widget.insert(0, str(value))
            return entry_widget
        elif field_type == datetime:
            date_widget = DateEntry(parent, width=12, background='darkblue', foreground='white', borderwidth=2)
            if value is not None:
                date_widget.set_date(value)
            return date_widget
        elif field_type == bool:
            checkbutton_widget = ttk.Checkbutton(parent)
            if value is not None:
                checkbutton_widget.state(['!alternate'])  # Ensure state is not in an undefined state
                if value:
                    checkbutton_widget.state(['selected'])
                else:
                    checkbutton_widget.state(['!selected'])
            return checkbutton_widget
        else:  # Default to string input
            entry_widget = ttk.Entry(parent)
            if value is not None:
                entry_widget.insert(0, value)
            return entry_widget

    # Create input fields
    for i, field in enumerate(fields):
        type_hint = TYPE_MAPPINGS.get(field['type'], "")
        type_hint = " expecting ({type_text}):".format(type_text=type_hint) if type_hint != "" else ""
        label_text = field['label'] + type_hint
        
        default_value = field.get("value")
        label = ttk.Label(inner_frame, text=label_text, anchor="nw", justify='left')
        label.grid(row=i * 2, column=0, sticky="w", padx=(0, PADDING), pady=(PADDING, 0))
        labels.append(label)

        input_widget = create_input_widget(parent=inner_frame, field_type=field['type'], value=default_value, kwargs=field.get("kwargs"))
        input_widget.grid(row=i * 2, column=1, sticky="e", padx=(PADDING, 0), pady=(PADDING, 0))

        result[field['attribute']] = InputWrapper(input_widget, field['type'], field.get("kwargs"))

        # Add a separator below each input field
        if i < len(fields) - 1:  # Don't add a separator after the last field
            separator = ttk.Separator(inner_frame, orient='horizontal')
            separator.grid(row=i * 2 + 1, column=0, columnspan=2, sticky="ew", pady=(PADDING, 0))

    # Function to update the wraplength of labels
    def update_wraplengths(width):
        for label in labels:
            label.config(wraplength=width * 0.75)  # Adjust the factor (0.75) based on your layout needs

    # Button frame
    button_frame = ttk.Frame(root)
    button_frame.pack(fill=tk.X, padx=PADDING, pady=PADDING)

    def on_ok():
        nonlocal confirmed
        confirmed = True
        for field in fields:
            result[field['attribute']] = result[field['attribute']].get()
        root.destroy()

    def on_cancel():
        nonlocal confirmed
        confirmed = False
        root.destroy()

    ok_button = ttk.Button(button_frame, text="OK", command=on_ok)
    ok_button.pack(side=tk.RIGHT, padx=(PADDING, 0))

    cancel_button = ttk.Button(button_frame, text="Cancel", command=on_cancel)
    cancel_button.pack(side=tk.RIGHT, padx=(PADDING, 0))

    # Update scroll region when necessary
    inner_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))

    # Trigger initial wraplength update
    root.update_idletasks()  # Ensure the window is fully rendered before calculating dimensions
    update_wraplengths(root.winfo_width())

    root.mainloop()

    if confirmed:
        return result, True
    else:
        return None, False

def popup_with_copy(title: str, message: str, copy_data: str, always_on_top:bool=True) -> bool:
    '''Takes 3 parameters, window title, window message, and copy_data, which is the data that is copied to the user's clipboard.'''
    def copy_to_clipboard():
        pyperclip.copy(str(copy_data))
        messagebox.showinfo("Copied", "Data has been copied to clipboard!")
        nonlocal copied
        copied = True

    def close_window():
        root.destroy()

    copied = False
    
    root = tk.Tk()
    root.title(title)
    
    if always_on_top:
        root.attributes('-topmost', True)
    
    label = tk.Label(root, text=message, padx=20, pady=20, justify="left")
    label.pack()
    
    copy_button = tk.Button(root, text="Copy", command=copy_to_clipboard)
    copy_button.pack(side=tk.LEFT, padx=10, pady=10)
    
    close_button = tk.Button(root, text="Close", command=close_window)
    close_button.pack(side=tk.RIGHT, padx=10, pady=10)
    
    root.mainloop()
    
    return copied

import tkinter as tk
from tkinter import filedialog
from typing import List, Optional, Literal

def file_folder_picker(
    title: str = "Select File or Folder",
    mode: Literal["file", "files", "folder", "folders"] = "file",
    action: Literal["open", "save"] = "open",
    file_types: List[tuple] = [("All files", "*.*")],
    initial_dir: str = None,
    default_extension: str = None
) -> Optional[str | List[str]]:
    """
    Spawns a file/folder picker dialog and returns the path(s) of the chosen file(s) or folder(s).

    Args:
    title (str): The title of the dialog window.
    mode (str): The selection mode ("file", "files", "folder", or "folders").
    action (str): The action to perform ("open" or "save").
    file_types (List[tuple]): List of tuples for file types, e.g. [("Text files", "*.txt"), ("All files", "*.*")].
    initial_dir (str): The initial directory to open the dialog in.
    default_extension (str): The default file extension to use when saving a file.

    Returns:
    str or List[str] or None: The selected path(s) or None if cancelled.
    """
    root = tk.Tk()
    root.withdraw()  # Hide the main window

    try:
        if mode == "file":
            if action == "open":
                result = filedialog.askopenfilename(
                    title=title,
                    filetypes=file_types,
                    initialdir=initial_dir
                )
            else:  # save
                result = filedialog.asksaveasfilename(
                    title=title,
                    filetypes=file_types,
                    initialdir=initial_dir,
                    defaultextension=default_extension
                )
        elif mode == "files":
            result = filedialog.askopenfilenames(
                title=title,
                filetypes=file_types,
                initialdir=initial_dir
            )
        elif mode == "folder":
            result = filedialog.askdirectory(
                title=title,
                initialdir=initial_dir
            )
        elif mode == "folders":
            # There's no built-in multi-folder selection, so we'll use a workaround
            result = []
            while True:
                folder = filedialog.askdirectory(
                    title=f"{title} (Select multiple, Cancel when done)",
                    initialdir=initial_dir
                )
                if not folder:
                    break
                result.append(folder)
                initial_dir = folder  # Set the last selected folder as the new initial directory
        else:
            raise ValueError("Invalid mode. Use 'file', 'files', 'folder', or 'folders'.")

        return result if result else None

    finally:
        root.destroy()  # Ensure the hidden root window is destroyed