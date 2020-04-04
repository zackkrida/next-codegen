# next-gen

> This is in **active development** and does not work yet.

Configurable code generation for [next.js](https://nextjs.org).

## Usage

```shell
# With npx (easiest, no installation required)
npx next-gen

# or, installed globally
npm i -g next-gen # yarn add -g next-gen

# or, installed locally (alias with a package.json script "next-gen" : "next-gen")
npm --save-dev next-gen # yarn add -D next-gen
```

## Getting Started

The first time you run `next-gen` you will be prompted to configure your application. This configuration will generate a local `.nextplop.json` file which holds all the settings. You may edit this file yourself anytime! Be sure to check it into your project if you want others to share your settings, or add it to your `.gitignore` if you only want to use `next-gen` locally.

## Supported Settings

- `typescript`: true/false
- `srcDirectory`: true/false
- `fileCasing`: camelCase,snakeCase,kebabCase,pascalCase,lowerCase
