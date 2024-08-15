import os
from pathlib import Path
from pop_up_windows import custom_popup_input, migrate_popup_fields
from branutils import load_config, open_explorer
from datetime import datetime, timedelta


if __name__ == "__main__":
    config = load_config()
    my_name = config.get("my_name")
    my_team = config.get("my_team")
    template = "close_case_script_included.md"

    template_base_path = config.get("email_templates_path")
    template_base_path = Path(template_base_path)
    template_path = template_base_path / template

    survey_link = "https://admin.microsoft.com/adminportal/home#/support/feedback/{case_number}"
    signature_name = my_name
    signature_team = my_team

    result, confirmed = custom_popup_input(
        "Template Info",
        "Please enter your details:",
        migrate_popup_fields({
            "case_number": "Case Number:",
            "customer_name": "Customer Name:",
        })
    )

    if not confirmed:
        exit
    case_number = result.get("case_number")
    customer_name = result.get("customer_name")
    if customer_name == "":
        greeting = "Hello"
    else:
        greeting = customer_name
    
    survey_link_text = survey_link.format(case_number=case_number)
    survey_link_url = survey_link.format(case_number=case_number)
    today = datetime.now()
    reopen_cutoff_date_datetime = today + timedelta(days=30)
    reopen_cutoff_date = reopen_cutoff_date_datetime.strftime("%d/%m/%Y")
    with open(template_path, 'r', encoding="utf-8") as f:
        template_data = f.read()
    
    def custom_format(in_string: str, param_dict: dict) -> str:
        for key, value in param_dict.items():
            search_text = "{"+key+"}"
            print(search_text)
            in_string = in_string.replace(search_text, value)
        return in_string
    
    filled_template = custom_format(template_data, {
        "greeting": greeting,
        "case_number": case_number,
        "reopen_cutoff_date": reopen_cutoff_date,
        "survey_link_text": survey_link_text,
        "survey_link_url": survey_link_url,
        "signature_name": signature_name,
        "signature_team": signature_team
    })
    output_path_parent = Path(os.environ["temp"]) / case_number
    output_path_parent.mkdir(parents=True, exist_ok=True)
    output_path = output_path_parent / str(case_number + "_" + template_path.name)
    
    with open(output_path, 'w', encoding="utf-8") as f:
        f.write(filled_template)
    open_explorer(output_path_parent)