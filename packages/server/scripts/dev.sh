#!/bin/sh
DOTENV_CONFIG_PATH=.env.local                    \
DOTENV_CONFIG_DEBUG=true                         \
node                                             \
    --import tsx \
    -r dotenv/config                             \
src/index.ts | pino-pretty