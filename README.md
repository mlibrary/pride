# Pride
Pride is a JavaScript library that handles all communication between the [University of Michigan Library Search](https://search.lib.umich.edu/everything)'s [front-end application](https://github.com/mlibrary/search) and the [backend](https://github.com/mlibrary/spectrum).

## Setup

```bash
npm install
```

## Build

```bash
npm run build
```

All files that are included in the build are found under `src/`. The directory is organized by object property. Examples:
* `Pride.init` is found in `src/Pride/init.js`
* `Pride.Util` is found in `src/Pride/Util/index.js`
* `Pride.Util.escape` is found in `src/Pride/Util/escape.js`

The `pride.min.js` build is used for applications that include `pride`. The `pride.js` build is used for testing.

## Unit Tests

```bash
npm run test
```

The organization of the `spec/` directory mirrors the `src/` directory. Each test file ends in `.spec.js`.

## Testing in Search

1. Clone [mlibrary/search](https://github.com/mlibrary/search).
    ```bash
    gh repo clone mlibrary/search
    ```
2. Navigate to the repository and open the `package.json` file. Edit the dependency URL for `pride` to point to your local `pride` repository.
    ```bash
    "pride": "file:../pride",
    ```
    Note: If you want to test a specific branch, add `#` followed by the branch name to the end of the URL.
    ```bash
    "pride": "git+https://github.com/mlibrary/pride.git#your-branch-here",
    ```
3. Install
    ```bash
    npm install
    ```
    Note: If this is not a fresh clone, do a clean install.
    ```bash
    rm -rf node_modules && package-lock.json && npm install
    ```
4. Run locally
    ```bash
    npm start
    ```

While Search is running locally, [the site](http://localhost:3000/) will automatically refresh whenever `pride.min.js` changes.
