# Overview
Monthly dependency update to help maintain Pride.

## NPM
These dependencies have been updated to their latest versions:
- `esbuild`
- `eslint`
- `eslint-config-standard`
- `eslint-plugin-import`
- `eslint-plugin-n`
- `eslint-plugin-promise`
- `pegjs`
- `reqwest`
- `underscore`

## Testing
1. Install the updated packages (`npm install`).
2. Build the repository (`npm run build`).
3. Open `./spec/index.html` in the browser to see if all tests pass.
4. Navigate to your local [Search repository](https://github.com/mlibrary/search) and test the newly generated files:
   1. Open `./package.json` and add `#branch-name-of-pull-request` at the end of the `pride` dependency URL:
      ```bash
      "pride": "git+https://github.com/mlibrary/pride.git#branch-name-of-pull-request"
      ``` 
   2. Do a clean install of Search:
      ```bash
      rm -rf node_modules && rm package-lock.json && npm install
      ``` 
   3. Start Search (`npm start`) and look around [the site](http://localhost:3000/everything). Check to see if there are any console errors, and everything still works as expected.
5. Make sure the PR is consistent in these browsers:
   * [x] Chrome
   * [x] Firefox
   * [x] Safari
   * [x] Edge
