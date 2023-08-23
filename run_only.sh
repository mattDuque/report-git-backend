#!/bin/bash

if [ $# -lt 2 ]; then
	echo "./run_only.sh VERSAO PORTA_ACESSO CHAVE_MESTRE"
	echo
	echo "Ex.: ./run_only.sh 1.0.0 8071 42"
	echo
	echo
	exit 1
fi


VERSAO=$1
PORTAO=$2
CHAVE=$3

docker run -d --name mathduque/gerenciador-de-arquivos-${VERSAO}-${PORTAO} -p ${PORTAO}:80 -e MASTERTOKEN=${CHAVE} -v data:/data -v logs:/logs gerenciador-de-arquivos:${VERSAO}

docker logs -f mathduque/gerenciador-de-arquivos-${VERSAO}-${PORTAO}

