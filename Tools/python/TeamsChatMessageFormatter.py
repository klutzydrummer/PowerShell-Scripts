import json
from pathlib import Path
from collections import deque
from datetime import datetime
from zoneinfo import ZoneInfo
from branutils import open_explorer, load_config
from pop_up_windows import popup_with_copy, custom_popup_input, migrate_popup_fields
from typing import List

FLAGS_AND_TEMPLATES = [
    {
        "flag": "base64_flag",
        "search": "var base64_flag =",
    },
    {
        "flag": "runDirect",
        "search": "var runDirect =",
    },
    {
        "flag": "addMenu",
        "search": "var addMenu =",
    }
]
FLAG_SET_DEFAULT = {
    "base64_flag": False,
    "runDirect": True,
    "addMenu": True
}
base64_flag = False

def change_js_base64_flag(javascript: List[str], base64_encode_images: bool) -> str:
    output = javascript.copy()
    FLAG_SET_DEFAULT["base64_flag"] = base64_encode_images
    found_flags = set()
    all_flags = set(FLAG_SET_DEFAULT.keys())
    for i, line in enumerate(output):
        if len(all_flags.difference(found_flags)) == 0:
            break
        check_line = line.replace("true;", "").replace("false;", "").rstrip("\n").rstrip(" ")
        iter_found_flags = [flag for flag in FLAGS_AND_TEMPLATES if check_line in flag.get("search", "")]
        for flag in iter_found_flags:
            found_flag = flag.get("flag", None)
            if found_flag is None:
                raise(KeyError('"flag" key is missing from flag template: {flag}'.format(flag=flag)))
            new_flag_value = str(FLAG_SET_DEFAULT.get(found_flag)).lower()
            new_line_value = check_line + " {new_flag_value};\n".format(new_flag_value=new_flag_value)
            output[i] = new_line_value
            found_flags.add(found_flag)
            
    return "".join(output)
    
def fetch_data():
    """Fetch data from user input and config."""
    config = load_config()
    script_directory = Path(__file__).parent.resolve()
    TeamsChatMessageExtractor_js_path = Path(script_directory.parent / "javascript/TeamsChatMessageExtractor.js")
    
    with open(TeamsChatMessageExtractor_js_path, 'r', encoding="utf-8", errors="ignore") as f:
        TeamsChatMessageExtractor_js_lines = f.readlines()
    TeamsChatMessageExtractor_js = change_js_base64_flag(TeamsChatMessageExtractor_js_lines, base64_flag)
    js_copy_message = """\
    1. Click 'Copy' to copy the required JavaScript.
    2. Open up the Teams Chat thread you want to copy.
    3. Hit F12 to open the developer console. (Must be enabled)
    4. Paste into the console and hit enter.
    5. The chat messages should be copied to your clipboard in JSON format.
    6. Close this window to proceed to the next step, where that JSON will be used."""
    
    js_copied = popup_with_copy(title="Copy TeamsChatMessageExtractor.js to clipboard.", message=js_copy_message, copy_data=TeamsChatMessageExtractor_js)
    if js_copied is not True:
        pass
    
    result, confirmed = custom_popup_input(title="Enter JSON from Teams", message="Enter the JSON that was gathered from the last step.", fields=migrate_popup_fields({"TeamsJSON": "Paste JSON here:"}))
    if confirmed is not True:
        exit()
    
    json_string = result.get("TeamsJSON").encode(encoding="utf-8", errors="ignore")
    chat_messages = json.loads(json_string)
    return chat_messages, config


def process_message(message, tz: ZoneInfo):
    """Process individual message dictionary into components."""
    if not isinstance(message, dict):
        raise ValueError(f"Unexpected type for message, not dict. Found type: {type(message)}")
    
    time = message.get("time", None)
    author = message.get("author", None)
    message_body = message.get("message", None)
    referencedMessages = message.get("referencedMessages", None)
    reactions = message.get("reactions", None)
    isEdited = message.get("isEdited", None)
    
    if time is not None:
        parsed_datetime = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S.%fZ")
        time = parsed_datetime.replace(tzinfo=ZoneInfo("UTC")).astimezone(tz).strftime("%m/%d/%Y %I:%M %p")
    
    references = []
    if referencedMessages is not None:
        for referencedMessage in referencedMessages:
            reference_author = referencedMessage.get("referenceAuthor", None)
            reference_time = referencedMessage.get("referenceTime", None)
            reference_body = referencedMessage.get("referenceBody", "").strip()
            
            if reference_time is not None:
                parsed_reference_datetime = datetime.strptime(reference_time, "%Y-%m-%dT%H:%M:%S.%fZ")
                reference_time = parsed_reference_datetime.replace(tzinfo=ZoneInfo("UTC")).astimezone(tz).strftime("%m/%d/%Y %I:%M %p")
            
            references.append({
                "author": reference_author,
                "time": reference_time,
                "body": reference_body,
            })
    
    return {
        "time": time,
        "author": author,
        "message_body": message_body,
        "references": references,
        "reactions": reactions,
        "is_edited": isEdited,
    }


def format_markdown(message_data):
    """Format the message data into Markdown."""
    header = f"{message_data['author']} - {message_data['time']}  " if message_data['author'] and message_data['time'] else f"{message_data['author']}  "
    body = message_data["message_body"] or ""
    
    # Process references
    for reference in message_data["references"]:
        reference_body = "\n".join([f">{line}  " for line in reference["body"].splitlines()])
        reference_header = f">{reference['author']} - {reference['time']}  "
        body = body.replace("<REFERENCE>", f"\n{reference_header}\n{reference_body}\n")
    
    footer = "\n".join([
        f"{reaction_name}: {reaction_count}" for reaction_name, reaction_count in (message_data["reactions"] or {}).items()
    ]) + "  " + ("\nEdited" if message_data["is_edited"] else "")
    
    return f"{header}\n{body}\n{footer}".strip()


def format_html(message_data):
    """Format the message data into HTML."""
    header = f"<b>{message_data['author']}</b> - <i>{message_data['time']}</i><br>" if message_data['author'] and message_data['time'] else f"<b>{message_data['author']}</b><br>"
    body = message_data["message_body"] or ""
    
    # Process references
    for reference in message_data["references"]:
        reference_body = "<br>".join([f"<blockquote>{line}</blockquote>" for line in reference["body"].splitlines()])
        reference_header = f"<blockquote><b>{reference['author']}</b> - <i>{reference['time']}</i></blockquote>"
        body = body.replace("<REFERENCE>", f"<br>{reference_header}<br>{reference_body}<br>")
    
    footer = "<br>".join([
        f"{reaction_name}: {reaction_count}" for reaction_name, reaction_count in (message_data["reactions"] or {}).items()
    ]) + ("<br>Edited" if message_data["is_edited"] else "")
    
    return f"<div>{header}{body}{footer}</div>".strip()


def save_output(output, output_path, formats):
    """Save the output to specified formats."""
    for fmt in formats:
        final_output_path = output_path.with_suffix(fmt)
        try:
            with open(final_output_path, 'w', encoding='utf-8', errors='ignore') as f:
                f.write(output)
        except Exception as e:
            print(f"Encountered error while trying to write: {final_output_path}")
            raise e


def main():
    chat_messages, config = fetch_data()
    
    quoted = True
    recent_first = False
    cst_timezone = ZoneInfo("America/Chicago")
    
    notes_path = Path(config.get("notes_path", "C:/temp"))
    output_path = notes_path / "teams_chats/prettychat-output"
    formats = [".md", ".html"]
    
    output = []
    last_day = None
    
    for chat_message in chat_messages:
        message_data = process_message(chat_message, cst_timezone)
        
        if quoted:
            formatted_message = "\n".join([f">{line}" for line in format_markdown(message_data).splitlines()])
        else:
            formatted_message = format_markdown(message_data)
        
        output.append(formatted_message)
    
    if recent_first:
        output.reverse()
    
    seperator = f"\n\n--\n\n"
    final_output_markdown = seperator.join(output)
    
    # Generate HTML output
    output_html = []
    for chat_message in chat_messages:
        message_data = process_message(chat_message, cst_timezone)
        output_html.append(format_html(message_data))
    
    final_output_html = "<hr>".join(output_html)
    
    save_output(final_output_markdown, output_path, [".md"])
    save_output(final_output_html, output_path, [".html"])
    
    open_explorer(str(output_path.parent))


if __name__ == "__main__":
    main()
