Add-Type -Path ".\libraries\Microsoft.Sharepoint.2013.Client.16.1.0.0\lib\Microsoft.SharePoint.Client.dll"  
Add-Type -Path ".\libraries\Microsoft.Sharepoint.2013.Client.16.1.0.0\lib\Microsoft.SharePoint.Client.Runtime.dll" 

write-host "added type"

$siteURL = "https://test.sharepoint.com/sites/sampletwo"
$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($siteURL)  
write-host "testing"

#Not required for on premise site - Start  
$userId = "abc@abc.onmicrosoft.com"  
$pwd = Read-Host -Prompt "Enter password" -AsSecureString  
$creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($userId, $pwd)  
$ctx.credentials = $creds  
#Not required for on premise site - End

#Credentials for on premise site - Start  
$pwd = Read-Host -Prompt "Enter password" -AsSecureString  
$creds = New-Object System.Net.NetworkCredential("domain\userid", $pwd)  
$ctx.Credentials = $creds  
#Credentials for on premise site - End  

$pageFilePath = "D:\custom.master"  
$pageFilePath = Get-ChildItem $pageFilePath  
$fileBytes = [System.IO.File]::ReadAllBytes($pageFilePath.FullName) 

$newFileInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation  
$newFileInfo.Url = $pageFilePath.Name  
$newFileInfo.Content = $fileBytes  
$newFileInfo.Overwrite = $true 

$web = $ctx.Site.RootWeb  
$folder = $web.Lists.GetByTitle("Master Page Gallery")  
$masterPage = $folder.RootFolder.Files.Add($newFileInfo)  
$ctx.Load($web)  
$ctx.Load($masterPage)  
$ctx.ExecuteQuery()


#Check Out  
$masterPage.CheckOut()  
$ctx.Load($masterPage)  
$ctx.ExecuteQuery()  
#Check In and Publish  
$masterPage.CheckIn("Majorversion checkin",[Microsoft.SharePoint.Client.CheckinType]::MajorCheckIn)  
$ctx.Load($masterPage)  
$ctx.ExecuteQuery()  


$web.CustomMasterUrl = $masterPage.ServerRelativeUrl  
$web.MasterUrl = $masterPage.ServerRelativeUrl  
$web.Update()  
$ctx.Load($web)  
$ctx.ExecuteQuery() 