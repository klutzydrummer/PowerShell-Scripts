# Import the required assemblies
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Constants
# Get the current script directory
$currentScriptPath = Join-Path -Path $PSScriptRoot -ChildPath "ManNote_reader.ps1";
$srcDirectory = $PSScriptRoot;
$basePath = $srcDirectory | Split-Path;
$configPath = Join-Path -Path $basePath -ChildPath "config";
$configJsonPath = Join-Path -Path $configPath -ChildPath "my_data.json";
$config = Get-Content -Path $configJsonPath -Raw | ConvertFrom-Json;
$managerNotesJson = Get-ChildItem -Path $config.manager_notes_path -Filter "*.json"

# Function to create a new control with common settings
function Sort-FilesByDate {
    param (
        [Parameter(Mandatory = $true)]
        [array]$FileArray
    )

    # Define a regex pattern to match the date portion in the format "MM_dd_yyyy"
    $datePattern = '\d{2}_\d{2}_\d{4}'

    # Process each file
    $sortedArray = $FileArray | ForEach-Object {
        # Extract the date portion using the regex
        if ($_ -match $datePattern) {
            $dateString = $matches[0]

            # Parse the date string into a DateTime object
            $date = [datetime]::ParseExact($dateString, 'MM_dd_yyyy', $null)

            # Return an object with the original file and parsed date
            [PSCustomObject]@{
                File = $_
                Date = $date
            }
        }
    } | Sort-Object -Property Date -Descending | Select-Object -ExpandProperty File
    return $sortedArray
}

# Example usage
$sortedNoteFiles = Sort-FilesByDate -FileArray $managerNotesJson
$jsonFilePath = $sortedNoteFiles[0].FullName
Write-Host $jsonFilePath


function Create-Control {
    param (
        [string]$type,
        [string]$text = "",
        [bool]$isMultiline = $false,
        [bool]$isReadOnly = $false,
        [string]$labelText = "",
        [int]$width = 200
    )

    switch ($type) {
        "Label" {
            $control = New-Object System.Windows.Forms.Label
            $control.Text = $text
            $control.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
            $control.Anchor = [System.Windows.Forms.AnchorStyles]::Top -bor [System.Windows.Forms.AnchorStyles]::Left
        }
        "TextBox" {
            $control = New-Object System.Windows.Forms.TextBox
            $control.Width = $width
            $control.Multiline = $isMultiline
            $control.ReadOnly = $isReadOnly
            if ($isMultiline) {
                $control.Dock = [System.Windows.Forms.DockStyle]::Fill
                $control.ScrollBars = [System.Windows.Forms.ScrollBars]::Vertical
                $control.WordWrap = $true
            }
        }
        "Button" {
            $control = New-Object System.Windows.Forms.Button
            $control.Text = $text
            $control.AutoSize = $true
        }
        "CheckBox" {
            $control = New-Object System.Windows.Forms.CheckBox
            $control.Text = $text
            $control.AutoSize = $true
        }
    }

    return $control
}

# Create the main form
$form = New-Object System.Windows.Forms.Form
$form.Text = "Case Management"
$form.Size = New-Object System.Drawing.Size(600, 400)
$form.StartPosition = "CenterScreen"

# Create a TableLayoutPanel for better control over resizing
$tableLayoutPanel = New-Object System.Windows.Forms.TableLayoutPanel
$tableLayoutPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
$tableLayoutPanel.ColumnCount = 3
$tableLayoutPanel.RowCount = 5
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))

$form.Controls.Add($tableLayoutPanel)

# Initialize controls
$caseNumberLabel = Create-Control -type "Label" -text "Case Number:"
$caseNumberTextBox = Create-Control -type "TextBox" -width 200
$goButton = Create-Control -type "Button" -text "Go"

$caseTitleLabel = Create-Control -type "Label" -text "Case Title:"
$caseTitleTextBox = Create-Control -type "TextBox" -width 400

$managerNotesLabel = Create-Control -type "Label" -text "Manager Notes:"
$managerNotesTextArea = Create-Control -type "TextBox" -isMultiline $true -width 400

$alwaysOnTopCheckBox = Create-Control -type "CheckBox" -text "Always on top"

# Add controls to the form
$tableLayoutPanel.Controls.Add($caseNumberLabel, 0, 0)
$tableLayoutPanel.Controls.Add($caseNumberTextBox, 1, 0)
$tableLayoutPanel.Controls.Add($goButton, 2, 0)

$tableLayoutPanel.Controls.Add($caseTitleLabel, 0, 1)
$tableLayoutPanel.Controls.Add($caseTitleTextBox, 1, 1)
$tableLayoutPanel.SetColumnSpan($caseTitleTextBox, 2)

$tableLayoutPanel.Controls.Add($managerNotesLabel, 0, 2)
$tableLayoutPanel.Controls.Add($managerNotesTextArea, 1, 2)
$tableLayoutPanel.SetColumnSpan($managerNotesTextArea, 2)

$tableLayoutPanel.Controls.Add($alwaysOnTopCheckBox, 1, 3)

# Ensure the text area resizes with the window and keep a border
$managerNotesTextArea.Margin = New-Object System.Windows.Forms.Padding(10)
$managerNotesTextArea.Dock = [System.Windows.Forms.DockStyle]::Fill

# Define the action for the Go button
$goButton.Add_Click({
    if (Test-Path $jsonFilePath) {
        $jsonData = Get-Content -Path $jsonFilePath | ConvertFrom-Json
        $caseNumberTextBox.Text -match "(\d{16})"
        $caseNumber = $Matches[0]
        if ($jsonData.PSObject.Properties.Name -contains $caseNumber) {
            $caseData = $jsonData.$caseNumber
            $caseTitleTextBox.Text = $caseData.'Case Title'
            
            # Parse and format the Manager Notes
            $notes = ($caseData.'Manager Notes' | ConvertFrom-Json)
            $formattedNotes = $notes | ForEach-Object {
                $_.PSObject.Properties | ForEach-Object {
                    "$($_.Name): $($_.Value)"
                }
            }
            $managerNotesTextArea.Text = ($formattedNotes -join "`r`n`r`n---`r`n`r`n")
        } else {
            [System.Windows.Forms.MessageBox]::Show("Case Number not found in the JSON file.`n$($jsonFilePath)", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
        }
    } else {
        [System.Windows.Forms.MessageBox]::Show("JSON file not found.", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
})

# Handle the Always on Top checkbox
$alwaysOnTopCheckBox.Add_CheckedChanged({
    $form.TopMost = $alwaysOnTopCheckBox.Checked
})

# Show the form
$form.ShowDialog()
