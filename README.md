# React boilerplate

## Aliases

You can use aliases for src sub paths.

Aliases described in `jsconfig.json` and in webpack configs.

If you want to add custom alias, keep in memory that you need to do it in `config/aliases.js` and in `jsconfig.json`

Note: If they didn't work in WebStorm just specify path to webpack config manually in WebStorm settings. In VSCode aliases work from the box.

## Development

Provide environment variables into `.env` file (see `.env.example`)

Available scripts:

|    Script     |                    Description                     |
| :-----------: | :------------------------------------------------: |
|     start     |       Run webpack dev server for development       |
| static:icons  | Generate icon font, icons placed at `assets/icons` |
| static:images |          Minify images from `assets/img`           |
|    lint:js    |                     Run eslint                     |
|  lint:style   |                   Run stylelint                    |
|    format     |             Format files with prettier             |
|   dep-list    |    Print production dependencies list to shell     |
|     build     |            Create build of application             |

## Deployment details

For build project on server you should follow these steps:

- Install nodejs

```shell script
sudo apt-get update
sudo apt-get install nodejs npm
```

- Clone repository

```shell script
git clone $REPOSITORY_URL$
```

- Create `.env` file and provide environment variables (use repository `env.example` as template)

- Install dependencies and build project

```shell script
cd $PROJECT_DIR$

npm cache clean
rm -rf node_modules
npm install

npm run build
```

- Build will be in `./dist` folder

## Dependencies

```shell script
├── axios@0.19.1
│   Promise based HTTP client for the browser and node.js
│   https://github.com/axios/axios
├── classnames@2.2.6
│   A simple utility for conditionally joining classNames together
│   https://github.com/JedWatson/classnames#readme
├── normalize.css@8.0.1
│   A modern alternative to CSS resets
|   https://github.com/necolas/normalize.css.git
│   https://necolas.github.io/normalize.css
├── react@16.12.0
│   React is a JavaScript library for building user interfaces.
│   https://reactjs.org/
├── react-dom@16.12.0
│   React package for working with the DOM.
│   https://reactjs.org/
├── react-flatpickr@3.9.1
│   flatpickr for React
│   https://github.com/coderhaoxin/react-flatpickr#readme
├── react-modal@3.11.1
│   Accessible modal dialog component for React.JS
│   https://github.com/reactjs/react-modal
├── react-router-dom@5.1.2
│   DOM bindings for React Router
│   https://github.com/ReactTraining/react-router#readme
├── react-select@3.0.8
│   A Select control built with and for ReactJS
│   https://github.com/JedWatson/react-select#readme
├── react-tabs@3.1.0
│   An accessible and easy tab component for ReactJS
│   https://github.com/reactjs/react-tabs
├── react-tippy@1.3.1
│   React tippy
│   https://github.com/tvkhoa/react-tippy
└── react-toastify@5.5.0
    React notification made easy
    https://github.com/fkhadra/react-toastify#readme
```
