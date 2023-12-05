# Testing

To test if the exports of the library are working i use a new project `pwgen-js-test`.

```bash
# from the library code
node build.cjs
npm pack
mv pwgen-1.0.0.tgz ../pwgen-js-test/

# from the test code
cd ../pwgen-js-test
npm install pwgen-1.0.0.tgz
node index.js
```

```js
// pwgen-js-test/index.js
//
import { genpw } from 'pwgen';

console.log(genpw());
```
