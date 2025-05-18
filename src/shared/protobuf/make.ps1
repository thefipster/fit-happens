$ErrorActionPreference = "Stop"

$OUT_CS="..\\dotnet\\FitHappens.Domain.Journal\Messages"
$OUT_JS="..\\js\\domain-journal\\src"

protoc --plugin=protoc-gen-js=./node_modules/protoc-gen-js/bin/protoc-gen-js.exe `
       --csharp_opt=file_extension=.g.cs `
       --csharp_out=$OUT_CS `
       --js_out=import_style=commonjs,binary:$OUT_JS `
       ./protos/*.proto