import tkinter as tk
from tkinter import simpledialog, messagebox
import pyperclip
from typing import Dict, List, Tuple, Optional

def custom_popup_input(title: str, message: str, fields: Dict[str, str], always_on_top: bool = True) -> Tuple[Optional[Dict[str, str]], bool]:
    '''Takes 3 parameters, window title, window message, and fields dict, where input dict keys equal the output dict keys, and the input dict values equal the text field labels.'''
    class CustomDialog(simpledialog.Dialog):
        def __init__(self, parent, title, message, fields, always_on_top):
            self.message = message
            self.fields = fields
            self.entries = {}
            self.result = None
            self.always_on_top = always_on_top
            super().__init__(parent, title=title)

        def body(self, master):
            tk.Label(master, text=self.message, wraplength=300).grid(row=0, columnspan=2, pady=10)
            for i, (key, label) in enumerate(self.fields.items(), start=1):
                tk.Label(master, text=label).grid(row=i, column=0, sticky="e", padx=5, pady=5)
                self.entries[key] = tk.Entry(master)
                self.entries[key].grid(row=i, column=1, sticky="we", padx=5, pady=5)
            return self.entries[next(iter(self.fields))]  # Return first entry for initial focus

        def apply(self):
            self.result = {key: entry.get() for key, entry in self.entries.items()}

        def show(self):
            if self.always_on_top:
                self.wm_attributes("-topmost", 1)
            return super().show()

    root = tk.Tk()
    root.withdraw()  # Hide the main window
    dialog = CustomDialog(root, title, message, fields, always_on_top)
    
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
