bin/bash
# Script deploy to heroku
DEPLOYDATE=`date +"%d-%m-%y %T"`
git pull heroku master
git add -A
git commit -m "Deploy $DEPLOYDATE"
git push heroku master
heroku open
