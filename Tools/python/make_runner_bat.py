from pathlib import Path
from itertools import chain

IGNORE_SCRIPTS = [
    'branutils.py',
    'deepdiff_AzureADUsers.py',
    'pop_up_windows.py'
]

if __name__ == "__main__":
    BASE_PATH = Path(__file__).parent.parent

    
    PYSCRIPT_PATH = BASE_PATH / "python"
    PSSCRIPT_PATH = BASE_PATH / "src"
    
    python_scripts = PYSCRIPT_PATH.glob("*.py")
    powershell_scripts = PSSCRIPT_PATH.glob("*.ps1")
    
    auto_ps_scripts = (
        (powershell_script, """@echo off
setlocal

set PowerShellScript={ps_path}

:: Run the PowerShell script with hidden window style
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "%PowerShellScript%"

endlocal""".format(ps_path=powershell_script))
        for powershell_script in powershell_scripts if Path(powershell_script).name not in IGNORE_SCRIPTS
    )

    auto_python_scripts = (
        (python_script, """@echo off
setlocal

set PythonScript={python_path}

:: Run the python script
start pythonw "%PythonScript%"

endlocal""".format(python_path=python_script))
        for python_script in python_scripts if Path(python_script).name not in IGNORE_SCRIPTS
    )

    auto_scripts = chain(auto_ps_scripts, auto_python_scripts)
    
    for (path, script) in auto_scripts:
        bat_runner_path = (BASE_PATH / path.stem).with_suffix(".bat")
        print(f"Processing script: {path}")
        print(f"BAT runner path: {bat_runner_path}")
        
        if not bat_runner_path.exists():
            print(f"Creating: {bat_runner_path}")
            with open(bat_runner_path, 'w', encoding='utf-8', errors='ignore') as f:
                f.write(script)
        else:
            print(f"File already exists: {bat_runner_path}")

