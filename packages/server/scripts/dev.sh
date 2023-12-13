#!/bin/sh
DOTENV_CONFIG_PATH=.env.local                    \
DOTENV_CONFIG_DEBUG=true                         \
node                                             \
    -r dotenv/config                             \
    -r ts-node/register                          \
    --inspect                                    \
src/index.ts | pino-pretty