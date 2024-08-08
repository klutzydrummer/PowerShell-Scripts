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

    with open(json_path, 'r', encoding='utf-8-sig') as f:
        content = f.read()
        print(content)
        data = json.loads(content)

    side_by_side = [data[key] for key in data.keys()]
    for user in side_by_side:
        # user.pop('AssignedPlans', None)
        # user.pop('ProvisionedPlans', None)
        # user.pop('ProxyAddresses', None)
        # user.pop('ProvisioningErrors', None)
        # user.pop('StreetAddress', None)
        # user.pop('OtherMails', None)
        # user.pop('AssignedLicenses', None)
        user.get('ExtensionProperty', {'createdDateTime': None}).pop('createdDateTime', None)
        for plan in user.get('AssignedPlans', []):
            plan.pop('AssignedTimestamp', None)
        # for plan in user.get('ProvisionedPlans', []):
        #     plan.pop('ProvisioningStatus', None)

    diff = DeepDiff(side_by_side[0], side_by_side[1], ignore_order=True)
    pprint.pprint(diff)