import { prompt, PromptObject } from "prompts"
import { promises } from "fs"
import { StringFormats } from "./stringFormatters"

const userDir = process.cwd()
const fileName = "next-codegen.json"

const path = `${userDir}/${fileName}`
const questions: PromptObject[] = [
  {
    name: "typescript",
    type: "confirm",
    message: "Does your app use typescript?",
    initial: false,
  },
  {
    name: "srcDirectory",
    type: "confirm",
    message: "Is your code located in a root src/ directory?",
    initial: false,
  },
  // {
  //   name: "componentNameCasing",
  //   type: "select",
  //   message: "How do you want your component names cased?",
  //   choices: [
  //     { title: "camelCase", value: "camelCase" },
  //     { title: "snake_case", value: "snakeCase" },
  //     { title: "kebab-case", value: "kebabCase" },
  //     { title: "PascalCase", value: "pascalCase" },
  //     { title: "lowercase", value: "lowerCase" },
  //   ],
  // },
]
const get = async () => await promises.readFile(path, { encoding: "utf-8" })
const write = async data =>
  promises.writeFile(path, JSON.stringify(data, null, 2))

export default {
  path,
  questions,
  get,
  write,
  prompt: async () => await prompt(questions),
  messages: {
    success: `Successfully wrote config to ${path}`,
    fail: `There was a problem saving your config file.`,
  },
}

export declare interface UserConfig {
  typescript: boolean
  srcDirectory: boolean
  // componentNameCasing: keyof StringFormats
}
