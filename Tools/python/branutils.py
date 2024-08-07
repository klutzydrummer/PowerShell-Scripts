import os
import subprocess

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