from pop_up_windows import custom_popup_input, file_folder_picker
from branutils import load_config
from pathlib import Path
import json
config = load_config()
notes_path = Path(config["notes_path"])
icm_path = notes_path / "icm"
if not icm_path.exists():
    icm_path.mkdir(exist_ok=True, parents=True)

icm_questions = [
            {
                "attribute": "case_number",
                "label": "Enter Case Number:",
                "type": str
            },
            {
                "attribute": "title",
                "label": "Enter IcM title:",
                "type": str
            },
            {
                "attribute": "affected_tenants",
                "label": "Affected Tenants:",
                "type": str
            },
            {
                "attribute": "description",
                "label": "Detailed description of Issue / Problem:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "impact",
                "label": "Enter the business impact:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "troubleshooting",
                "label": "Enter troubleshooting steps that have already been taken:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "workarounds",
                "label": "Enter attempted workarounds:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "questions",
                "label": "List of questions you have for the Product Group (PG):",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "similar_bugs",
                "label": "Enter any known similar bugs:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "additional_info",
                "label": "Enter any additional info that may help PG:",
                "type": str,
                "kwargs": {"multiline": True}
            },

            {
                "attribute": "repro_steps",
                "label": "Enter steps to reproduce the issue:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "repro_results",
                "label": "Enter results of repro attempt:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "expected_results",
                "label": "Enter the expected results (what the customer expects to happen, instead of what did happen):",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "repro_frequency",
                "label": "How often does it repro?:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "in_house_repro_available",
                "label": "In-house repro available?:",
                "type": bool
            },
            {
                "attribute": "in_house_repro_results",
                "label": "If Yes - Can you share or Demo the in-house repro?:",
                "type": str,
                "kwargs": {"multiline": True}
            },
            {
                "attribute": "build_number",
                "label": "Build Number:",
                "type": str,
                "kwargs": {"multiline": True}
            }
        ]
document_sections_by_key =  [
    [
        "case_number"
    ],
    [
        "title"
    ],
    [
        "affected_tenants",
        "description",
        "impact",
        "troubleshooting",
        "workarounds",
        "questions",
        "similar_bugs",
        "additional_info"
    ],
    [
        "repro_steps",
        "repro_results",
        "expected_results",
        "repro_frequency",
        "in_house_repro_available",
        "in_house_repro_results"
    ],
    [
        "build_number"
    ]
]
result_label_map = [
    {"label":"Case Number:", "key": "case_number"},
    {"label":"Title:", "key": "title"},
    {"label":"Affected Tenants:", "key": "affected_tenants"},
    {"label":"Issue /Problem Description:", "key": "description"},
    {"label":"Business Impact:", "key": "impact"},
    {"label":"Troubleshooting:", "key": "troubleshooting"},
    {"label":"Workarounds:", "key": "workarounds"},
    {"label":"List of questions:", "key": "questions"},
    {"label":"Similar bugs:", "key": "similar_bugs"},
    {"label":"Additional Information:", "key": "additional_info"},
    {"label":"Repro Steps:", "key": "repro_steps"},
    {"label":"Repro Results:", "key": "repro_results"},
    {"label":"Expected Results:", "key": "expected_results"},
    {"label":"How often does it repro?:", "key": "repro_frequency"},
    {"label":"In-house repro available?:", "key": "in_house_repro_available"},
    {"label":"If Yes - Can you share or Demo the in-house repro?:", "key": "in_house_repro_results"},
    {"label":"Build Number:", "key": "build_number"}
]
multiline_handling = [
    "repro_steps",
    "repro_results",
    "expected_results"
]

character_limits = [
    {'sections': ["case_number"],'limit': 150},
    {'sections': ["title"], 'limit': 150},
    {'sections': [
            "affected_tenants",
            "description",
            "impact",
            "troubleshooting",
            "workarounds",
            "questions",
            "similar_bugs",
            "additional_info"
        ],'limits': 4000},
    {'sections': [
            "repro_steps",
            "repro_results",
            "expected_results",
            "repro_frequency",
            "in_house_repro_available",
            "in_house_repro_results",
            "build_number"
        ], 'limits': 4000}
]

if __name__ == "__main__":
    # result = {"tenant_id": "", "domain": "value2"}
    import_path = file_folder_picker(
        title = "Select existing IcM JSON if continuing, else cancel.",
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
        for question in icm_questions:
            attribute = question.get('attribute')
            default_value = json_import.get(attribute)
            if default_value is not None:
                question['value'] = default_value
    result, _ = custom_popup_input("IcM Template Info", "Please enter details you already have:", icm_questions)

    check_empty = lambda x: None if x == "" else x
    def get_setting(attribute):
        found = [setting for setting in icm_questions if setting.get("attribute") == attribute]
        if len(found) > 1:
            raise KeyError("Settings should not have keys with identical attribute values.")
        elif len(found) == 1:
            return found[0]
        elif len(found) == 0:
            return None
    sanitized = {key: check_empty(value) for key, value in result.items()}

    data = {key: value for key, value in sanitized.items() if value is not None}
    for key in multiline_handling:
        value = data.get(key)
        if value is not None and type(value) == str:
            split_value = value.split('\n')
            if len(split_value) > 1:
                if split_value[0] != '':
                    split_value = ['', *split_value]
            data[key] = "\n".join(split_value)

    missing_data = {key: value for key, value in sanitized.items() if value is None}

    settings_keys = {key: get_setting(key) for key in sanitized.keys()}
    settings_keys = {key:value for key, value in settings_keys.items() if value is not None}

    settings_found_keys = {key: settings_keys.get(key) for key in data.keys()}
    settings_missing_keys = {key: settings_keys.get(key) for key in missing_data.keys()}

    json_output_dict = {key: value for key, value in sanitized.items()}
    json_output = json.dumps(json_output_dict, indent=4, sort_keys=False)

    output_texts_dict = {element.get("key"): "{label} {value}".format(label=element.get("label"),value=data.get(element.get("key"))) for element in result_label_map}

    output_texts_list = ["\n\n".join([output_texts_dict.get(key) for key in key_list]) for key_list in document_sections_by_key]
    text_output = "\n\n==========================================\n\n".join(output_texts_list)
    text_output.replace("\n", "\r\n")
    
    print(text_output)
    case_number = data.get("case_number")
    if case_number is not None:
        case_notes_path = notes_path / case_number
        if not case_notes_path.exists():
            case_notes_path.mkdir(exist_ok=True, parents=False)
        case_notes_icm_path = case_notes_path / "icm"
        if not case_notes_icm_path.exists():
            case_notes_icm_path.mkdir(exist_ok=True, parents=False)
        initialExportDir = case_notes_icm_path
    else:
        initialExportDir = import_path.parent if import_path is not None else notes_path
    save_path = file_folder_picker(
        title = "Save IcM text and JSON, will save with defaults if nothing saved.",
        mode = "file",
        action = "save",
        file_types = [("All files", "*.*")],
        initial_dir = initialExportDir,
        default_extension = ""
    )

    output_path = icm_path / "icm_template_output" if save_path is None else Path(save_path).with_suffix('')
    output_formats = [(".txt", text_output), (".json", json_output)]
    for format, data in output_formats:
        with open(str(output_path.with_suffix(format)), 'w', encoding='utf-8', errors='ignore') as f:
            f.write(data)
            
    