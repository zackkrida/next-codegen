export declare enum StringFormats {
    CamelCase = "camelCase",
    SnakeCase = "snakeCase",
    KebabCase = "kebabCase",
    PascalCase = "pascalCase",
    LowerCase = "lowerCase"
}
import { paramCase } from "change-case";
export { camelCase, pascalCase, snakeCase } from "change-case";
export declare const lowerCase: (str: any) => string;
export declare const kebabCase: typeof paramCase;
