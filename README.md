# Caesar cipher CLI app
App that implements Caesar cipher, one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.
## Build
```
npm run build
```
## Run
There are several required keys you need to run app:

**-a, --action** - action to perform, can be "encode" or "decode"

**-s, --shift** - number of alphabet positions to skip

Additional keys may be provided:

**-i, --input** - path to input file

**-o, --output** - path to output file

If no paths are specified, the app works with the console (receives input, prints output).

For example:
```
node dist/index.js -a "encode" -s 2 
```
## Test
Simply run all tests
```
npm run test
```
Check tests coverage
```
npm run test:coverage
```
