#!/usr/bin/env bash

echo "Running pre-push hook"
./scripts/run-eslint.bash

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Please fix all linting errors before pushing!"
 exit 1
fi

./scripts/run-tests.bash

if [ $? -ne 0 ]; then
 echo "All tests must pass before pushing!"
 exit 1
fi