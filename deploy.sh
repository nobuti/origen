#!/bin/bash

# Script deploy to heroku
DEPLOYDATE=`date +"%d-%m-%y %T"`
git add -A
git commit -m "Deploy $DEPLOYDATE"
git push
git pull heroku master
git push heroku master
heroku open
