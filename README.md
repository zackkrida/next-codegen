![next-codegen](./banner.png)

> Notice: This is in **active development** and does not work yet.

Configurable code generation for [next.js](https://nextjs.org).

## Usage

```shell
# With npx (easiest, no installation required)
npx next-codegen

# or, installed globally
npm i -g next-codegen # yarn add -g next-codegen

# or, installed locally (alias with a package.json script "next-codegen" : "next-codegen")
npm --save-dev next-codegen # yarn add -D next-codegen
```

## Getting Started

The first time you run `next-codegen` you will be prompted to configure your application. This configuration will generate a local `.next-codegen.json` file which holds all the settings. You may edit this file yourself anytime! Be sure to check it into your project if you want others to share your settings, or add it to your `.gitignore` if you only want to use `next-codegen` locally.

## Supported Settings

- `typescript`: true/false
- `srcDirectory`: true/false
- `fileCasing`: camelCase,snakeCase,kebabCase,pascalCase,lowerCase
