import tkinter as tk
from tkinter import simpledialog, messagebox
import pyperclip
from typing import Dict, List, Tuple, Optional

def custom_popup_input(title: str, message: str, fields: Dict[str, str], always_on_top: bool = True) -> Tuple[Optional[Dict[str, str]], bool]:
    '''Takes 3 parameters, window title, window message, and fields dict, where input dict keys equal the output dict keys, and the input dict values equal the text field labels.'''
    root = tk.Tk()
    root.withdraw()  # Hide the root window
    
    class CustomDialog(tk.Toplevel):
        def __init__(self, title, message, fields, always_on_top):
            super().__init__()
            self.title(title)
            self.message = message
            self.fields = fields
            self.entries = {}
            self.result = None
            
            self.protocol("WM_DELETE_WINDOW", self.on_cancel)
            self.resizable(False, False)
            
            if always_on_top:
                self.attributes('-topmost', True)
            
            self.create_widgets()
            
            self.grab_set()
            self.focus_set()
            
        def create_widgets(self):
            tk.Label(self, text=self.message, wraplength=300).grid(row=0, columnspan=2, pady=10, padx=10)
            
            for i, (key, label) in enumerate(self.fields.items(), start=1):
                tk.Label(self, text=label).grid(row=i, column=0, sticky="e", padx=5, pady=5)
                self.entries[key] = tk.Entry(self)
                self.entries[key].grid(row=i, column=1, sticky="we", padx=5, pady=5)
            
            button_frame = tk.Frame(self)
            button_frame.grid(row=len(self.fields)+1, column=0, columnspan=2, pady=10)
            
            tk.Button(button_frame, text="OK", command=self.on_ok).pack(side=tk.LEFT, padx=5)
            tk.Button(button_frame, text="Cancel", command=self.on_cancel).pack(side=tk.LEFT, padx=5)

        def on_ok(self):
            self.result = {key: entry.get() for key, entry in self.entries.items()}
            self.destroy()

        def on_cancel(self):
            self.result = None
            self.destroy()

    dialog = CustomDialog(title, message, fields, always_on_top)
    dialog.wait_window()
    
    if dialog.result is not None:
        return (dialog.result, True)
    else:
        return (None, False)

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
    file_types: List[tuple] = None,
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