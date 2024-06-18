function Get-FoldersStartingWith($directory, $startsWith) {
    Get-ChildItem -Directory -Path $directory | Where-Object { $_.Name -like "$startsWith*" }
}

function Get-MatchingText($text, $regexPattern, $remove) {
    try {
        $matches = [regex]::Matches($text, "(?s)$regexPattern")
        $matchingText = $matches | ForEach-Object { $_.Value }
        if ('' -ne $remove) {
            $matchingText = $matchingText.replace($remove, '')
        }
            return $matchingText
    } catch {
        Write-Host "Error reading file or matching pattern: $_"
        return $null
    }
}

function Convert-SectionsToJSON {
    param (
        [string]$content
    )

    # Initialize an empty hashtable to store the sections
    $sections = @{}

    # Define a regex pattern to match section headers (e.g., "Network \d+:" or "Location \d+:")
    $pattern = "^(Network \d+|Location \d+):"

    # Split the content by lines
    $lines = $content -split "`n"

    # Initialize variables to track the current section
    $currentSection = $null
    $currentContent = ""

    foreach ($line in $lines) {
        if ($line -match $pattern) {
            # If there's a current section being processed, add it to the hashtable
            if ($currentSection) {
                $sections[$currentSection] = $currentContent.Trim()
            }
            # Set the new current section and reset the content
            $currentSection = $matches[1]
            $currentContent = ""
            continue
        }
        # Append the line to the current content
        $currentContent += "$line`n"
    }

    # Add the last section to the hashtable
    if ($currentSection) {
        $sections[$currentSection] = $currentContent.Trim()
    }

    # Create a new hashtable to store the parsed JSON objects
    $parsedSections = @{}

    foreach ($key in $sections.Keys) {
        $parsedSections[$key] = $sections[$key] | ConvertFrom-Json
    }

    return $parsedSections
}

$logDirectory = $False
while ($False -eq $(Test-Path -Path $logDirectory -ErrorAction SilentlyContinue)) {
  $logDirectory = Read-Host "Enter Log Collection Directory"
  if ($False -eq $(Test-Path $logDirectory)) {
    Write-Host "Enter a valid path."
  }
}

# Create an empty object
$storeData = New-Object PSObject

$TeamsLogs = Get-FoldersStartingWith -directory $logDirectory -startsWith "PROD-WebLogs"
foreach ($LogPack in $TeamsLogs) {
    $Path = $LogPack.Name.ToString()
    $UserFolder = Get-FoldersStartingWith -directory $LogPack.PSPath -startsWith "User"
    # $UserFolder | Write-Output
    $calling_debug_path = Join-Path -Path $UserFolder.PSPath -ChildPath "calling-debug.txt"
    $calling_debug = Get-Content -Path $calling_debug_path -Raw
    $LocationInfo = (Get-MatchingText -text $calling_debug -regexPattern 'Current Emergency Address: \{.+?Current MT location response' -remove 'Current MT location response').replace('Current Emergency Address: ', '') | ConvertFrom-Json
    $NetworkInfo = Convert-SectionsToJSON -content $calling_debug

    $packData = New-Object PSObject
    $packData | Add-Member -MemberType NoteProperty -Name 'Location' -Value $LocationInfo
    $packData | Add-Member -MemberType NoteProperty -Name 'Network' -Value $NetworkInfo
    
    # Add properties (keys) and their corresponding values
    $storeData | Add-Member -MemberType NoteProperty -Name $Path -Value $packData
}
$json_string = $storeData | ConvertTo-Json -Depth 2
$json_string | Out-File -FilePath "$env:temp\2405230040008886_compiled_info.json"
Start-Process explorer -ArgumentList @($logDirectory)
