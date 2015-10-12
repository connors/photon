# Photon

UI toolkit for building desktop apps with Electron.

## Getting started

* Clone the repo with `git clone https://github.com/connors/photon.git`
* [Read the docs](http://photonkit.com) to learn about the components and how to get your new application started

Take note that our master branch is our active, unstable development branch and that if you're looking to download a stable copy of the repo, check the [tagged downloads](https://github.com/connors/photon/tags).

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
photon/
├── css/
│   ├── photon.css
│   ├── photon.min.css
├── fonts/
│   ├── photon-entypo.eot
│   ├── photon-entypo.svg
│   ├── photon-entypo.ttf
│   └── photon-entypo.woff
└── template-app/
    ├── js/
    │   └── menu.js
    ├── app.js
    ├── index.html
    └── package.json
```

We provide compiled CSS (`photon.*`), as well as the minified CSS. We also include the Entypo fonts and a template Electron application for you to quickly get started.

## Documentation

Photon's documentation is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <http://photonkit.com>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.5.x).
  * **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. Install the Ruby-based syntax highlighter, [Rouge](https://github.com/jneen/rouge), with `gem install rouge`.
3. From the root `/photon` directory, run `jekyll serve` in the command line.
4. Open <http://localhost:4000> in your browser, and boom!

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

## Contributing

Please file a GitHub issue to [report a bug](https://github.com/connors/photon/issues). When reporting a bug, be sure to follow the [contributor guidelines](https://github.com/connors/photon/blob/master/CONTRIBUTING.md).


## Development

1. Install node dependencies: `npm install`.
2. Open the example app: `npm start`.

Modifying source Sass files? Open a second Terminal tab and run `grunt` to kick off a build the compiled `photon.css`.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Photon is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility **bumps the major** while resetting minor and patch
* New additions without breaking backward compatibility **bumps the minor** while resetting the patch
* Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## Maintainers

Connor Sears

* <https://twitter.com/connors>
* <https://github.com/connors>

## License

Copyright @connors. Released under MIT.
