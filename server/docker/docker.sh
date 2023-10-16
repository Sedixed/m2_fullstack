#!/bin/bash

# Create the database if not done, and migrate the database and load fixtures if the env is dev
php bin/console d:d:c
php bin/console d:m:m --env=dev --no-interaction

php bin/console cache:clear

# Start apache
exec apache2-foreground