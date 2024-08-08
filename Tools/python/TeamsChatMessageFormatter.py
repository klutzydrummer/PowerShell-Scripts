import json
from pathlib import Path
from collections import deque
from datetime import datetime
from zoneinfo import ZoneInfo
from branutils import open_explorer, load_config
from pop_up_windows import popup_with_copy, custom_popup_input
import pathlib
script_directory = Path(__file__).parent.resolve()


if __name__ == "__main__":
    config = load_config()
    TeamsChatMessageExtractor_js_path = Path(script_directory.parent / "javascript/TeamsChatMessageExtractor.js")
    with open(TeamsChatMessageExtractor_js_path, 'r', encoding="utf-8", errors="ignore") as f:
        TeamsChatMessageExtractor_js = f.read()
    js_copy_message = "Click 'Copy' to copy the required JavaScript.\nOpen up the Teams Chat thread you want to copy.\nHit F12 to open the developer console. (Must be enabled)\nPaste into the console and hit enter.\nThe chat messages should be copied to your clipboard in JSON format.\nClose this window to proceed to the next step, where that JSON will be used."
    js_copy_message = "\n".join([f"{i+1}. {line}" for i, line in enumerate(js_copy_message.split("\n"))])
    js_copied = popup_with_copy(title="Copy TeamsChatMessageExtractor.js to clipboard.", message=js_copy_message, copy_data=TeamsChatMessageExtractor_js)
    if js_copied is not True:
        exit()
    result, confirmed = custom_popup_input(title="Enter JSON from Teams", message="Enter the JSON that was gathered from the last step.", fields={"TeamsJSON": "Paste JSON here:"})
    if confirmed is not True:
        exit()
    json_string = result.get("TeamsJSON").encode(encoding="utf-8", errors="ignore")
    chat_messages = json.loads(json_string)
    quoted = True
    recent_first = False
    notes_path = Path(config.get("notes_path", "C:/temp"))
    output_path = notes_path / "teams_chats/prettychat-markdown"
    formats = [".md", ".txt"]

    def clean_trailing_newlines(in_string: str) -> str:
        in_string = in_string.replace("\r\n", "\n")
        in_string_lines = in_string.split("\n")
        counted_trailing_whitespace = 0
        for line in reversed(in_string_lines):
            if line == "":
                counted_trailing_whitespace += 1
            if line != "":
                break
        for i in range(counted_trailing_whitespace):
            in_string_lines.pop()
        return "\n".join(in_string_lines)

    def clean_leading_newlines(in_string: str) -> str:
        in_string = in_string.replace("\r\n", "\n")
        in_string_lines = deque(in_string.split("\n"))
        counted_trailing_whitespace = 0
        for line in in_string_lines:
            if line == "":
                counted_trailing_whitespace += 1
            if line != "":
                break
        for i in range(counted_trailing_whitespace):
            in_string_lines.popleft()
        return "\n".join(in_string_lines)

    def convert_utc_to_tz(in_datetime: datetime, tz: ZoneInfo) -> datetime:
        utc_datetime = in_datetime.replace(tzinfo=ZoneInfo("UTC"))
        converted = utc_datetime.astimezone(tz)
        return converted

    def replace_references(input_string, reference_list):
        for reference in reference_list:
            input_string = input_string.replace('<REFERENCE>', reference, 1)
        return input_string

    def process_message(message: dict, header=True, footer=True) -> str:
        if type(message) is not dict:
            raise ValueError(f"Unexpected type for message, not dict. Found type: {type(message)}")
        time = message.get("time", None)
        author = message.get("author", None)
        message_body = message.get("message", None)
        referencedMessages = message.get("referencedMessages", None)
        reactions = message.get("reactions", None)
        isEdited = message.get("isEdited", None)
        output_header = ""
        output_body = ""
        output_footer = ""
        output = ""
        cst_timezone = ZoneInfo("America/Chicago")
        if author is not None and time is not None:
            parsed_datetime = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S.%fZ")
            cst_datetime = convert_utc_to_tz(parsed_datetime, cst_timezone)
            time = cst_datetime.strftime("%m/%d/%Y %I:%M %p")
            output_header += f"{author} - {time}  "
        elif author is not None and time is None:
            output_header += f"{author}  "
        if referencedMessages is not None:
            reference_list = []
            for referencedMessage in referencedMessages:
                reference_string = ""
                referenceAuthor = referencedMessage.get("referenceAuthor", {"referenceAuthor": None})
                referenceTime = referencedMessage.get("referenceTime", {"referenceTime": None})
                referenceBody = referencedMessage.get("referenceBody", {"referenceBody": None})
                if message_body is not None:
                    message_body_lines = message_body.split("\n")
                    message_body_lines = [line for line in message_body_lines if line not in referencedMessage.values()]
                    message_body = "\n".join(message_body_lines)
                referenceBody = referenceBody.replace("\r", "")
                referenceBody = clean_leading_newlines(referenceBody)
                referenceBody = clean_trailing_newlines(referenceBody)
                referenceBody = "\n".join([f">{line}  " for line in referenceBody.replace("\r\n", "\n").split("\n")])
                if referenceTime is not None:
                    parsed_datetime = datetime.strptime(referenceTime, "%m/%d/%Y %I:%M %p")
                    cst_datetime = convert_utc_to_tz(parsed_datetime, cst_timezone)
                    referenceTime = cst_datetime.strftime("%m/%d/%Y %I:%M %p")
                reference_header = f">{referenceAuthor} - {referenceTime}  "
                reference_string += "\n" + reference_header + "\n"
                reference_string += referenceBody + "\n" + "\n"
                reference_list.append(reference_string)
        if message_body is not None:
            message_body = clean_leading_newlines(message_body)
            message_body = clean_trailing_newlines(message_body)
            message_body_lines = message_body.split("\n")
            message_body = "\n".join([f"{line}  " for line in message_body_lines])
            if referencedMessages is not None:
                message_body = replace_references(message_body, reference_list)
            output_body += message_body
        if reactions is not None:
            reactions = ", ".join([f"{reaction_name}: {reaction_count}" for reaction_name, reaction_count in reactions.items()]) + "  "
            output_footer += "\n" + reactions
        if isEdited is not None and isEdited is True:
            output_footer += "\nEdited"
        if header:
            output += output_header + "\n"
        output += output_body
        if footer is True and output_footer != "":
            output += "\n" + output_footer
        return output.replace("\r\n", "\n")

    output = []
    cst_timezone = ZoneInfo("America/Chicago")
    last_day = None
    for chat_message in chat_messages:
        new_day = False
        time = chat_message.get("time", None)
        if time is not None:
            parsed_datetime = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S.%fZ")
            time = convert_utc_to_tz(parsed_datetime, cst_timezone)
            if last_day is None:
                last_day = time.day
            else:
                if last_day != time.day:
                    new_day = True
                    last_day = time.day
            if new_day:
                seperator_time = time.strftime("%m/%d/%Y")
                new_day_seperator = f"{seperator_time}"
                output.append(new_day_seperator)
        converted = process_message(chat_message)
        if quoted:
            converted_lines = converted.split("\n")
            converted = "\n".join([f">{line}" for line in converted_lines])
        output.append(converted)
    if recent_first:
        output = reversed(output)
    
    seperator = f"\n\n--\n\n"
    final_output = seperator.join(output)
    
    for format in formats:
        final_output_path = Path(output_path+format)
        print(final_output_path)
        try:
            with open(final_output_path, 'w', encoding='utf-8', errors='ignore') as f:
                f.write(final_output)
        except Exception as e:
            print("Encountered error while trying to write: {file}".format(file=final_output_path))
            raise(e)
            
    open_explorer(str(Path(output_path).parent))