# go-web-starter

[![Greenkeeper badge](https://badges.greenkeeper.io/kulshekhar/go-web-starter.svg)](https://greenkeeper.io/)

This is a starter project for building web applications with Go, HTML, Typescript and SCSS.

The setup uses:

- Webpack (to process html, typescript and scss files and to automatically refresh the browser when any file changes)
- Gin (to live-reload the go web app)

During development, changing any of the following will refresh your app in the browser:

- HTML templates
- Typescript scripts
- SCSS styles
- Go source code (the refresh with this might be a bit slower compared to the other file types. This is because the go app is built and run after every change)

The Go app resides in `src/app`, the Go templates in `templates`, the typescript scripts in `static/scripts` and the styles in `static/styles`

The setup assumes that the root directory of this project is in the `GOPATH`.

The setup requires the following installed on the system:

- Node.js (version 8 min), NPM and optionally, Yarn
- Gin (the live-reload utility, not the framework)

Intialize the project by executing:

```
yarn (or `npm install`, if you don't have Yarn installed)
```

To start developing,

```
yarn dev (or `npm run dev`, if you don't have Yarn installed)
```

You can access your app at http://localhost:3000

To build the project,

```
yarn build (or `npm run build`, if you don't have Yarn installed)
```
