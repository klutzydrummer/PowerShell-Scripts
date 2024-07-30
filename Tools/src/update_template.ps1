# Import the required assemblies
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$form = New-Object System.Windows.Forms.Form
$form.Text = "Case Management"
$form.Size = New-Object System.Drawing.Size(600, 700)
$form.StartPosition = "CenterScreen"

# Define functions
function Show-ErrorMessage {
    param (
        [string]$message
    )
    # Create the message box
    [void][System.Windows.Forms.MessageBox]::Show($message, "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
}

function Compress-And-Base64Encode {
    param (
        [Parameter(Mandatory = $true)]
        [string]$InputString
    )

    $bytes = [System.Text.Encoding]::UTF8.GetBytes($InputString)

    $memoryStream = New-Object IO.MemoryStream
    $gzipStream = New-Object IO.Compression.GZipStream($memoryStream, [IO.Compression.CompressionMode]::Compress)

    $gzipStream.Write($bytes, 0, $bytes.Length)
    $gzipStream.Close()

    $compressedBytes = $memoryStream.ToArray()
    $encodedString = [Convert]::ToBase64String($compressedBytes)

    $memoryStream.Close()
    return $encodedString
}

function Decode-And-DecompressBase64 {
    param (
        [Parameter(Mandatory = $true)]
        [string]$EncodedString
    )

    $compressedBytes = [Convert]::FromBase64String($EncodedString)

    $memoryStream = New-Object IO.MemoryStream
    $memoryStream.Write($compressedBytes, 0, $compressedBytes.Length)
    $memoryStream.Position = 0

    $gzipStream = New-Object IO.Compression.GZipStream($memoryStream, [IO.Compression.CompressionMode]::Decompress)
    $decompressedStream = New-Object IO.MemoryStream
    $buffer = New-Object byte[] 1024

    while (($read = $gzipStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
        $decompressedStream.Write($buffer, 0, $read)
    }

    $gzipStream.Close()
    $memoryStream.Close()

    $decompressedBytes = $decompressedStream.ToArray()
    $decodedString = [System.Text.Encoding]::UTF8.GetString($decompressedBytes)

    $decompressedStream.Close()
    return $decodedString
}

# Handle key events for text fields to support Ctrl+A and Ctrl+Backspace
function Handle-KeyDown {
    param (
        [object]$sender,
        [System.Windows.Forms.KeyEventArgs]$e
    )

    if ($e.Control -and $e.KeyCode -eq [System.Windows.Forms.Keys]::A) {
        $sender.SelectAll()
        $e.SuppressKeyPress = $true
    } elseif ($e.Control -and $e.KeyCode -eq [System.Windows.Forms.Keys]::Back) {
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
    }
}

# Handle paste events to preserve multiline text and sanitize newlines
function Handle-Paste {
    param (
        [object]$sender,
        [System.Windows.Forms.KeyEventArgs]$e
    )

    if ($e.Control -and $e.KeyCode -eq [System.Windows.Forms.Keys]::V) {
        $clipboardText = [System.Windows.Forms.Clipboard]::GetText([System.Windows.Forms.TextDataFormat]::Text)
        $sanitizedText = $clipboardText -replace "(?<!`r)`n", "`r`n"
        $selectionStart = $sender.SelectionStart
        $sender.Text = $sender.Text.Substring(0, $selectionStart) + $sanitizedText + $sender.Text.Substring($selectionStart + $sender.SelectionLength)
        $sender.SelectionStart = $selectionStart + $sanitizedText.Length
        $e.SuppressKeyPress = $true
    }
}


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
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$form.Controls.Add($tableLayoutPanel)

# Update Date Label
$updateDateLabel = New-Object System.Windows.Forms.Label
$updateDateLabel.Text = "Update Date:"
$updateDateLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$updateDateLabel.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$tableLayoutPanel.Controls.Add($updateDateLabel, 0, 0)

# Update Date TextBox (autofilled with current date)
$dateFormat = "MM-dd-yyyy"
$updateDateTextBox = New-Object System.Windows.Forms.TextBox
$updateDateTextBox.Text = (Get-Date).ToString($dateFormat)
$updateDateTextBox.ReadOnly = $true
$updateDateTextBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$updateDateTextBox.add_KeyDown({ Handle-KeyDown $updateDateTextBox $_ })
$tableLayoutPanel.Controls.Add($updateDateTextBox, 1, 0)

# Case Contact Label
$caseContactLabel = New-Object System.Windows.Forms.Label
$caseContactLabel.Text = "Case Contact:"
$caseContactLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$caseContactLabel.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$tableLayoutPanel.Controls.Add($caseContactLabel, 0, 1)

# Case Contact TextBox
$caseContactTextBox = New-Object System.Windows.Forms.TextBox
$caseContactTextBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$caseContactTextBox.add_KeyDown({ Handle-KeyDown $caseContactTextBox $_ })
$caseContactTextBox.add_KeyDown({ Handle-Paste $caseContactTextBox $_ })
$caseContactTextBox.add_TextChanged({
    $caseContactTextBox.Text = $caseContactTextBox.Text
})
$tableLayoutPanel.Controls.Add($caseContactTextBox, 1, 1)

# Case Status Label
$caseStatusLabel = New-Object System.Windows.Forms.Label
$caseStatusLabel.Text = "Case Status:"
$caseStatusLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$caseStatusLabel.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$tableLayoutPanel.Controls.Add($caseStatusLabel, 0, 2)

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
# Default Case Status
$defaultCaseStatus = "Troubleshooting"
$defaultCaseStatusIndex = [Array]::IndexOf($availableCaseStatus, $defaultCaseStatus)

# Case Status ComboBox
$caseStatusComboBox = New-Object System.Windows.Forms.ComboBox
$caseStatusComboBox.Dock = [System.Windows.Forms.DockStyle]::Fill
$caseStatusComboBox.Items.AddRange($availableCaseStatus)
$tableLayoutPanel.Controls.Add($caseStatusComboBox, 1, 2)

# Prefill Case Status with "Troubleshooting"
$caseStatusComboBox.SelectedIndex = $defaultCaseStatusIndex

# Problem Description Label
$problemDescriptionLabel = New-Object System.Windows.Forms.Label
$problemDescriptionLabel.Text = "Problem Description:"
$problemDescriptionLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$problemDescriptionLabel.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$tableLayoutPanel.Controls.Add($problemDescriptionLabel, 0, 3)

# Problem Description TextArea
$problemDescriptionTextArea = New-Object System.Windows.Forms.TextBox
$problemDescriptionTextArea.Multiline = $true
$problemDescriptionTextArea.Dock = [System.Windows.Forms.DockStyle]::Fill
$problemDescriptionTextArea.add_KeyDown({ Handle-KeyDown $problemDescriptionTextArea $_ })
$problemDescriptionTextArea.add_KeyDown({ Handle-Paste $problemDescriptionTextArea $_ })
$problemDescriptionTextArea.add_TextChanged({
    $problemDescriptionTextArea.Text = $problemDescriptionTextArea.Text
})
$tableLayoutPanel.Controls.Add($problemDescriptionTextArea, 1, 3)

# Next Action Label
$nextActionLabel = New-Object System.Windows.Forms.Label
$nextActionLabel.Text = "Next Action:"
$nextActionLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$nextActionLabel.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$tableLayoutPanel.Controls.Add($nextActionLabel, 0, 4)

# Next Action TextArea
$nextActionTextArea = New-Object System.Windows.Forms.TextBox
$nextActionTextArea.Multiline = $true
$nextActionTextArea.Dock = [System.Windows.Forms.DockStyle]::Fill
$nextActionTextArea.add_KeyDown({ Handle-KeyDown $nextActionTextArea $_ })
$nextActionTextArea.add_KeyDown({ Handle-Paste $nextActionTextArea $_ })
$nextActionTextArea.add_TextChanged({
    $nextActionTextArea.Text = $nextActionTextArea.Text
})
$tableLayoutPanel.Controls.Add($nextActionTextArea, 1, 4)

# Template Label
$templateLabel = New-Object System.Windows.Forms.Label
$templateLabel.Text = "Template:"
$templateLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleLeft
$templateLabel.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$tableLayoutPanel.Controls.Add($templateLabel, 0, 5)

# Template TextArea
$templateTextArea = New-Object System.Windows.Forms.TextBox
$templateTextArea.Multiline = $true
$templateTextArea.ScrollBars = [System.Windows.Forms.ScrollBars]::Vertical
$templateTextArea.ReadOnly = $true
$templateTextArea.Dock = [System.Windows.Forms.DockStyle]::Fill
$templateTextArea.add_KeyDown({ Handle-KeyDown $templateTextArea $_ })
$tableLayoutPanel.Controls.Add($templateTextArea, 1, 5)

# Always on top Checkbox
$alwaysOnTopCheckbox = New-Object System.Windows.Forms.CheckBox
$alwaysOnTopCheckbox.Text = "Always on top"
$alwaysOnTopCheckbox.Anchor = [System.Windows.Forms.AnchorStyles]::Left
$alwaysOnTopCheckbox.add_CheckedChanged({
    $form.TopMost = $alwaysOnTopCheckbox.Checked
})
$tableLayoutPanel.Controls.Add($alwaysOnTopCheckbox, 1, 6)

# Button Panel
$buttonPanel = New-Object System.Windows.Forms.FlowLayoutPanel
$buttonPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::LeftToRight
$tableLayoutPanel.Controls.Add($buttonPanel, 0, 8)
$tableLayoutPanel.SetColumnSpan($buttonPanel, 2)

# Generate Button
$generateButton = New-Object System.Windows.Forms.Button
$generateButton.Text = "Generate"
$generateButton.AutoSize = $true
$generateButton.Add_Click({
    $updateDateTextBox.Text = (Get-Date).ToString($dateFormat)
    $outputText =               "Update Date: " + $updateDateTextBox.Text + "  `r`n" +
                                "---`r`n" +
                                "`r`n" +
                                "Case Contact: " + $caseContactTextBox.Text + "  `r`n" +
                                "`r`n" +
                                "---`r`n" +
                                "`r`n" +
                                "Case Status: " + $caseStatusComboBox.Text + "  `r`n" +
                                "Problem Description: " + $problemDescriptionTextArea.Text + "  `r`n" +
                                "`r`n" +
                                "---`r`n" + 
                                "`r`n" +
                                "## Next Action  `r`n" + 
                                "`r`n" +
                                $nextActionTextArea.Text + "  "
    $jsonOutput = [PSCustomObject]@{
        updateDateTextBox = $updateDateTextBox.Text
        caseContactTextBox = $caseContactTextBox.Text
        caseStatusComboBox = $caseStatusComboBox.Text
        problemDescriptionTextArea = $problemDescriptionTextArea.Text
        nextActionTextArea = $nextActionTextArea.Text
    } | ConvertTo-Json -Depth 10 -Compress
    $b64encoded = Compress-And-Base64Encode -InputString $jsonOutput
    $outputText = $outputText + "`r`n<span style=`"color: transparent;`">Compressed Base64Encoded JSON:`r`n$b64encoded</span>`r`n"
    $templateTextArea.Text = $outputText
})
$buttonPanel.Controls.Add($generateButton)

# Clear Button
$clearButton = New-Object System.Windows.Forms.Button
$clearButton.Text = "Clear"
$clearButton.AutoSize = $true
$clearButton.Add_Click({
    $caseContactTextBox.Clear()
    $problemDescriptionTextArea.Clear()
    $nextActionTextArea.Clear()
    $templateTextArea.Clear()
    $caseStatusComboBox.SelectedIndex = $defaultCaseStatusIndex
})
$buttonPanel.Controls.Add($clearButton)

# Copy Button
$copyButton = New-Object System.Windows.Forms.Button
$copyButton.Text = "Copy"
$copyButton.AutoSize = $true
$copyButton.Add_Click({
    [System.Windows.Forms.Clipboard]::SetText($templateTextArea.Text)
    [System.Windows.Forms.MessageBox]::Show("Template copied to clipboard!")
})
$buttonPanel.Controls.Add($copyButton)

# Import Button
$importButton = New-Object System.Windows.Forms.Button
$importButton.Text = "Import"
$importButton.AutoSize = $true
$importButton.Add_Click({
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
    
    $importLabel = New-Object System.Windows.Forms.Label
    $importLabel.Text = "Input the Base64 encoded note string below:"
    $importLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleCenter
    $importLabel.Dock = [System.Windows.Forms.DockStyle]::Fill
    $importTableLayoutPanel.Controls.Add($importLabel, 0, 0)
    
    $importTextArea = New-Object System.Windows.Forms.TextBox
    $importTextArea.Multiline = $true
    $importTextArea.Dock = [System.Windows.Forms.DockStyle]::Fill
    $importTextArea.add_KeyDown({ Handle-KeyDown $importTextArea $_ })
    $importTextArea.add_KeyDown({ Handle-Paste $importTextArea $_ })
    $importTextArea.add_TextChanged({
        $importTextArea.Text = $importTextArea.Text
    })
    $importTableLayoutPanel.Controls.Add($importTextArea, 0, 1)
    
    $importButtonPanel = New-Object System.Windows.Forms.FlowLayoutPanel
    $importButtonPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
    $importButtonPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::LeftToRight
    $importTableLayoutPanel.Controls.Add($importButtonPanel, 0, 2)
    
    $importButtonInner = New-Object System.Windows.Forms.Button
    $importButtonInner.Text = "Import"
    $importButtonInner.AutoSize = $true
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
                <# $updateDateTextBox.Text = $jsonObject.updateDateTextBox #>
                $caseContactTextBox.Text = $jsonObject.caseContactTextBox
                $caseStatusComboBox.Text = $jsonObject.caseStatusComboBox
                $problemDescriptionTextArea.Text = $jsonObject.problemDescriptionTextArea
                $nextActionTextArea.Text = $jsonObject.nextActionTextArea
        
                # Close the import form
                $importForm.Close()
            } else {
                # Pop up error message stating that no valid data was found
                Show-ErrorMessage -message "No valid Base64 encoded data was found."
            }
        } catch {
            # Handle any unexpected errors
            Show-ErrorMessage -message "An unexpected error occurred: $_"
        }
    })
    $importButtonPanel.Controls.Add($importButtonInner)
    
    $cancelButtonInner = New-Object System.Windows.Forms.Button
    $cancelButtonInner.Text = "Cancel"
    $cancelButtonInner.AutoSize = $true
    $cancelButtonInner.Add_Click({
        $importForm.Close()
    })
    $importButtonPanel.Controls.Add($cancelButtonInner)
    
    $importForm.ShowDialog()
})
$buttonPanel.Controls.Add($importButton)

$form.ShowDialog()
