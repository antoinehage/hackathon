#!/bin/bash

# YP LABS
#HOST="104.130.225.44"
HOST="127.0.0.1"

mongo ./import.js --host ${HOST}
