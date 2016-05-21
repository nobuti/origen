# Origen

Sandbox tooling made with express, sass, grunt and love. Ready for Heroku deployment.

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Gulp](http://gulpjs.com/): Run `[sudo] npm install --global gulp-cli`

## Quickstart

```bash
git clone git@github.com:nobuti/origen.git
npm install
```

While you're working on your project, run:

`gulp`

And you're set!

## Directory Structure

  * `assets/`: Assets files like images, javascripts or sass files.
  * `public/`: Public assets, linked from views. Includes stylesheets and javascripts folders. The static html files are served from this directory.
  * `views/`: Html views flawored as nunjucks files. Include partial and layout folders.
  * `index.js`: Express file.
  * `webpack.config.js`: Webpack config to bundle the js.
  * `Gulpfile.js`: Gulp task runner.

## Heroku support

Add the remote branch in heroku and then `npm run deploy`.
