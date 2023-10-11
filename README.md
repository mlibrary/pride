# Pride
Pride is a JavaScript library that handles all communication between the front-end application and the U-M Library Search backend (via [Spectrum](https://github.com/mlibrary/spectrum)).

## Setup

```bash
npm install
```

## Build

```bash
npm run build
```

Things to safely ignore:

* `source/parser/early.js`: This is a javascript file fragment, it gets prepended to parser.js to set up the parser declaration.
* `source/parser/parser.js`: This is a pegjs compiled file, the errors aren't really something we have control over.

```bash
source/parser/early.js: line 1, col 14, Unexpected early end of program.
source/parser/early.js: line 2, col 1, Unrecoverable syntax error. (100% scanned).

2 errors
source/parser/parser.js: line 10, col 23, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 16, col 5, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 17, col 5, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 18, col 5, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 19, col 5, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 20, col 5, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 23, col 31, If a strict mode function is executed using function invocation, its 'this' value will be undefined.
source/parser/parser.js: line 41, col 17, Misleading line break before '?'; readers may interpret this as an expression boundary.
source/parser/parser.js: line 124, col 13, Misleading line break before '+'; readers may interpret this as an expression boundary.
source/parser/parser.js: line 125, col 13, Misleading line break before '+'; readers may interpret this as an expression boundary.
source/parser/parser.js: line 206, col 97, Missing semicolon.
source/parser/parser.js: line 216, col 97, Missing semicolon.
source/parser/parser.js: line 867, col 11, Misleading line break before '?'; readers may interpret this as an expression boundary.
source/parser/parser.js: line 877, col 5, Missing semicolon.

14 errors
```

## Making changes

1. Edit the javascript files in `source/`.
2. Build with `npm run build`.
3. Test as appropriate, and load `SpecRunner.html`.
4. Add and commit your changes, along with the built `pride.js`, `pride.min.js`, and `pride.execjs.js`.
