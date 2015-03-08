# Origen

Sandbox tooling made with express, sass, grunt and love. Ready for Heroku deployment.

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`

## Quickstart

```bash
git clone git@github.com:nobuti/origen.git
npm install
```

While you're working on your project, run:

`grunt server`

And you're set!

## Directory Structure

  * `assets/`: Assets files like svgs or png for sprites.
  * `public/`: Public assets, linked from views. Includes stylesheets and javascripts folders.
  * `sass/`: Sass assets.
  * `views/`: Html views flawored as nunjucks files. Include partials folder.
  * `routes/`: Add your routes here.
  * `index.js`: Express file.
