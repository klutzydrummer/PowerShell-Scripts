from bs4 import BeautifulSoup
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import json
from datetime import datetime
import base64
import gzip
import re
from branutils import load_config, Clipboard
from markdown import markdown
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter
import pyperclip

# Constants
DATE_FORMAT = "%m-%d-%Y"
DEFAULT_CASE_STATUS = "Troubleshooting"
ERROR_MESSAGE_INVALID_BASE64 = "No valid Base64 encoded data was found."
MARKDOWN_QUOTE_PATTERN = re.compile(r"^>(.+?)$", re.MULTILINE)
MARKDOWN_QUOTE_REPLACE = r'<span>\1</span><br>'


# Helper functions
def show_error_message(message):
    messagebox.showerror("Error", message)

def handle_error(message, exception):
    # Log the error to a file (optional)
    # with open("error_log.txt", "a") as f:
    #     f.write(f"{message}: {str(exception)}\n")
    
    show_error_message(f"{message}: {str(exception)}")

def compress_and_base64_encode(input_string):
    compressed = gzip.compress(input_string.encode('utf-8'))
    return base64.b64encode(compressed).decode('utf-8')

def decode_and_decompress_base64(encoded_string):
    decoded = base64.b64decode(encoded_string)
    return gzip.decompress(decoded).decode('utf-8')

def validate_inputs(case_contact, problem_description):
    if not case_contact:
        show_error_message("Case Contact cannot be empty.")
        return False
    if not problem_description:
        show_error_message("Problem Description cannot be empty.")
        return False
    return True

def html_postprocessor(html_content):
    p_class = BeautifulSoup().new_tag('p').__class__
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find all blockquote elements
    blockquotes = soup.find_all('blockquote')
    
    for blockquote in blockquotes:
        # Create a new list to hold modified contents
        new_contents = []
        
        for element in blockquote.contents:
            if isinstance(element, str):
                # If the element is a string, split it by lines and wrap in <span><br>
                lines = element.splitlines()
                for line in lines:
                    new_span = soup.new_tag("span")
                    new_span.string = line
                    new_contents.append(new_span)
                    new_contents.append(soup.new_tag("br"))
            elif isinstance(element, p_class) and element.name == 'p':
                # If the element is a <p> tag, extract its text and process similarly
                lines = element.get_text().splitlines()
                for line in lines:
                    new_span = soup.new_tag("span")
                    new_span.string = line
                    new_contents.append(new_span)
                    new_contents.append(soup.new_tag("br"))
            else:
                # If it's another type of tag, just append it as is
                new_contents.append(element)
        
        # Replace the contents of the blockquote with the new processed contents
        blockquote.clear()
        blockquote.extend(new_contents)
    
    return str(soup)
    
def markdown_preprocessor(markdown_text):
    markdown_text = markdown_text
    return markdown_text

def convert_markdown_to_html(markdown_text):
    markdown_text = markdown_preprocessor(markdown_text)
    html_text = markdown(markdown_text, extensions=['fenced_code', 'codehilite'])
    # html_text = html_postprocessor(html_text)
    return html_text

def style_and_highlight_code_blocks(html_text):
    def highlight_code(match):
        lexer_name = match.group(1)
        code = match.group(2)
        lexer = get_lexer_by_name(lexer_name) if lexer_name else None
        formatter = HtmlFormatter(style='default')
        return highlight(code, lexer, formatter) if lexer else f'<pre><code>{code}</code></pre>'
    
    pattern = r'<pre><code class="(.*?)">(.*?)</code></pre>'
    styled_html = re.sub(pattern, highlight_code, html_text, flags=re.DOTALL)
    return styled_html

class CaseManagementApp:
    def __init__(self, master):
        self.master = master
        self.output_text = ""
        master.title("Case Management")
        master.geometry("600x700")
        master.minsize(350, 350)

        self.create_widgets()

    def create_widgets(self):
        self.table_layout = tk.Frame(self.master)
        self.table_layout.pack(fill=tk.BOTH, expand=True)

        # Configure row and column weights
        for i in range(6):
            self.table_layout.grid_rowconfigure(i, weight=1)
        self.table_layout.grid_columnconfigure(1, weight=1)

        self.widgets = {
            "update_date": self.create_label_and_entry("Update Date:", 0),
            "case_contact": self.create_label_and_entry("Case Contact:", 1),
            "case_status": self.create_label_and_combobox("Case Status:", 2),
            "problem_description": self.create_label_and_text("Problem Description:", 3),
            "next_action": self.create_label_and_text("Next Action:", 4),
            "template": self.create_label_and_text("Template:", 5, readonly=True),
        }

        self.always_on_top_var = tk.BooleanVar()
        self.always_on_top_checkbox = tk.Checkbutton(self.table_layout, text="Always on top", 
                                                    variable=self.always_on_top_var, 
                                                    command=self.toggle_always_on_top)
        self.always_on_top_checkbox.grid(row=6, column=1, sticky="w")

        self.create_buttons()

    def create_label_and_entry(self, text, row):
        label = tk.Label(self.table_layout, text=text)
        label.grid(row=row, column=0, sticky="w", padx=5, pady=5)
        
        entry = tk.Entry(self.table_layout)
        entry.grid(row=row, column=1, sticky="ew", padx=5, pady=5)
        
        return entry

    def create_label_and_combobox(self, text, row):
        label = tk.Label(self.table_layout, text=text)
        label.grid(row=row, column=0, sticky="w", padx=5, pady=5)
        
        combobox = ttk.Combobox(self.table_layout, values=[
            "Initial contact pending",
            "Identifying the issue",
            "Troubleshooting",
            "Pending customer response",
            "Waiting for customer confirmation",
            "Waiting for product team",
            "Mitigated"
        ])
        combobox.set(DEFAULT_CASE_STATUS)
        combobox.grid(row=row, column=1, sticky="ew", padx=5, pady=5)
        
        return combobox

    def create_label_and_text(self, text, row, readonly=False):
        label = tk.Label(self.table_layout, text=text)
        label.grid(row=row, column=0, sticky="nw", padx=5, pady=5)
        
        text_widget = tk.Text(self.table_layout, wrap=tk.WORD, height=5, 
                             width=50)
        text_widget.grid(row=row, column=1, sticky="nsew", padx=5, pady=5)
        
        if readonly:
            text_widget.config(state='disabled')
        
        self.table_layout.grid_rowconfigure(row, weight=1)
        return text_widget

    def create_buttons(self):
        button_frame = tk.Frame(self.table_layout)
        button_frame.grid(row=7, column=0, columnspan=2, pady=10)

        generate_button = tk.Button(button_frame, text="Generate", command=self.generate)
        generate_button.pack(side=tk.LEFT, padx=5)

        clear_button = tk.Button(button_frame, text="Clear", command=self.clear)
        clear_button.pack(side=tk.LEFT, padx=5)

        copy_button = tk.Button(button_frame, text="Copy", command=self.copy)
        copy_button.pack(side=tk.LEFT, padx=5)

        import_button = tk.Button(button_frame, text="Import", command=self.import_data)
        import_button.pack(side=tk.LEFT, padx=5)

    def toggle_always_on_top(self):
        self.update_date()
        self.master.attributes("-topmost", self.always_on_top_var.get())

    def generate(self):
        self.update_date()
        if not validate_inputs(self.widgets["case_contact"].get(), self.widgets["problem_description"].get("1.0", tk.END)):
            return

        output_markdown = f"""
Update Date: {self.widgets["update_date"].get()}
---

Case Contact: {self.widgets["case_contact"].get()}

---

Case Status: {self.widgets["case_status"].get()}
Problem Description: {self.widgets["problem_description"].get("1.0", tk.END).strip()}

---

## Next Action

{self.widgets["next_action"].get("1.0", tk.END).strip()}"""

        json_output = json.dumps({
            "updateDateTextBox": self.widgets["update_date"].get(),
            "caseContactTextBox": self.widgets["case_contact"].get(),
            "caseStatusComboBox": self.widgets["case_status"].get(),
            "problemDescriptionTextArea": self.widgets["problem_description"].get("1.0", tk.END).strip(),
            "nextActionTextArea": self.widgets["next_action"].get("1.0", tk.END).strip()
        })

        b64encoded = compress_and_base64_encode(json_output)
        output_markdown += f"\n<span style=\"color: transparent;\">Compressed Base64Encoded JSON:\n{b64encoded}\n:End Compressed Base64Encoded JSON</span>"

        html_output = convert_markdown_to_html(output_markdown)
        styled_output = style_and_highlight_code_blocks(html_output)
        
        self.output_text = styled_output
        self.widgets["template"].config(state='normal')
        self.widgets["template"].delete("1.0", tk.END)
        self.widgets["template"].insert("1.0", self.output_text, "styled_text")
        self.widgets["template"].tag_configure("styled_text", foreground="black")
        self.widgets["template"].config(state='disabled', font=("Courier New", 12))

    def clear(self):
        self.update_date()
        for widget in self.widgets.values():
            if isinstance(widget, tk.Entry):
                widget.delete(0, tk.END)
            elif isinstance(widget, ttk.Combobox):
                widget.set(DEFAULT_CASE_STATUS)
            elif isinstance(widget, tk.Text):
                widget.delete("1.0", tk.END)
                if widget == self.widgets["template"]:
                    widget.config(state='normal')
                    widget.delete("1.0", tk.END)
                    widget.config(state='disabled')
        self.output_text = ""

    def copy(self):
        self.update_date()
        if self.output_text == "":
            self.generate()
        with Clipboard() as cp:
            cp.set_clipboard(data=self.output_text, format_type="unicode")
        print(self.output_text)
        messagebox.showinfo("Info", "Styled text copied to clipboard!")

    def import_data(self):
        self.update_date()
        import_window = tk.Toplevel(self.master)
        import_window.title("Import Base64")
        import_window.geometry("400x300")
        import_window.transient(self.master)
        import_window.grab_set()

        label = tk.Label(import_window, text="Input the Base64 encoded note string below:")
        label.pack(pady=10)

        text_area = scrolledtext.ScrolledText(import_window, wrap=tk.WORD, height=10)
        text_area.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

        def import_action():
            import_text = text_area.get("1.0", tk.END).strip()
            case_notes_base64_pattern = r'Compressed Base64Encoded JSON:\s*(H4sIA[^\s<]+)'
            plain_base64_pattern = r'^[a-zA-Z0-9\+/]*={0,3}$'

            try:
                if re.search(case_notes_base64_pattern, import_text):
                    sanitized_encoded_string = re.search(case_notes_base64_pattern, import_text).group(1)
                elif re.match(plain_base64_pattern, import_text):
                    sanitized_encoded_string = import_text
                else:
                    raise ValueError(ERROR_MESSAGE_INVALID_BASE64)

                decoded_string = decode_and_decompress_base64(sanitized_encoded_string)
                json_object = json.loads(decoded_string)

                self.widgets["case_contact"].delete(0, tk.END)
                self.widgets["case_contact"].insert(0, json_object["caseContactTextBox"])
                self.widgets["case_status"].set(json_object["caseStatusComboBox"])
                self.widgets["problem_description"].delete("1.0", tk.END)
                self.widgets["problem_description"].insert("1.0", json_object["problemDescriptionTextArea"])
                self.widgets["next_action"].delete("1.0", tk.END)
                self.widgets["next_action"].insert("1.0", json_object["nextActionTextArea"])

                import_window.destroy()
            except Exception as e:
                handle_error("An error occurred while importing data", e)

        import_button = tk.Button(import_window, text="Import", command=import_action)
        import_button.pack(side=tk.LEFT, padx=10, pady=10)

        cancel_button = tk.Button(import_window, text="Cancel", command=import_window.destroy)
        cancel_button.pack(side=tk.RIGHT, padx=10, pady=10)

    def update_date(self):
        self.widgets["update_date"].delete(0, tk.END)
        self.widgets["update_date"].insert(0, datetime.now().strftime(DATE_FORMAT))
        
if __name__ == "__main__":
    root = tk.Tk()
    app = CaseManagementApp(root)
    app.update_date()
    root.mainloop()