import json
from pathlib import Path
from collections import deque
from datetime import datetime
from zoneinfo import ZoneInfo

quoted = True
recent_first = False
output_path = r"C:\Users\v-brhouser\Downloads\prettychat-markdown"
formats = [".md", ".txt"]
json_string = r"C:\Users\v-brhouser\Downloads\teamschat.json"
linefeed = "\n"
try:
    json_path = Path(json_string)
    json_path.exists()
    
except:
    json_path = None
    
# Load the JSON content
if json_path is not None:
    with open(json_path, 'r') as f:
        json_string = f.read()
    chat_messages = json.loads(json_string)
elif isinstance(json_string, str):
    chat_messages = json.loads(json_string)
elif isinstance(json_string, list):
    chat_messages = json_string
else:
    raise ValueError(f"Unexpected type for json_string, not str or list. Found type: {type(json_string)}")

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

def process_message(message: dict, header=True, footer=True) -> str:
    if type(message) is not dict:
        raise ValueError(f"Unexpected type for message, not dict. Found type: {type(message)}")
    time = message.get("time", None)
    author = message.get("author", None)
    message_body = message.get("message", None)
    referencedMessage = message.get("referencedMessage", None)
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
    if referencedMessage is not None:
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
        reference_body = referenceBody
        output_body += "\n" + reference_header + "\n"
        output_body += referenceBody + "\n" + "\n"
    if message_body is not None:
        message_body = clean_leading_newlines(message_body)
        message_body = clean_trailing_newlines(message_body)
        message_body_lines = message_body.split("\n")
        message_body = "\n".join([f"{line}  " for line in message_body_lines])
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
#seperator = f"{linefeed}{linefeed}---{linefeed}{linefeed}"
seperator = f"{linefeed}{linefeed}"
final_output = seperator.join(output)
# print(final_output)
for format in formats:
    final_output_path = Path(output_path+format)
    print(final_output_path)
    with open(final_output_path, 'w') as f:
        f.write(final_output)