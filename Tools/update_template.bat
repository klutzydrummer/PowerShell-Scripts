@echo off
setlocal

set PowerShellScript=C:\Users\v-brhouser\OneDrive - Microsoft\Tools\src\update_template.ps1

:: Run the PowerShell script with hidden window style
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "%PowerShellScript%"

endlocal
