from pathlib import Path
import json
text_file = Path(r"C:\Users\v-brhouser\email_thread.txt")
with open(text_file, 'r') as f:
    text_data = str(f.read())
message_delimmiter = r'------------------- Original Message -------------------'
messages = text_data.split(message_delimmiter)
json_file = Path(r'C:\Users\v-brhouser\email_thread.json')
json_content = json.dumps(messages, indent=4)
pretty_text_path = Path(r'C:\Users\v-brhouser\pretty_email_thread.txt')
# print(json_content)
pretty_text = "\n".join([f'---Message {len(messages) - i}---\n\n{each}\n\n' for i, each in enumerate(messages)])
with open(pretty_text_path, 'w') as f:
    f.write(pretty_text)
with open(json_file, 'w') as f:
    f.write(json_content)