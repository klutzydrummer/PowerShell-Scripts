# Import the required assemblies
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Constants for configuration and fixed values
$DateFormat = "MM-dd-yyyy"
$DefaultCaseStatus = "Troubleshooting"
$ErrorMessageInvalidBase64 = "No valid Base64 encoded data was found."

# Define functions

# Function to display error messages in a message box
function Show-ErrorMessage {
    param (
        [string]$message
    )
    [void][System.Windows.Forms.MessageBox]::Show($message, "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
}

# Centralized error-handling function to log errors and display error messages
function Handle-Error {
    param (
        [string]$message,
        [object]$exception
    )
    # Log the error to a file (optional)
    # Add-Content -Path "error_log.txt" -Value "$message: $($exception.Message)"
    
    # Display the error message
    Show-ErrorMessage -message "$($message): $($exception.Message)"
}

# Function to compress and Base64 encode a string
function Compress-And-Base64Encode {
    param (
        [Parameter(Mandatory = $true)]
        [string]$InputString
    )

    $bytes = [System.Text.Encoding]::UTF8.GetBytes($InputString)

    # Use try-finally to ensure resources are disposed
    $memoryStream = New-Object IO.MemoryStream
    try {
        $gzipStream = New-Object IO.Compression.GZipStream($memoryStream, [IO.Compression.CompressionMode]::Compress)
        try {
            $gzipStream.Write($bytes, 0, $bytes.Length)
        } finally {
            $gzipStream.Dispose()
        }
        $compressedBytes = $memoryStream.ToArray()
    } finally {
        $memoryStream.Dispose()
    }

    return [Convert]::ToBase64String($compressedBytes)
}

# Function to decode and decompress a Base64 encoded string
function Decode-And-DecompressBase64 {
    param (
        [Parameter(Mandatory = $true)]
        [string]$EncodedString
    )

    $compressedBytes = [Convert]::FromBase64String($EncodedString)

    $memoryStream = New-Object IO.MemoryStream
    try {
        $memoryStream.Write($compressedBytes, 0, $compressedBytes.Length)
        $memoryStream.Position = 0

        $gzipStream = New-Object IO.Compression.GZipStream($memoryStream, [IO.Compression.CompressionMode]::Decompress)
        try {
            $decompressedStream = New-Object IO.MemoryStream
            try {
                $buffer = New-Object byte[] 1024
                while (($read = $gzipStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
                    $decompressedStream.Write($buffer, 0, $read)
                }
                $decompressedBytes = $decompressedStream.ToArray()
            } finally {
                $decompressedStream.Dispose()
            }
        } finally {
            $gzipStream.Dispose()
        }
    } finally {
        $memoryStream.Dispose()
    }

    return [System.Text.Encoding]::UTF8.GetString($decompressedBytes)
}

# Combined function for handling key events for text fields
function Handle-KeyDown {
    param (
        [object]$sender,
        [System.Windows.Forms.KeyEventArgs]$e
    )

    # Switch statement to handle different key combinations
    switch ($true) {
        # Handle Ctrl+A (Select All)
        ($e.Control -and $e.KeyCode -eq [System.Windows.Forms.Keys]::A) {
            $sender.SelectAll()
            $e.SuppressKeyPress = $true
            break
        }

        # Handle Ctrl+Back (Delete previous word)
        ($e.Control -and $e.KeyCode -eq [System.Windows.Forms.Keys]::Back) {
            $start = $sender.SelectionStart
            $length = $sender.SelectionLength
            if ($start -gt 0 -and $length -eq 0) {
                $words = $sender.Text.Substring(0, $start).Split()
                if ($words.Length -gt 0) {
                    $lastWord = $words[$words.Length - 1]
                    $sender.Text = $sender.Text.Remove($start - $lastWord.Length, $lastWord.Length)
                    $sender.SelectionStart = $start - $lastWord.Length
                }
            }
            $e.SuppressKeyPress = $true
            break
        }

        # Handle Ctrl+V (Paste with sanitized newlines)
        ($e.Control -and $e.KeyCode -eq [System.Windows.Forms.Keys]::V) {
            $clipboardText = [System.Windows.Forms.Clipboard]::GetText([System.Windows.Forms.TextDataFormat]::Text)
            $sanitizedText = $clipboardText -replace "(?<!`r)`n", "`r`n"
            $selectionStart = $sender.SelectionStart
            $sender.Text = $sender.Text.Substring(0, $selectionStart) + $sanitizedText + $sender.Text.Substring($selectionStart + $sender.SelectionLength)
            $sender.SelectionStart = $selectionStart + $sanitizedText.Length
            $e.SuppressKeyPress = $true
            break
        }
    }
}

# Function to validate user inputs before processing
function Validate-Inputs {
    if (-not $caseContactTextBox.Text) {
        Show-ErrorMessage -message "Case Contact cannot be empty."
        return $false
    }
    if (-not $problemDescriptionTextArea.Text) {
        Show-ErrorMessage -message "Problem Description cannot be empty."
        return $false
    }
    return $true
}

# Function to create a new control with common settings
function Create-Control {
    param (
        [string]$type,
        [string]$text,
        [bool]$isMultiline = $false,
        [bool]$isReadOnly = $false
        # Removed the event handler parameter
    )

    switch ($type) {
        "Label" {
            $control = New-Object System.Windows.Forms.Label
            $control.Text = $text
            $control.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
            $control.Anchor = [System.Windows.Forms.AnchorStyles]::Left
        }
        "TextBox" {
            $control = New-Object System.Windows.Forms.TextBox
            $control.Dock = [System.Windows.Forms.DockStyle]::Fill
            $control.Multiline = $isMultiline
            $control.ReadOnly = $isReadOnly
        }
        "Button" {
            $control = New-Object System.Windows.Forms.Button
            $control.Text = $text
            $control.AutoSize = $true
        }
        "ComboBox" {
            $control = New-Object System.Windows.Forms.ComboBox
            $control.Dock = [System.Windows.Forms.DockStyle]::Fill
        }
        "CheckBox" {
            $control = New-Object System.Windows.Forms.CheckBox
            $control.Text = $text
            $control.Anchor = [System.Windows.Forms.AnchorStyles]::Left
        }
    }

    return $control
}

# Create the main form
$form = New-Object System.Windows.Forms.Form
$form.Text = "Case Management"
$form.Size = New-Object System.Drawing.Size(600, 700) # Initial size
$form.MinimumSize = New-Object System.Drawing.Size(350, 350) # Set a minimum size to prevent too small resizing
$form.StartPosition = "CenterScreen"

# Remove AutoSize and AutoSizeMode for better manual control
$form.AutoSize = $false

# Create a TableLayoutPanel for better control over resizing
$tableLayoutPanel = New-Object System.Windows.Forms.TableLayoutPanel
$tableLayoutPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
$tableLayoutPanel.ColumnCount = 2
$tableLayoutPanel.RowCount = 9
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 40)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 40)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 20)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$form.Controls.Add($tableLayoutPanel)

# Initialize controls using the helper function
$updateDateLabel = Create-Control -type "Label" -text "Update Date:"
$updateDateTextBox = Create-Control -type "TextBox" -text "" -isReadOnly $true
$updateDateTextBox.Text = (Get-Date).ToString($DateFormat)
$updateDateTextBox.add_KeyDown({ Handle-KeyDown $updateDateTextBox $_ })

$caseContactLabel = Create-Control -type "Label" -text "Case Contact:"
$caseContactTextBox = Create-Control -type "TextBox" -text ""
$caseContactTextBox.add_KeyDown({ Handle-KeyDown $caseContactTextBox $_ })

$caseStatusLabel = Create-Control -type "Label" -text "Case Status:"

# Available Case Status
$availableCaseStatus = @(    
    "Initial contact pending",
    "Identifying the issue",
    "Troubleshooting",
    "Pending customer response",
    "Waiting for customer confirmation",
    "Waiting for product team",
    "Mitigated"
)
$defaultCaseStatusIndex = [Array]::IndexOf($availableCaseStatus, $DefaultCaseStatus)
$caseStatusComboBox = Create-Control -type "ComboBox" -text ""
$caseStatusComboBox.Items.AddRange($availableCaseStatus)
$caseStatusComboBox.SelectedIndex = $defaultCaseStatusIndex

$problemDescriptionLabel = Create-Control -type "Label" -text "Problem Description:"
$problemDescriptionTextArea = Create-Control -type "TextBox" -text "" -isMultiline $true
$problemDescriptionTextArea.add_KeyDown({ Handle-KeyDown $problemDescriptionTextArea $_ })

$nextActionLabel = Create-Control -type "Label" -text "Next Action:"
$nextActionTextArea = Create-Control -type "TextBox" -text "" -isMultiline $true
$nextActionTextArea.add_KeyDown({ Handle-KeyDown $nextActionTextArea $_ })

$templateLabel = Create-Control -type "Label" -text "Template:"
$templateTextArea = Create-Control -type "TextBox" -text "" -isMultiline $true -isReadOnly $true
$templateTextArea.ScrollBars = [System.Windows.Forms.ScrollBars]::Vertical

$alwaysOnTopCheckbox = Create-Control -type "CheckBox" -text "Always on top"
$alwaysOnTopCheckbox.add_KeyDown({
    $form.TopMost = $alwaysOnTopCheckbox.Checked
})

$buttonPanel = New-Object System.Windows.Forms.FlowLayoutPanel
$buttonPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::LeftToRight

$generateButton = Create-Control -type "Button" -text "Generate"
$generateButton.add_KeyDown({
    # Validate inputs before proceeding
    if (-not (Validate-Inputs)) { return }

    $updateDateTextBox.Text = (Get-Date).ToString($DateFormat)
    $outputText = @"
Update Date: $($updateDateTextBox.Text)  
---

Case Contact: $($caseContactTextBox.Text)  

---

Case Status: $($caseStatusComboBox.Text)  
Problem Description: $($problemDescriptionTextArea.Text)  

---

## Next Action  

$($nextActionTextArea.Text)  
"@

    $jsonOutput = [PSCustomObject]@{
        updateDateTextBox = $updateDateTextBox.Text
        caseContactTextBox = $caseContactTextBox.Text
        caseStatusComboBox = $caseStatusComboBox.Text
        problemDescriptionTextArea = $problemDescriptionTextArea.Text
        nextActionTextArea = $nextActionTextArea.Text
    } | ConvertTo-Json -Depth 10 -Compress

    $b64encoded = Compress-And-Base64Encode -InputString $jsonOutput
    $outputText = $outputText + "`r`n<span style=`"color: transparent;`">Compressed Base64Encoded JSON:`r`n$b64encoded  `r`n:End Compressed Base64Encoded JSON</span>"
    $templateTextArea.Text = $outputText
})

$clearButton = Create-Control -type "Button" -text "Clear"
$clearButton.add_KeyDown({
    $caseContactTextBox.Clear()
    $problemDescriptionTextArea.Clear()
    $nextActionTextArea.Clear()
    $templateTextArea.Clear()
    $caseStatusComboBox.SelectedIndex = $defaultCaseStatusIndex
})

$copyButton = Create-Control -type "Button" -text "Copy"
$copyButton.add_KeyDown({
    [System.Windows.Forms.Clipboard]::SetText($templateTextArea.Text)
    [System.Windows.Forms.MessageBox]::Show("Template copied to clipboard!")
})

$importButton = Create-Control -type "Button" -text "Import"
$importButton.Add_Click({
    # Create the import form
    $importForm = New-Object System.Windows.Forms.Form
    $importForm.Text = "Import Base64"
    $importForm.Size = New-Object System.Drawing.Size(400, 300)
    $importForm.StartPosition = "CenterScreen"
    $importForm.TopMost = $true

    $importTableLayoutPanel = New-Object System.Windows.Forms.TableLayoutPanel
    $importTableLayoutPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
    $importTableLayoutPanel.ColumnCount = 1
    $importTableLayoutPanel.RowCount = 3
    $importTableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
    $importTableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
    $importTableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 100)))
    $importTableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
    $importForm.Controls.Add($importTableLayoutPanel)

    $importLabel = Create-Control -type "Label" -text "Input the Base64 encoded note string below:"
    $importTextArea = Create-Control -type "TextBox" -text "" -isMultiline $true -eventHandler { Handle-KeyDown $importTextArea $_ }

    $importButtonPanel = New-Object System.Windows.Forms.FlowLayoutPanel
    $importButtonPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
    $importButtonPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::LeftToRight

    $importButtonInner = Create-Control -type "Button" -text "Import"
    $importButtonInner.Add_Click({
        $importTextInput = $importTextArea.Text

        # Regex patterns
        $caseNotesBase64Pattern = 'Compressed Base64Encoded JSON:\s*(H4sIA[^\s<]+)'
        $plainBase64Pattern = '^[a-zA-Z0-9\+/]*={0,3}$'

        # Initialize variables
        $sanitizedEncodedString = ""
        $isBase64 = $false

        try {
            # Perform the regex match for embedded Base64 string
            if ($importTextInput -match $caseNotesBase64Pattern) {
                # Extract the Base64 encoded substring
                $sanitizedEncodedString = $matches[1]
                $isBase64 = $true
            } elseif ($importTextInput -match $plainBase64Pattern) {
                # Check if the input is already a plain Base64 encoded string
                try {
                    [Convert]::FromBase64String($importTextInput) | Out-Null
                    $sanitizedEncodedString = $importTextInput
                    $isBase64 = $true
                } catch {
                    $isBase64 = $false
                }
            } else {
                $isBase64 = $false
            }

            if ($isBase64) {
                # Decode and decompress the Base64 encoded string
                $decodedString = Decode-And-DecompressBase64 -EncodedString $sanitizedEncodedString
                $jsonObject = $decodedString | ConvertFrom-Json

                # Update the form fields with the JSON data
                $caseContactTextBox.Text = $jsonObject.caseContactTextBox
                $caseStatusComboBox.Text = $jsonObject.caseStatusComboBox
                $problemDescriptionTextArea.Text = $jsonObject.problemDescriptionTextArea
                $nextActionTextArea.Text = $jsonObject.nextActionTextArea

                # Close the import form
                $importForm.Close()
            } else {
                # Pop up error message stating that no valid data was found
                Show-ErrorMessage -message $ErrorMessageInvalidBase64
            }
        } catch {
            # Handle any unexpected errors
            Handle-Error -message "An unexpected error occurred" -exception $_
        }
    })

    $cancelButtonInner = Create-Control -type "Button" -text "Cancel"
    $cancelButtonInner.Add_Click({
        $importForm.Close()
    })

    $importButtonPanel.Controls.Add($importButtonInner)
    $importButtonPanel.Controls.Add($cancelButtonInner)

    $importTableLayoutPanel.Controls.Add($importLabel, 0, 0)
    $importTableLayoutPanel.Controls.Add($importTextArea, 0, 1)
    $importTableLayoutPanel.Controls.Add($importButtonPanel, 0, 2)

    $importForm.ShowDialog()
})

# Add controls to the form
$tableLayoutPanel.Controls.Add($updateDateLabel, 0, 0)
$tableLayoutPanel.Controls.Add($updateDateTextBox, 1, 0)
$tableLayoutPanel.Controls.Add($caseContactLabel, 0, 1)
$tableLayoutPanel.Controls.Add($caseContactTextBox, 1, 1)
$tableLayoutPanel.Controls.Add($caseStatusLabel, 0, 2)
$tableLayoutPanel.Controls.Add($caseStatusComboBox, 1, 2)
$tableLayoutPanel.Controls.Add($problemDescriptionLabel, 0, 3)
$tableLayoutPanel.Controls.Add($problemDescriptionTextArea, 1, 3)
$tableLayoutPanel.Controls.Add($nextActionLabel, 0, 4)
$tableLayoutPanel.Controls.Add($nextActionTextArea, 1, 4)
$tableLayoutPanel.Controls.Add($templateLabel, 0, 5)
$tableLayoutPanel.Controls.Add($templateTextArea, 1, 5)
$tableLayoutPanel.Controls.Add($alwaysOnTopCheckbox, 1, 6)
$tableLayoutPanel.Controls.Add($buttonPanel, 0, 8)
$tableLayoutPanel.SetColumnSpan($buttonPanel, 2)

# Add buttons to the button panel
$buttonPanel.Controls.Add($generateButton)
$buttonPanel.Controls.Add($clearButton)
$buttonPanel.Controls.Add($copyButton)
$buttonPanel.Controls.Add($importButton)

# Show the form
$form.ShowDialog()
