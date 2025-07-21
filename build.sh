#!/bin/bash

curDir=$(realpath -- $(dirname -- $0))
vsce=$curDir/node_modules/vsce/vsce

[[ ! -f $vsce ]] && npm i

./node_modules/vsce/vsce package
