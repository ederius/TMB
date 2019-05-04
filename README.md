# Tasks Management Backend (TMB)
> Backend for project TMB, is an platform for tasks management at differents clients and projects.


## Instalation

OS X, Windows and Linux:

```sh

npm install

```

## Environments

Describe how to up the server in the differents environments that management system and are development(development), Quality assurance (QA) and production(production).

```sh

//Production
NODE_ENV=production node app.js

//QA
NODE_ENV=QA node app.js

//development
NODE_ENV=developmet node app.js

```

## Tests

To run the unit tests, we must verify that our server is running in our local environment and install the dependencies of a development environment added to our package file.
```
    npm install --only=dev
```
We must also install mochaJs globally
```
    npm install mocha -g
```
To execute the tests we must position ourselves inside the project folder and execute

```
mocha
```

## Versions

* 1.0.0
    * In progress

## Meta

Eder Diaz Toro – [@ederius](https://github.com/ederius) – ederdiaz_@hotmail.com.

[https://github.com/ederius/TMB-backend.git](https://github.com/ederius/TMB-backend)

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square