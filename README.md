# deeplx-node
Port of [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX) (go) to Node.js. This is a native Node.js implementation and **not a wrapper** of the deeplx binary.

> Note: Another package called 'deeplx' exists on NPM but, compared to this package, it contains a lot more like a full CLI and the bloated 'got' http client package.

## installation
`npm i deeplx-node`

Requires Node.js 16+.

## usage
```ts
import Deeplx from 'deeplx-node'; // or "const { Deeplx } = require('deeplx-node')" for CJS.

const deeplx = new Deeplx();

deeplx.translate('hello world', 'en', 'nl').then(console.log); // ['hallo wereld']
```

See [examples](./examples/main.ts) for a full example in TypeScript, or clone this repository and try it out yourself: `npx ts-node ./examples/main.ts`.
