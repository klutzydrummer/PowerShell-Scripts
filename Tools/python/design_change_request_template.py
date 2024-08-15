from pop_up_windows import custom_popup_input, file_folder_picker
from branutils import load_config
from pathlib import Path
import json
config = load_config()
notes_path = Path(config["notes_path"])
dcr_path = notes_path / "dcr"
if not dcr_path.exists():
    dcr_path.mkdir(exist_ok=True, parents=True)

dcr_questions = [
            {
                "attribute": "tenant_id",
                "label": "Enter Tenant ID:",
                "type": str
            },
            {
                "attribute": "domain",
                "label": "Enter Tenant Domain Name:",
                "type": str
            },
            {
                "attribute": "ismultitenant",
                "label": "Dedicated or Multi-Tenant?:",
                "type": str
            },
            {
                "attribute": "description",
                "label": "Detailed description of change request.\nDescribe the scenario, environment, business drivers for the outcome the customer is trying to achieve.\nInclude details on troubleshooting performed to validate the request.\nIt is not sufficient to refer to a case, ICM, or old bug number (but please do include these as references), the summary technical analysis must be included in the DCR.\nFor longer analyses with logging examples (highly recommended) it is best to include this as an attachment.\nIn some cases we get DCRs for things that already exist in the product, or that can be achieved via a different method or configuration.",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "bis",
                "label": "Business impact statement (BIS)- Work with the CSAM and/or customer to obtain this data:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "impact",
                "label": "Financial impact - Try to explain as accurately as possible the impact in actual dollars to the customer if the request is not approved. Give examples. Where estimations are made, call them out and try not to over or understate.",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "affected_users",
                "label": "Number of users impacted - Include those directly impacted, and Mention users that may be indirectly impacted. Example: The behavior may touch a single user but the nature of the behavior causes that user’s contacts to be impacted;",
                "type": str
            },
            {
                "attribute": "feature_use",
                "label": "Use Case(s) - Describe specific scenario(s) in which a product feature could potentially be used.",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "isblocking",
                "label": "Is this issue a blocker? Does it prevent the customer from migrating/adopting Skype for Business? How/why?",
                "type": str
            },
            {
                "attribute": "total_users",
                "label": "Number of users total in Teams",
                "type": int
            },
            {
                "attribute": "number_team_licenses",
                "label": "The number of licensed and deployed users",
                "type": int
            },
            {
                "attribute": "investment_in_teams",
                "label": "Investment in Teams - Including licensing and services. Mention which investments will be impacted by the request",
                "type": str
            },
            {
                "attribute": "investment_in_microsoft",
                "label": "Investment is Microsoft product /service - Include licensing, services, and support contracts. Mention which investments will be impacted by the request",
                "type": str
            },
            {
                "attribute": "impacted_versions",
                "label": "Version impacted - include full client version and channel of C2R (or MSI version) – for Server – CU.",
                "type": str
            },
            {
                "attribute": "workarounds_attempted",
                "label": "Workarounds\n•	What are the possible workarounds? List all workarounds attempted – by the customer, and offered from support. You did try to offer a workaround, right?\n•	Why are workarounds not acceptable?\n•	Fill in the Repro fields in the Viewpoint form completely;",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "relevant_file_url",
                "label": "Attach any relevant files to the VSO item after submitting in Viewpoint and receiving a VSO item #.\nYou can edit the VSO item after creation, this is a good time to expand the Description field, add your detailed technical analysis, BIS statements, and logs as attachments.\nKeep in mind there are size limitations in VSO, so if you need to, include a Share or URL for files exceeding size limitations.",
                "type": str
            }
        ]

if __name__ == "__main__":
    # result = {"tenant_id": "", "domain": "value2"}
    import_path = file_folder_picker(
        title = "Select existing DCR JSON if continuing, else cancel.",
        mode = "file",
        action = "open",
        file_types = [("JSON files", "*.json"), ("All files", "*.*")],
        initial_dir = notes_path
    )
    json_import = None
    if import_path is not None:
        import_path = Path(import_path)
        if import_path.exists():
            with open(import_path, 'r', encoding='utf-8', errors='ignore') as f:
                json_import = f.read()
            json_import = json.loads(json_import)

    if json_import is not None:
        for question in dcr_questions:
            attribute = question.get('attribute')
            default_value = json_import.get(attribute)
            if default_value is not None:
                question['value'] = default_value
    result, confirmed = custom_popup_input("DCR Template Info", "Please enter details you already have:", dcr_questions)

    check_empty = lambda x: None if x == "" else x
    def get_setting(attribute):
        found = [setting for setting in dcr_questions if setting.get("attribute") == attribute]
        if len(found) > 1:
            raise KeyError("Settings should not have keys with identical attribute values.")
        elif len(found) == 1:
            return found[0]
        elif len(found) == 0:
            return None
    sanitized = {key: check_empty(value) for key, value in result.items()}

    data = {key: value for key, value in sanitized.items() if value is not None}
    missing_data = {key: value for key, value in sanitized.items() if value is None}

    settings_keys = {key: get_setting(key) for key in sanitized.keys()}
    settings_keys = {key:value for key, value in settings_keys.items() if value is not None}

    settings_found_keys = {key: settings_keys.get(key) for key in data.keys()}
    settings_missing_keys = {key: settings_keys.get(key) for key in missing_data.keys()}

    json_output_dict = {key: value for key, value in sanitized.items()}
    json_output = json.dumps(json_output_dict, indent=4, sort_keys=False)

    def get_answers(attribute: str, indent:int) -> str:
        indent_str = " " * indent
        attribute_data: str = data.get(attribute)
        if type(attribute_data) is not str:
            raise ValueError()
        return "\r\n".join([f"{indent_str}- {line}" for line in attribute_data.split("\n")])

    found_data_questions_answers_string = "\r\n".join(["{question_number}. {question}\n{answer}".format(question_number=i+1, question=value.get("label"), answer=get_answers(key, 2)) for i, (key, value) in enumerate(settings_found_keys.items())])
    missing_data_questions_string = "\r\n".join(["{question_number}. {question}".format(question_number=i+1, question=value.get("label")) for i, value in enumerate(settings_missing_keys.values())])

    text_output = f"""# Gathered Data
    {found_data_questions_answers_string}

    # Missing Data
    {missing_data_questions_string}
    """
    
    print(text_output)

    save_path = file_folder_picker(
        title = "Save DCR text and JSON, will save with defaults if nothing saved.",
        mode = "file",
        action = "save",
        file_types = [("All files", "*.*")],
        initial_dir = notes_path,
        default_extension = ""
    )
    output_path = dcr_path / "dcr_template_output" if save_path is None else Path(save_path)
    output_formats = [(".txt", text_output), (".json", json_output)]
    for format, data in output_formats:
        with open(str(output_path.with_suffix(format)), 'w', encoding='utf-8', errors='ignore') as f:
            f.write(data)