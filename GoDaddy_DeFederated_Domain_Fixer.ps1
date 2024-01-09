# GoDaddy De-Federated Domain Fixer
Connect-MsolService

$DeletedDomain = Read-Host "Enter the deleted domain name (e.g. contoso.com)"
$RestoreDomain = Read-Host "Enter the domain name to restore (e.g. contoso.onmicrosoft.com)"

$DeletedUsers = Get-MsolUser -All -ReturnDeletedUsers | Where {$_.UserPrincipalName -like "*@$($DeletedDomain)"}
foreach ($user in $DeletedUsers) {
    $newUpn = $user.UserPrincipalName.Replace($DeletedDomain, $RestoreDomain)
    Restore-MsolUser -UserPrincipalName $user.UserPrincipalName -AutoReconcileProxyConflicts -NewUserPrincipalName $newUpn
}
