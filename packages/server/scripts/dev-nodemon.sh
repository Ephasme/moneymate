#!/bin/sh
nodemon --watch 'src' \
        --watch '.yalc' \
        --watch '.env.local' \
        -e 'js,jsx,ts,tsx' \
        --exec "./scripts/dev.sh"