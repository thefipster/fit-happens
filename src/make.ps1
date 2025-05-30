param (
    [Parameter(Mandatory = $true)]
    [ValidateSet("build", "run", "push", "version", "setup", "clean")]
    [string]$Command,

    [Parameter(Mandatory = $true)]
    [ValidateSet("api", "web", "react")]
    [string]$Target
)

# Stop execution on all errors
$ErrorActionPreference = 'Stop'

# Don't display progress UI (some commands show progress bars that clutter logs)
$ProgressPreference = 'SilentlyContinue'


function Get-PackageJsonVersion {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Path
    )

    if (-Not (Test-Path -Path $Path)) {
        throw "File not found: $Path"
    }

    try {
        $packageJson = Get-Content -Path $Path -Raw | ConvertFrom-Json
        return $packageJson.version
    }
    catch {
        throw "Failed to read or parse package.json: $_"
    }
}

function Get-CsProjAssemblyVersion {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Path
    )

    if (-Not (Test-Path -Path $Path)) {
        throw "File not found: $Path"
    }

    [xml]$csprojXml = Get-Content $Path

    $assemblyVersionNode = $csprojXml.Project.PropertyGroup.AssemblyVersion | Where-Object { $_ }

    if ($assemblyVersionNode) {
        return $assemblyVersionNode
    }
    else {
        return $null
    }
}

function Version-Api {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )

    $version = Get-CsProjAssemblyVersion -Path ".\api\FitHappens.WebApi\FitHappens.WebApi.csproj"
    Write-Host "Api Version: $version"
}

function Setup-Api {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )

    Write-Host "Setup Api"
    winget install Microsoft.DotNet.SDK.8
}

function Clean-Api {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )

    Write-Host "Clean Api"
    winget uninstall Microsoft.DotNet.SDK.8
}

function Build-Api {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )

    Write-Host "Building Api"
    $version = Get-CsProjAssemblyVersion -Path ".\api\FitHappens.WebApi\FitHappens.WebApi.csproj"
    Write-Host "Version: $version"
    dotnet build 
}

function Run-Api {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Running api"
    $version = Get-CsProjAssemblyVersion -Path ".\api\FitHappens.WebApi\FitHappens.WebApi.csproj"
    Write-Host "Version: $version"
    docker compose build fit-api
    
}

function Push-Api {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Pushing api"
    $version = Get-CsProjAssemblyVersion -Path ".\api\FitHappens.WebApi\FitHappens.WebApi.csproj"
    Write-Host "Version: $version"
    docker compose build fit-api
    docker tag fit-happens/fit-api:latest registry.thefipster.com/fit-happens/fit-api:latest
    docker tag registry.thefipster.com/fit-happens/fit-api:latest registry.thefipster.com/fit-happens/fit-api:$version
    docker push registry.thefipster.com/fit-happens/fit-api:latest
    docker push registry.thefipster.com/fit-happens/fit-api:$version
}

function Version-Web {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    $version = Get-PackageJsonVersion -Path ".\shared\ts\package.json"
    Write-Host "Web Version: $version"
}

function Setup-Web {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Setup Web"
    Push-Location shared/ts
    npm install
    Pop-Location
}

function Clean-Web {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Clean Web"
    Write-Host "na mate, maybe later. Delete the node_modules folder yourself... its in shared/ts or something... thanks."

}

function Build-Web {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Building Web"
    $version = Get-PackageJsonVersion -Path ".\shared\ts\package.json"
    Write-Host "Version: $version"
    Push-Location shared/ts
    nx build fit-web
    Pop-Location
}

function Run-Web {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Running Web"
    $version = Get-PackageJsonVersion -Path ".\shared\ts\package.json"
    Write-Host "Version: $version"
    Push-Location shared/ts
    nx serve fit-web
    Pop-Location
}

function Push-Web {
    param (
        [Parameter(Mandatory = $true, Position = 0)]
        [string]$Args
    )
    Write-Host "Pushing Web"
    $version = Get-PackageJsonVersion -Path ".\shared\ts\package.json"
    Write-Host "Version: $version"
    docker compose build fit-web
    docker tag fit-happens/fit-web:latest registry.thefipster.com/fit-happens/fit-web:latest
    docker tag registry.thefipster.com/fit-happens/fit-web:latest registry.thefipster.com/fit-happens/fit-web:$version
    docker push registry.thefipster.com/fit-happens/fit-web:latest
    docker push registry.thefipster.com/fit-happens/fit-web:$version
}

switch ($Command) {
    "setup" {
        switch ($Target) {
            "api" { Setup-Api -Args "." }
            "web" { Setup-Web -Args "." }
        }
    }
    "build" {
        switch ($Target) {
            "api" { Build-Api -Args "." }
            "web" { Build-Web -Args "." }
        }
    }
    "run" {
        switch ($Target) {
            "api" { Run-Api -Args "." }
            "web" { Run-Web -Args "." }
        }
    }
    "push" {
        switch ($Target) {
            "api" { Push-Api -Args "." }
            "web" { Push-Web  -Args "." }
        }
    }
    "clean" {
        switch ($Target) {
            "api" { Clean-Api -Args "." }
            "web" { Clean-Web  -Args "." }
        }
    }
    "version" {
        switch ($Target) {
            "api" { Version-Api -Args "." }
            "web" { Version-Web  -Args "." }
        }
    }
}