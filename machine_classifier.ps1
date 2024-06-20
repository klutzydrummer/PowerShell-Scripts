<#
.Description
Check-TeamsInstalled checks if the new Teams app is installed.
#>
function Check-TeamsInstalled {
    return Test-Path -Path "$env:LOCALAPPDATA\Packages\MSTeams_8wekyb3d8bbwe"
}

<#
.Description
Check-TeamsStartMenu checks if the Teams app appears in the start menu.
#>
function Check-TeamsStartMenu {
    return $(Get-StartApps).Name -contains "Microsoft Teams";
}

<#
.Description
Classify-Machine returns an object that contains the machine classification. 
#>
function Classify-Machine {
    param (
        [string] $Label
    )
    return New-Object -TypeName PSObject -Property @{
        "Label" = $Label
    }
}

<#
.Description
Dispatch-MachineInfo starts background jobs to gather diagnotisc information, for later retrieval and analysis.
#>
function Dispatch-MachineInfo {
    $MachineInfoScriptblock = {return systeminfo /fo CSV | ConvertFrom-Csv}
    
    $ApplicationLogsScriptblock = {return Get-EventLog -LogName Application -EntryType Error -Newest 20 -Message *Teams*}
    
    $SystemLogsScriptblock = {return Get-EventLog -LogName Application -EntryType Error -Newest 20 -Message *Teams*}
    
    Start-Job -ScriptBlock $MachineInfoScriptblock -Name MachineInfoScriptblock
    Start-Job -ScriptBlock $ApplicationLogsScriptblock -Name ApplicationLogsScriptblock
    Start-Job -ScriptBlock $SystemLogsScriptblock -Name SystemLogsScriptblock
}

<#
.Description
Get-MachineInfo returns the results of the background jobs that are gathering machine information. 
#>
function Get-MachineInfo {
    $MachineInfo = Receive-Job -Name MachineInfoScriptblock -Wait
    $ApplicationLogs = Receive-Job -Name ApplicationLogsScriptblock -Wait
    $SystemLogs = Receive-Job -Name SystemLogsScriptblock -Wait
    $GatheredData = New-Object -TypeName PSObject -Property @{
        "MachineInfo" = $MachineInfo
        "ApplicationLogs" = $ApplicationLogs
        "SystemLogs" = $SystemLogs
    }
    return $GatheredData
}

<#
.Description
Wrapper that allows running the teamsbootstrapper.exe executable and grabbing the exit code
#>
function RunExecutableAndGetErrorCode($executablePath) {
    if (!(Test-Path -Path $executablePath)) {
        Throw "Executable path not valid: $executablePath"
    }
    $WorkingDirectory = Split-Path -Path $executablePath
    $FileName = (Get-Item $executablePath).Name
    Write-Host $WorkingDirectory
    Write-Host $FileName
    $proc = [System.Diagnostics.Process]@{
        StartInfo = [System.Diagnostics.ProcessStartInfo]@{  
            RedirectStandardError  = $False # $True  
            RedirectStandardOutput = $False # $True  
            UseShellExecute        = $True  
            WorkingDirectory       = $WorkingDirectory  
            FileName               = $FileName
            Arguments              = ''
            WindowStyle            = 'Hidden'  
        } 
    }
    
    try {
        $proc.Start() | Out-Default
        $proc.WaitForExit()
        $ExitCode = $proc.ExitCode
    }
    catch {
        $ExitCode = 0xFFFFFFFF
    }
    finally {
        $ExitCode_str = "0x$([System.Convert]::ToString($ExitCode, 16))"
    }
    switch ($ExitCode) {
        0x00000000 {$ExitName = "S_OK"; $ExitDescription = "Operation successful"}
        0x80004001 {$ExitName = "E_NOTIMPL"; $ExitDescription = "Not implemented"}
        0x80004002 {$ExitName = "E_NOINTERFACE"; $ExitDescription = "No such interface supported"}
        0x80004003 {$ExitName = "E_POINTER"; $ExitDescription = "Pointer that is not valid"}
        0x80004004 {$ExitName = "E_ABORT"; $ExitDescription = "Operation aborted"}
        0x80004005 {$ExitName = "E_FAIL"; $ExitDescription = "Unspecified failure"}
        0x8000FFFF {$ExitName = "E_UNEXPECTED"; $ExitDescription = "Unexpected failure"}
        0x80070005 {$ExitName = "E_ACCESSDENIED"; $ExitDescription = "General access denied error"}
        0x80070006 {$ExitName = "E_HANDLE"; $ExitDescription = "Handle that is not valid"}
        0x8007000E {$ExitName = "E_OUTOFMEMORY"; $ExitDescription = "Failed to allocate necessary memory"}
        0x80070057 {$ExitName = "E_INVALIDARG"; $ExitDescription = "One or more arguments are not valid"}
        0xFFFFFFFF {$ExitName = "SCRIPT_ERROR"; $ExitDescription = "Executable was not run, can be due to failed UAC prompt, failed elevation attempt, or incorrect permissions for PowerShell or Powershell script."}
        default {$ExitName = "Code name not found"; $ExitDescription = "Code description not found."}
    }
    # Write-Output "Exit Code: $ExitCode_str`nCode Name: $ExitName`nCode Description: $ExitDescription"
    return $ExitCode, $ExitName, $ExitDescription
}

<#
.Description

#>
function Uninstall-NewTeams {
}

<#
.Description
Awaits the background Teams Bootstrap installer download job and then installs Teams when the installer has finished downloading.
#>
function Install-NewTeams {
    # Output the result
    $bootstrapper = Receive-Job -Name download_teams -Wait
    remove-job -Name download_teams
    if (!(Test-Path -Path $bootstrapper.FullName)) {
        Throw "Teams Bootstrapper did not download."
    }
    $ExitCode, $ExitName, $ExitDescription = RunExecutableAndGetErrorCode -executablePath $bootstrapper.FullName
    $InstallationResults = New-Object -TypeName PSObject -Property @{
        "ExitCode" = $ExitCode
        "ExitName" = $ExitName
        "ExitDescription" = $ExitDescription
    }
    
    switch ($ExitCode) {
        0x00000000 {return $True, $InstallationResults}
        Default {return $False, $InstallationResults}
    }
}

<#
.Description
Saves the PowerShell object as a json string to a file or registry key. 
#>
function Save-OperationResults {
    param (
        [PSCustomObject] $OperationResults,
        [string] $Path,
        [string] $Name,
        [switch] $Registry = $False
    )
    $OutputValue = $OperationResults | ConvertTo-Json -Depth 25
    if ($registry) {
        $keyExists = Test-Path -Path $Path;
        if ($keyExists) {
            $key = Get-Item -Path $Path -Force
        } else {
            $key = New-Item -Path $Path -Force
        }
        Set-ItemProperty -Path $key.PSPath -Name $Name -Value $OutputValue -Force;
    } else {
        $OutputValue | Out-File -FilePath $(Join-Path -Path $Path -ChildPath $Name);
    }
}

# $Registry = $False
$Registry = $True
$caseNumber = "0000000000000000"

# Define the download code
$downloadFile = {
    param($url, $destinationPath)

    # Use WebClient to download the file
    $webClient = New-Object System.Net.WebClient
    $webClient.DownloadFile($url, $destinationPath)

    # Get the item details of the downloaded file
    $item = Get-Item -Path $destinationPath

    # Return the item details
    return $item
}

# Start downloading the Teams Installer
Start-Job -ScriptBlock $downloadFile -ArgumentList "https://go.microsoft.com/fwlink/?linkid=2243204&clcid=0x409", $(Join-Path -Path $env:Temp -ChildPath "teamsbootstrapper.exe") -Name download_teams
Dispatch-MachineInfo

$ParentFolder = "MicrosoftSupport"

$classificationName = "case_$($caseNumber)_label"
$infoName = "case_$($caseNumber)_info"
$UninstallationResultsName = "UninstallationResults"
$InstallationResultsName = "InstallationResults"
$GatheredDataName = "MachineData"
$CompletionFlagName = "ClassificationComplete"

if ($Registry) {
    $RegRoot = "HKLM:\Software\"
    $DataStorage = Join-Path -Path $RegRoot -ChildPath $ParentFolder
    if (!(Test-Path -Path $DataStorage)) {
        New-Item -Path $RegRoot -Name $ParentFolder –Force
    }
    $classificationPath = $DataStorage
    $infoPath = $DataStorage
    $InstallationResultsPath = $DataStorage
    $UninstallationResultsPath = $DataStorage
    $GatheredDataPath = $DataStorage
    $CompletionFlagPath = $DataStorage
} else {
    $DataStorage = Join-Path -Path $env:APPDATA -ChildPath $ParentFolder
    if (!(Test-Path -Path $DataStorage)) {
        New-Item -Path $DataStorage -ItemType Directory
    }
    $classificationPath = $DataStorage
    $classificationName = "$classificationName.json"
    
    $infoPath = $DataStorage
    $infoName = "$infoName.json"

    $UninstallationResultsPath = $DataStorage
    $UninstallationResultsName = "$UninstallationResultsName.json"

    $InstallationResultsPath = $DataStorage
    $InstallationResultsName = "$InstallationResultsName.json"

    $GatheredDataPath = $DataStorage
    $GatheredDataName = "$GatheredDataName.json"

    $CompletionFlagPath = $DataStorage
    $CompletionFlagName = "$CompletionFlagName.json"
}

$isTeamsInstalled = Check-TeamsInstalled
$isTeamsAccessible = Check-TeamsStartMenu
if (($isTeamsInstalled -eq $True) -and  ($isTeamsAccessible -eq $True)) {
    Classify-Machine -Path $classificationPath -Name "case_$($caseNumber)_label" -label 'Unaffected.working' -Registry $Registry
    $GatheredData = Get-MachineInfo
    Save-OperationResults -OperationResults $GatheredData -Path $GatheredDataPath -Name $GatheredDataName -Registry $Registry
}
if (($isTeamsInstalled -eq $True) -and ($isTeamsAccessible -eq $False)) {
    $uninstallSuccess, $UninstallationResults = Uninstall-NewTeams
    Save-OperationResults -OperationResults $UninstallationResults -Path $UninstallationResultsPath -Name $UninstallationResultsName -Registry $Registry
    $GatheredData = Get-MachineInfo
    Save-OperationResults -OperationResults $GatheredData -Path $GatheredDataPath -Name $GatheredDataName -Registry $Registry
    if ($uninstallSuccess -eq $True) {
        $installSuccess, $InstallationResults = Install-NewTeams
        Save-OperationResults -OperationResults $InstallationResults -Path $InstallationResultsPath -Name $InstallationResultsName -Registry $Registry
    }
    else {
        $Classification = Classify-Machine -label 'Affected.Scenario_1.not_working.removal_failure'
        Save-OperationResults -OperationResults $Classification -Path $classificationPath -Name $classificationName -Registry $Registry
        $installSuccess = $False
    }
    if ($installSuccess -eq $True) {
        $Classification = Classify-Machine -label 'Affected.Scenario_1.working'
        Save-OperationResults -OperationResults $Classification -Path $classificationPath -Name $classificationName -Registry $Registry
    }
    else {
        $Classification = Classify-Machine -label 'Affected.Scenario_1.not_working.install_failure'
        Save-OperationResults -OperationResults $Classification -Path $classificationPath -Name $classificationName -Registry $Registry
    }
}
if (($isTeamsInstalled -eq $False) -and ($isTeamsAccessible -eq $False)) {
    $installSuccess, $InstallationResults = Install-NewTeams
    Save-OperationResults -OperationResults $InstallationResults -Path $InstallationResultsPath -Name $InstallationResultsName -Registry $Registry
    $GatheredData = Get-MachineInfo
    Save-OperationResults -OperationResults $GatheredData -Path $GatheredDataPath -Name $GatheredDataName -Registry $Registry
    if ($installSuccess -eq $True) {
        $Classification = Classify-Machine -label 'Affected.Scenario_2.working'
        Save-OperationResults -OperationResults $Classification -Path $classificationPath -Name $classificationName -Registry $Registry
    }
    else {
        $Classification = Classify-Machine -label 'Affected.Scenario_2.not_working.install_failure'
        Save-OperationResults -OperationResults $Classification -Path $classificationPath -Name $classificationName -Registry $Registry
    }
}
$CompletionFlag = New-Object -TypeName PSObject -Property @{"CompletedClassification" = $True}
Save-OperationResults -OperationResults $CompletionFlag -Path $CompletionFlagPath -Name $CompletionFlagName -Registry $Registry

