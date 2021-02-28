#!/usr/bin/env bash

# this is probably a bad idea.
echo "Don't worry if there is a little error here."
find . -path "*node_modules/@stoplight/ordered-object-literal/package.json" \
 -exec sh -c 'patch -s -f -r- $1 script/ool.patch' -- {} \;
 #-c patch -s -f -r-  ./node_modules/@stoplight/yaml/node_modules/@stoplight/ordered-object-literal/package.json script/ool.patch
echo "Done patching ool"


