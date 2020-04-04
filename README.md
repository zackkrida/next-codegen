![next-codegen](./banner.png)

[![npm version](https://badge.fury.io/js/next-codegen.svg)](https://badge.fury.io/js/next-codegen)

> Notice: This is in **active development** and does not work yet.

Configurable code generation for [next.js](https://nextjs.org). Quickly create pages, api routes, components, and utility functions from the command line.

## Installation

It is reccommended to use `npx` and avoid installing entirely.

```shell
# or, installed globally
npm i -g next-codegen # yarn add -g next-codegen

# or, installed locally (alias with a package.json script "next-codegen" : "next-codegen")
npm --save-dev next-codegen # yarn add -D next-codegen
```

## Getting Started

```shell
npx next-codegen --init # next-codegen --init (if installed globally) or ./node_modules/.bin/next-codegen if installed locally
```

The first time you run `next-codegen` you will be prompted to configure your application with `next-codegen --init`. This command will generate a local `next-codegen.json` file which holds all the settings for your project. You may edit this file yourself anytime! Be sure to check it into your project if you want others to share your settings, or add it to your `.gitignore` if you only want to use `next-codegen` locally. See below for all of the avaliable features.

## Supported Settings

- `typescript`: Does your project use TypeScript?
  - Choices: `true`/`false`
- `srcDirectory`: Is your code located in a root `src/` directory?
  - Choices: `true`/`false`
- `fileCasing`: How your filenames are formatted
  - Choices: `camelCase`/`snakeCase`/`kebabCase`/`pascalCase`/`lowerCase`

### Example next-codegen.json

```json
{
  "typescript": true,
  "srcDirectory": false,
  "fileCasing": "pascalCase"
}
```
