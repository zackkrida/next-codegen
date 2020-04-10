export declare enum StringFormats {
  CamelCase = "camelCase",
  SnakeCase = "snakeCase",
  KebabCase = "kebabCase",
  PascalCase = "pascalCase",
  LowerCase = "lowerCase",
}

import { noCase, paramCase } from "change-case"

export { camelCase, pascalCase, snakeCase } from "change-case"
export const lowerCase = str => noCase(str).replace(/\s/g, str)
export const kebabCase = paramCase
