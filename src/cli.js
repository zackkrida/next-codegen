#!/usr/bin/env node
const {
  promises: { readFile },
} = require("fs")

const go = async () => {
  try {
    const configData = await readFile(process.cwd() + "/.next-codegen.json", {
      encoding: "utf-8",
    })
    const config = JSON.parse(configData)

    console.info("next-codegen is using the following settings:")
    console.info(config)
  } catch (error) {
    console.error("Unable to read your .next-codegen.json file. So sad!")
  }
}

go()
