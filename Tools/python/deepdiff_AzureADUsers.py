from pathlib import Path
import re
import json
from deepdiff import DeepDiff
import pprint
from branutils import load_config
from pop_up_windows import file_folder_picker

if __name__ == "__main__":
    config = load_config()
    notes_path = Path(config.get("notes_path"))
    json_path = file_folder_picker(
        title="Pick JSON file.",
        mode="file",
        action="open",
        file_types=[("JSON Files", "*.json"), ("All files", "*.*")],
        initial_dir=notes_path
    )

    with open(json_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        # print(content)
    data = json.loads(content)

    output = []
    for key, cmd_output in data.items():
        TargetUserExternal = cmd_output.get('TargetUserExternal')
        TargetUserInternal = cmd_output.get('TargetUserInternal')
        diff = json.loads(DeepDiff(TargetUserExternal, TargetUserInternal, ignore_order=True).to_json().replace('old_','external_user_').replace('new_','internal_user_'))
        output.append([key, diff])
    pprint.pprint(output)
    
    for (key, data) in output:
        with open(r"C:\Users\v-brhouser\OneDrive - Microsoft\Notes\2403180040012580\info_gather_2\external_sheila.ayala__internal_doug.powelson\json_file_diff_{key}.json".format(key=key), 'w', encoding='utf-8', errors='ignore') as f:
            f.write(json.dumps(data, indent=4))