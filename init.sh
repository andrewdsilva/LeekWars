#!/bin/bash

path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/"

echo "Installing modules in $path"

npm install request                   --prefix $path
npm install fs                        --prefix $path
npm install fs-extra                  --prefix $path