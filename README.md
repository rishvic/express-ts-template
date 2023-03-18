# express-ts-template

An Express template, written in TypeScript.

## Dependencies

To install dependencies, run `yarn install`.

## Building

### Development Server

To run the hot-reload dev server, run

```shell
yarn dev
```

### Production Build

To run the production server, first build the production build, then run it:

```shell
yarn build

# Enable source maps, so that reported errors point to actual source
NODE_OPTIONS=--enable-source-maps yarn start
```
