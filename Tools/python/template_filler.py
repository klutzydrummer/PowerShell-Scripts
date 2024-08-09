import jinja2
import jinja2.meta
from branutils import load_config
from pathlib import Path
from datetime import datetime, timedelta
import re

config = load_config()
my_name = config.get("my_name")
my_team = config.get("my_team")
template = "case_closure.md"

template_base_path = config.get("email_templates_path")
template_base_path = Path(template_base_path)
template_path = template_base_path / template

with open(template_path, 'r', encoding='utf-8', errors='ignore') as f:
    template_source = f.read()

# Create the Jinja environment
env = jinja2.Environment()
template = env.parse(template_source)
fields = jinja2.meta.find_undeclared_variables(template)

typedefs = {
    "string": str,
    "int": int,
    "float": float,
    "datetime": datetime,
    "timedelta": timedelta
}

def get_var_types(in_string: str) -> str:
    search = type_finder.findall(in_string)
    type_string = search[0] if len(search) != 0 else "string"
    return typedefs.get(type_string)

type_finder = re.compile(r"_([^_]+)$")
print(fields)
fields_and_types = [(field, get_var_types(field)) for field in list(fields)]
print(fields_and_types)