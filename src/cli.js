#!/usr/bin/env node

const args = process.argv.slice(2)
const { Plop, run } = require("plop")
const argv = require("minimist")(args)
const { readFileSync, writeFileSync } = require("fs")
const inquirer = require("inquirer")
const configPrompt = inquirer.createPromptModule()

const go = async () => {
  if (argv.init) {
    // Check if they already have a config file
    if (!argv["force-init"]) {
      try {
        const configString = readFileSync(process.cwd() + "/next-codegen.json")
        console.info(
          "You already have a next-codegen.json file. If you really want to re-initialize, pass the --init and --force-init flags."
        )
        process.exit()
      } catch (error) {}
    }

    console.info("Welcome to next-codegen!")

    const answers = await configPrompt([
      {
        type: "confirm",
        name: "typescript",
        message: "Does your app use TypeScript?",
        default: false,
      },
      {
        type: "confirm",
        name: "srcDirectory",
        message: "Is your code located in a root src/ directory?",
        default: false,
      },
      {
        type: "list",
        name: "fileCasing",
        message: "How do you want your files names cased?",
        choices: [
          { name: "camelCase", value: "camelCase" },
          { name: "snake_case", value: "snakeCase" },
          { name: "kebab-case", value: "kebabCase" },
          { name: "PascalCase", value: "pascalCase" },
          { name: "lowercase", value: "lowerCase" },
        ],
      },
    ])

    if (answers) {
      writeFileSync(
        process.cwd() + "/next-codegen.json",
        JSON.stringify(answers, null, 2)
      )
      console.info(
        "Created next-codegen.json! Run next-codegen to get started."
      )
      process.exit()
    }
  }

  Plop.launch(
    {
      configPath: __dirname + "/plopfile.js",
    },
    run
  )
}

go()
