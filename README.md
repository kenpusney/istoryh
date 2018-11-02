# IstoryH


### Usage

```javascript
const {isto} = require('istoryh');

const hist = isto(10) // max capacity;


hist.push(123);
hist.push(456);

hist.list() // => [456, 123];
```