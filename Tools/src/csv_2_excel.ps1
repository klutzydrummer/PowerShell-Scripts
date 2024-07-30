# Add required assembly for WinForms
Add-Type -AssemblyName System.Windows.Forms

# Create a new form
$form = New-Object System.Windows.Forms.Form
$form.Text = "Open csv in Excel"
$form.Size = New-Object System.Drawing.Size(400, 300)
$form.StartPosition = "CenterScreen"

# Create a multiline text box
$textBox = New-Object System.Windows.Forms.TextBox
$textBox.Multiline = $true
$textBox.ScrollBars = "Vertical"
$textBox.Size = New-Object System.Drawing.Size(360, 200)
$textBox.Location = New-Object System.Drawing.Point(10, 10)
$textBox.Anchor = [System.Windows.Forms.AnchorStyles]::Top -bor [System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Left -bor [System.Windows.Forms.AnchorStyles]::Right

# Create "Open in Excel" button
$btnOpenInExcel = New-Object System.Windows.Forms.Button
$btnOpenInExcel.Text = "Open in Excel"
$btnOpenInExcel.Size = New-Object System.Drawing.Size(100, 30)
$btnOpenInExcel.Location = New-Object System.Drawing.Point(10, 220)
$btnOpenInExcel.Anchor = [System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Left

# Create "Clear" button
$btnClear = New-Object System.Windows.Forms.Button
$btnClear.Text = "Clear"
$btnClear.Size = New-Object System.Drawing.Size(100, 30)
$btnClear.Location = New-Object System.Drawing.Point(120, 220)
$btnClear.Anchor = [System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Left

# Add event handler for "Open in Excel" button
$btnOpenInExcel.Add_Click({
    $datetimeString = Get-Date -Format "yyyyMMddHHmmss"
    $tempFilePath = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "text_to_excel_$($datetimeString).csv")
    $textBox.Text -split "`r`n" | ForEach-Object { $_ -replace "`t", "," } | Set-Content -Path $tempFilePath
    Start-Process excel $tempFilePath
})

# Add event handler for "Clear" button
$btnClear.Add_Click({
    $textBox.Clear()
})

# Add controls to the form
$form.Controls.Add($textBox)
$form.Controls.Add($btnOpenInExcel)
$form.Controls.Add($btnClear)

# Show the form
$form.Add_Shown({$form.Activate()})
[void] $form.ShowDialog()