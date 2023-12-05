# Passphrase Generator

Port of [rolandwarburton/pwgen](https://github.com/RolandWarburton/pwgen) which was written in go.

Unfortunately googles Manifest V3 does not have any reasonable support for
WASM so the portability of pwgen to the web was limited. Enter pwgen-js.

## Installing

```none
npm install @rolandwarburton/pwgen
```

## Example usage

```js
import { genpw } from 'pwgen';

console.log(genpw());
```

## Credits

[eff.org/dice](https://www.eff.org/dice) for a well authored word list.
