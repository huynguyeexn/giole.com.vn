#!/bin/sh
if find "./node_modules" -type d -print -quit | grep -q . ; then
    if [ -z `find ./node_modules/ -type d -empty` ]; then
       yarn dev
    else
        yarn install && yarn dev
    fi
else
    yarn install && yarn dev
fi