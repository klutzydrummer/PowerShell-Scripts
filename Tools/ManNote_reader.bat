@echo off
setlocal

set PowerShellScript=C:\Users\v-brhouser\OneDrive - Microsoft\Tools\src\ManNote_reader.ps1

:: Run the PowerShell script with hidden window style
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "%PowerShellScript%"

endlocal
