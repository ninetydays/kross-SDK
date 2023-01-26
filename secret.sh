#!/bin/bash
env=$1
operation=$2

if [[ $operation = "encrypt" ]];
then
    gpg --symmetric --cipher-algo AES256 .env.$env
elif [[ $operation = "decrypt" ]];
then
    gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
    --output .env.$env .env.$env.gpg
else
    echo "usage: secret.sh [environment] [operation(encrypt|decrypt)]"
fi