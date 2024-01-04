# CSV Column 1 is path, subsequent column labels are sharepoint group names, and the values are the permission levels
# CSV Example:
# Paths,Executive Team,HR Executive,HR Working,Recruiting,Contracts,Ops,Mkting,IT,Finance
# directory,Full Control,None,Full Control,Full Control,Full Control,Full Control,Full Control,Full Control,Full Control
# directory/subdirectory,Full Control,None,Full Control,Full Control,Full Control,Full Control,Full Control,Full Control


# Path to the CSV file containing the permissions data
$csvPath = "C:\Temp\paths_and_permissions.csv"

# Read CSV file
$data = Import-Csv $csvPath

# Usage Example
$siteUrl = "https://contoso.sharepoint.com/sites/example-site"
$SiteUrl = $siteUrl
$ListName = "Shared Documents"
Connect-PnPOnline -Url $siteUrl -Interactive # -UseWebLogin

function Get-SPFolderPermissions {
    param (
        [string]$ListName,
        [string]$RelativeFilePath
    )
    $FilePath = "/$($ListName)/$($RelativeFilePath)"
    $item = Get-PnPFolder $FilePath
    Get-PnPProperty $item -Property UniqueId | Out-Null
    $ListItem = Get-PnpListItem -UniqueId $item.UniqueId.toString() -List $ListName
    $ListItemPermissions = Get-PnPListItemPermission -List $ListName -Identity $ListItem.Id
    $itemPermissionHashTable = @{}
        foreach ($permissionItem in $ListItemPermissions.Permissions) {
            $GroupName = $permissionItem.PrincipalName
            $Permissions = $permissionItem.PermissionLevels.Name
            if ($permissionItem.PermissionLevels.Name.GetType().Name -eq "Object[]") {
                $itemPermissionHashTable[$GroupName] = $Permissions[0]
            }
            else {
                $itemPermissionHashTable[$GroupName] = $Permissions
            }
        }
    return $itemPermissionHashTable
}

function Set-SPFolderPermissions {
    param(
        [string]$ListName,
        [string]$RelativeFilePath,
        $PermissionHashTable,
        $Silent = $false
    )
    try {
        
        if (!($Silent)) {
            Write-Output "$RelativeFilePath"
        }
        $FilePath = "/$($ListName)/$($RelativeFilePath)"
        $item = Get-PnPFolder $FilePath
        Get-PnPProperty $item -Property UniqueId | Out-Null
        $ListItem = Get-PnpListItem -UniqueId $item.UniqueId.toString() -List $ListName
        $existingItemPermissionHashTable = Get-SPFolderPermissions -ListName $ListName -RelativeFilePath $RelativeFilePath
        if (!($Silent)) {
            Write-Output "    Existing Permissions:"
            foreach ($permission in $existingItemPermissionHashTable.GetEnumerator()) {
                $GroupName = $permission.Name
                $PermissionLevel = $permission.Value
                Write-Output "        $GroupName`: $PermissionLevel"
            }
        }
        foreach ($permission in $PermissionHashTable.GetEnumerator()) {
            $GroupName = $permission.Name
            $PermissionLevel = $permission.Value
            if ($existingItemPermissionHashTable.ContainsKey($GroupName)) {
                $ExistingPermissionLevel = $existingItemPermissionHashTable[$GroupName]
                if ($ExistingPermissionLevel -ne $PermissionLevel) {
                    if (!($Silent)) {
                        Write-Output "    Updating permissions for $GroupName"
                    }
                    Set-PnPListItemPermission -List $ListName -Identity $ListItem.Id -Group $GroupName -RemoveRole $ExistingPermissionLevel
                    if ($PermissionLevel -ne "None") {
                        Set-PnPListItemPermission -List $ListName -Identity $ListItem.Id -Group $GroupName -AddRole $PermissionLevel
                    }
                }
            }
            else {
                if ($PermissionLevel -ne "None") {
                    if (!($Silent)) {
                        Write-Output "    Adding permissions for $GroupName"
                    }
                    Set-PnPListItemPermission -List $ListName -Identity $ListItem.Id -Group $GroupName -AddRole $PermissionLevel
                }
            }
        }
        Invoke-PnPQuery
        if (!($Silent)) {
            Write-Output "    Permissions updated for $RelativeFilePath"
        }
    }
    catch {
        Write-Output "$RelativeFilePath"
    }
}

# pre-existing groups to remove
$removeGroups = @("file-structure-pilot Visitors", "file-structure-pilot Members")
$removeGroupsPermissions = @{}
foreach ($group in $removeGroups) {
    $removeGroupsPermissions[$group] = "None"
}

$ListName = "Shared Documents"

# Iterate through each row
foreach ($row in $data) {
    $RelativeFilePath = $row.Paths # .Replace("/", "\")

    # Set SharePoint permissions for each group
    $columns = $row.PSObject.Properties
    $groupHashTable = @{}
    foreach ($column in $columns) {
        if ($column.Name -ne "Paths") {
            # Extract the group name and permission value
            $groupHashTable[$column.Name] = $column.Value
        }
    }
    Set-SPFolderPermissions -ListName $ListName -RelativeFilePath $RelativeFilePath -PermissionHashTable $groupHashTable -Silent $true
}

