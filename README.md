# Photon

UI toolkit for building desktop apps with Electron.

## Getting started

* Clone the repo with `git clone https://github.com/connors/photon.git`

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
photon/
├── css/
│   ├── photon.css
│   ├── photon.min.css
└── fonts/
    ├── photon-entypo.eot
    ├── photon-entypo.svg
    ├── photon-entypo.ttf
    └── photon-entypo.woff
```

## Development

1. Install node dependencies: `npm install`.
2. Open the app: `npm start`.

Modifying source Sass files? Open a second Terminal tab and run `grunt` to kick off a build the compiled `photon.css`.

## Running the documentation

1. Make sure you've installed [Jekyll](http://jekyllrb.com) with `gem install jekyll`
2. Run `grunt server` to build the docs and open the docs in your browser.

## License

Copyright @connors. Released under MIT.
