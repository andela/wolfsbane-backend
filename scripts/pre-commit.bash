#!/usr/bin/env bash

echo "Running pre-commit hook"
./scripts/run-eslint.bash

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Linting errors must be fixed before commit!"
 exit 1
fi