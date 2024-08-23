# Import the required assemblies
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Load cofig files
# Get the current script directory
$currentScriptPath = Join-Path -Path $PSScriptRoot -ChildPath "ManNote_reader.ps1";
$srcDirectory = $PSScriptRoot;
$basePath = $srcDirectory | Split-Path;
$configPath = Join-Path -Path $basePath -ChildPath "config";
$configJsonPath = Join-Path -Path $configPath -ChildPath "my_data.json";
$config = Get-Content -Path $configJsonPath -Raw | ConvertFrom-Json;
$templatesPath = Join-Path -Path $basePath -ChildPath "templates";
$templatePath = Join-Path -Path $templatesPath -ChildPath "case_notes_template.handlebars";
$cssFilePath = Join-Path -Path $templatesPath -ChildPath "case_notes_template.css";
$binPath = Join-Path -Path $basePath -ChildPath "bin";
$pandocPath = Join-Path -Path $binPath -ChildPath "pandoc" | Join-Path -ChildPath "pandoc.exe";
$tempPath = Join-Path -Path $basePath -ChildPath "temp"

# HTML TEMPLATE STRING
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Set-ClipboardHtml {
    param (
        [Parameter(Mandatory = $true)]
        [string]$html
    )

    # Define the HTML header and footer
    $header = "Version:0.9" + "`r`n" + 
            "StartHTML:00000097" + "`r`n" + 
            "EndHTML:" + "{0:D8}" + "`r`n" + 
            "StartFragment:00000133" + "`r`n" + 
            "EndFragment:" + "{1:D8}" + "`r`n" +
            "SourceURL:vscode-webview://1rqci4mv8hm2kcvlgsfte6vh30e406j9229k46lad3jce16bgo72/index.html?id=992efc56-d9c6-49a3-99f6-b2def6044010&origin=0b2a166c-e743-4b3d-9fb1-fbbcc33324d5&swVersion=4&extensionId=vscode.markdown-language-features&platform=electron&vscode-resource-base-authority=vscode-resource.vscode-cdn.net&parentOrigin=vscode-file%3A%2F%2Fvscode-app"
    $footer = ""

    # Calculate the positions for StartHTML and EndHTML
    $fullHtml = $header + $html + $footer
    $startHTML = [Text.Encoding]::Default.GetByteCount($header)
    $endHTML = $startHTML + [Text.Encoding]::Default.GetByteCount($html) + [Text.Encoding]::Default.GetByteCount($footer)

    # Replace placeholders with calculated positions
    $fullHtml = $fullHtml -replace "\{0:D8\}", $startHTML.ToString("D8")
    $fullHtml = $fullHtml -replace "\{1:D8\}", $endHTML.ToString("D8")

    # Set the HTML content to the clipboard
    Add-Type -AssemblyName PresentationCore
    $bytes = [Text.Encoding]::UTF8.GetBytes($fullHtml)

    $dataObject = New-Object Windows.Forms.DataObject
    $dataObject.SetData([Windows.Forms.DataFormats]::Html, $false, [System.IO.MemoryStream]::new($bytes))

    [Windows.Forms.Clipboard]::SetDataObject($dataObject, $true)
}
function fill-template {
    param (
        [string]$html
    )
    $html_template_string = Get-Content -Path $templatePath -Raw;
    $html_template_string = $html_template_string -replace "{{html}}", $html

    return $html_template_string;

};

function prepandoc-transform {
    param (
        [string]$MarkdownString
    )
    if ($MarkdownString.StartsWith("-")) {
        $MarkdownString = $MarkdownString.Substring(1);
    };
    # Use regex to find and replace the pattern with the desired format
    $pattern = '(?i)icm (\d{9})';
    $replacement = '[IcM $1](https://portal.microsofticm.com/imp/IncidentDetails.aspx?id=$1)';

    # Perform the replacement
    $MarkdownString = $MarkdownString -ireplace $pattern, $replacement;
    return $MarkdownString
}

function postpandoc-transform {
    param (
        [string]$HtmlString
    )
    $line = "&#9472;" * 80
    $HtmlString = $HtmlString -replace "<hr>", "<span style='display: block; font-size: 16px; line-height: 1; margin: 20px 0;'>$line</span>"
    return $HtmlString
}
function Convert-MarkdownToHtml {
    param (
        [string]$MarkdownString
    )

    # Path to the pandoc binary
    $pandocPath = $pandocPath;

    # Generate a temporary filename with a timestamp
    $timestamp = (Get-Date).ToString("yyyyMMddHHmmss")
    $tempMarkdownFile = Join-Path -Path $tempPath -ChildPath "$timestamp.md"
    $tempHtmlFile = Join-Path -Path $tempPath -ChildPath "$($timestamp)_pandoc.html"
    $tempStyledHtmlFile = Join-Path -Path $tempPath -ChildPath "$($timestamp)_styled.html"

    $MarkdownString = prepandoc-transform -$MarkdownString

    try {
        # Save the Markdown string to the temporary file
        Set-Content -Path $tempMarkdownFile -Value $MarkdownString -Encoding UTF8

        # Convert the Markdown file to HTML using Pandoc
        & $pandocPath $tempMarkdownFile -f markdown_github -t html -o $tempHtmlFile # --metadata title="Case Update" --css=$cssFilePath --embed-resources --standalone
        Write-Host Start-Process -FilePath "python" -ArgumentList "-m premailer --allow-loading-external-files --external-style=`"$cssPath`" --remove-classes --file=`"$tempHtmlFile`" --output=`"$tempStyledHtmlFile`"" -NoNewWindow -Wait
        Start-Process -FilePath "python" -ArgumentList "-m premailer --allow-loading-external-files --external-style=`"$cssFilePath`" --remove-classes --file=`"$tempHtmlFile`" --output=`"$tempStyledHtmlFile`"" -NoNewWindow -Wait
        # Read the HTML output into a string
        $htmlString = Get-Content -Path $tempStyledHtmlFile -Raw -Encoding UTF8
        $htmlString = postpandoc-transform -HtmlString $htmlString
        # Return the HTML string
        return $htmlString
    }
    finally {
        # Clean up the temporary files
        Remove-Item -Path $tempMarkdownFile, $tempHtmlFile, $tempStyledHtmlFile -ErrorAction SilentlyContinue
    }
}

# Constants for configuration and fixed values
$DateFormat = "MM-dd-yyyy"
$DefaultCaseStatus = "Troubleshooting"
$ErrorMessageInvalidBase64 = "No valid Base64 encoded data was found."

# Define functions
function Get-NewlineType {
    # Create a temporary file
    $tempFile = [System.IO.Path]::GetTempFileName()
    
    try {
        # Write a string with a newline to the file
        "Test`nLine" | Out-File -FilePath $tempFile -Encoding ascii

        # Read the file contents as bytes
        $bytes = [System.IO.File]::ReadAllBytes($tempFile)

        # Determine the newline type based on the byte values
        if ($bytes.Length -ge 2 -and $bytes[-2] -eq 13 -and $bytes[-1] -eq 10) {
            Write-Host "This system uses: CRLF (Carriage Return + Line Feed)"
            $targetNewline = "`r`n"
            $searchRegex = "(?<!`r)`n"
        } elseif ($bytes[-1] -eq 10) {
            Write-Host "This system uses: LF (Line Feed)"
            $targetNewline = "`n"
            $searchRegex = "`r`n"
        } else {
            Write-Host "This system uses: Unknown newline format"
            $targetNewline = "`n"
            $searchRegex = "`r`n"
        }
        return @($targetNewline, $searchRegex)
    } finally {
        # Clean up the temporary file
        Remove-Item -Path $tempFile -Force
    }
}

# Automatically set the proper newline characters based on system
$targetLineFeed, $lineFeedRegEx = Get-NewlineType

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
            $sanitizedText = $clipboardText -replace $lineFeedRegEx, $targetLineFeed
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
    if (-not $markdownInputTextArea.Text) {
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

# Variable for old text
$script:copiedTextMd = '';
$script:copiedTextMd_Html = '';
$script:copiedTextHtml = '';

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
$tableLayoutPanel.RowCount = 3
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.ColumnStyles.Add((New-Object System.Windows.Forms.ColumnStyle([System.Windows.Forms.SizeType]::Percent, 100)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::Percent, 75)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$tableLayoutPanel.RowStyles.Add((New-Object System.Windows.Forms.RowStyle([System.Windows.Forms.SizeType]::AutoSize)))
$form.Controls.Add($tableLayoutPanel)

$markdownInputLabel = Create-Control -type "Label" -text "Markdown:"
$markdownInputTextArea = Create-Control -type "TextBox" -text "" -isMultiline $true
$markdownInputTextArea.add_KeyDown({ Handle-KeyDown $markdownInputTextArea $_ })

$alwaysOnTopCheckbox = Create-Control -type "CheckBox" -text "Always on top"
$alwaysOnTopCheckbox.Add_Click({
    $form.TopMost = $alwaysOnTopCheckbox.Checked
})

$buttonPanel = New-Object System.Windows.Forms.FlowLayoutPanel
$buttonPanel.Dock = [System.Windows.Forms.DockStyle]::Fill
$buttonPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::LeftToRight

$clearButton = Create-Control -type "Button" -text "Clear"
$clearButton.Add_Click({
    $markdownInputTextArea.Clear()
})

$copyButtonMd = Create-Control -type "Button" -text "Copy md"
$copyButtonMd.Add_Click({
    $textToCopy = $markdownInputTextArea.Text
    if ($textToCopy -ne $script:copiedTextMd) {
        $script:copiedTextMd = $textToCopy
    }
    [System.Windows.Forms.Clipboard]::SetText($textToCopy)
    [System.Windows.Forms.MessageBox]::Show("Template copied to clipboard!")
})

$copyButtonHtml = Create-Control -type "Button" -text "Copy Html"
$copyButtonHtml.Add_Click({
    $textToCopy = $markdownInputTextArea.Text
    if ($textToCopy -ne $script:copiedTextMd_Html) {
        $script:copiedTextMd_Html = $textToCopy
        
        $output_html = Convert-MarkdownToHtml -MarkdownString $markdownInputTextArea.Text;
        # Remove the dash if it is at the beginning of the string
        $output_html = fill-template -html $output_html;
        $script:copiedTextHtml = $output_html
    } else {
        Write-Host "Text hasn't changed reusing Html output."
        $output_html = $script:copiedTextHtml;
    }
    Set-ClipboardHtml -html $output_html;
    [System.Windows.Forms.MessageBox]::Show("Template copied to clipboard!")
})

# Add controls to the form
$tableLayoutPanel.Controls.Add($markdownInputLabel, 0, 0)
$tableLayoutPanel.Controls.Add($markdownInputTextArea, 1, 0)
$tableLayoutPanel.Controls.Add($alwaysOnTopCheckbox, 1, 1)
$tableLayoutPanel.Controls.Add($buttonPanel, 0, 2)
$tableLayoutPanel.SetColumnSpan($buttonPanel, 2)

# Add buttons to the button panel
$buttonPanel.Controls.Add($clearButton)
$buttonPanel.Controls.Add($copyButtonMd)
$buttonPanel.Controls.Add($copyButtonHtml)

# Show the form
$form.ShowDialog()