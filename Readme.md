# Origen

Bootstrap tooling made with express, foundation, sass, grunt and love.

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io): Run `[sudo] npm install -g bower`

## Quickstart

```bash
git clone git@github.com:nobuti/origen.git
npm install && bower install
```

While you're working on your project, run:

`grunt server`

And you're set!

## Directory Structure
  
  * `assets/`: Bower files. Run grunt assets to copy just needed files.
  * `public/`: Public assets, linked from views. Includes stylesheets and javascripts folders.
  * `sass/`: Sass assets.
  * `views/`: Html views flawored as ejs files. Include partials folder.
  * `index.js`: Express file. Add route here.
