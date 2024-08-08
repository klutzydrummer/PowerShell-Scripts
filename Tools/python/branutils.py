import os
import subprocess
from pathlib import Path
import json

def load_config() -> dict:
    script_directory = Path(__file__).parent.resolve()
    config_file = script_directory.parent / "config/my_data.json"
    example_file = script_directory.parent / "config/my_data.example.json"
    if not config_file.exists():
        raise(FileNotFoundError("Missing config file: {config_file}\nUse example found at {example_file}".format(config_file=str(config_file), example_file=str(example_file))))
    with open(config_file, 'r', encoding="utf-8", errors="ignore") as f:
        json_data = f.read()
    config = json.loads(json_data)
    return config

def open_explorer(path):
    # Normalize the path to ensure it uses backslashes
    normalized_path = os.path.normpath(path)
    
    # Check if the path exists
    if not os.path.exists(normalized_path):
        raise FileNotFoundError(f"The path '{normalized_path}' does not exist.")
    
    # Open Windows Explorer to the specified path
    subprocess.run(['explorer', normalized_path])

# Example usage
# open_explorer(r"C:\Users\YourUsername\Documents")