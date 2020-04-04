#!/usr/bin/env node

const args = process.argv.slice(2)
const { Plop, run } = require("plop")
const argv = require("minimist")(args)
const { readFileSync, writeFileSync } = require("fs")

if (argv.init) {
  // Check if they already have a config file
  if (!argv.force) {
    try {
      const configString = readFileSync(process.cwd() + "/next-codegen.json")
      console.info(
        "You already have a next-codegen.json file. If you really want to re-initialize, pass the --force flag."
      )
      process.exit()
    } catch (error) {}
  }

  console.info("Welcome to next-codegen!")
  console.info("> This is where I'll prompt for options.")
  writeFileSync(
    process.cwd() + "/next-codegen.json",
    JSON.stringify({ woah: true }, null, 2)
  )
  console.info("Created next-codegen.json! Run next-codegen to get started.")
  process.exit()
}

Plop.launch(
  {
    configPath: __dirname + "/plopfile.js",
  },
  run
)
