bin/bash
# Script deploy to heroku
DEPLOYDATE=`date +"%d-%m-%y %T"`
HEROKUPATH=../bemate-playground
BUILDPATH=./build/
( cd $HEROKUPATH ; git pull heroku master )
cp -r $BUILDPATH $HEROKUPATH
( cd $HEROKUPATH ; git add -A ; git commit -m "Deploy $DEPLOYDATE" ; git push heroku master ; heroku open)
