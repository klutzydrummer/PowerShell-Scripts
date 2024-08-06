from pathlib import Path
import re
import json
from deepdiff import DeepDiff
import pprint

notes_path = Path(r"C:\Users\v-brhouser\OneDrive - Microsoft\Notes")
case = "2403180040012580"
case_path = notes_path / case
data_name_pattern = "external_.+?__internal_.+?__\d{14}"
def crawl_dir_tree_for_json(pattern: str, path: Path, extension: str):
    for file_or_folder in path.iterdir():
        # print(file_or_folder.name)
        name_match = len(re.findall(pattern=pattern, string=file_or_folder.name)) > 0
        # print(f"Name match found: {name_match}")
        if file_or_folder.is_dir():
            result = crawl_dir_tree_for_json(pattern, file_or_folder, extension)
            if result:
                file_or_folder = result
        if file_or_folder.is_file():
            if (file_or_folder.suffix == extension) and name_match:
                return file_or_folder
json_path = crawl_dir_tree_for_json(data_name_pattern, case_path, ".json")

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