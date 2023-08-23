
#!/bin/bash

VERSAO=$(jq -r '.version' package.json)

echo "Building mathduque/gerenciador-de-arquivos:$VERSAO$3..."
docker build -t gerenciador-de-arquivos:$VERSAO$3 .
