#!/bin/bash

echo 'What is your Gravatar password?'

read password;

echo ''

echo 'Your ciphertext is:'

echo ${password} | openssl rsautl -encrypt -inkey rsa.public -pubin | base64 -w 0

echo ''