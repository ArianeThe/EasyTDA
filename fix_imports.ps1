$files = Get-ChildItem -Path app -Include *.ts, *.tsx -Recurse
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $n = $c.Replace("'@/src/", "'@/").Replace('"@/src/', '"@/')
    if ($n -ne $c) {
        [System.IO.File]::WriteAllText($f.FullName, $n)
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "Done."
