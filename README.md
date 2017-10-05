# go-web-starter

This is a starter project for building web applications with Go, HTML, Typescript and SCSS.

The setup uses:

- Webpack (to process html, typescript and scss files and to automatically refresh the browser when any file changes)
- Gin (to live-reload the go web app)

The Go app resides in `src/app`, the Go templates in `templates`, the typescript scripts in `static/scripts` and the styles in `static/styles`

The setup assumes that the root directory of this project is in the `GOPATH`.

The setup requires the following installed on the system:

- Node.js, NPM and optionally, Yarn
- Gin (the live-reload utility, not the framework)

Intialize the project by executing:

```
yarn (or `npm install`, if you don't have Yarn installed)
```

To start developing,

```
yarn dev (or `npm run dev`, if you don't have Yarn installed)
```

To build the project,

```
yarn build (or `npm run build`, if you don't have Yarn installed)
```
