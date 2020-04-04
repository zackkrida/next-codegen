// Try to read our config
const { readFileSync } = require("fs")
const rootDir = process.env.INIT_CWD || process.cwd()

let config = {}

try {
  const configString = readFileSync(rootDir + "/next-codegen.json", {
    encoding: "utf-8",
  })
  config = JSON.parse(configString)
} catch (error) {
  console.warn(
    "No local config file (next-codegen.json) found. Run `next-codegen init` to create one!"
  )
  process.exit(0)
}

const {
  typescript = false,
  srcDirectory = false,
  fileCasing = "pascalCase",
} = config

/**
 * This is the list of our plop generators
 */
module.exports = (/** @type import("plop").NodePlopAPI */ plop) => {
  plop.setGenerator("page", pageHelper())
  plop.setGenerator("api", apiHelper())
}

// Get extension based on user typescript setting
const extension = (jsx = false) =>
  `${typescript ? "ts" : "js"}${typescript && jsx ? "x" : ""}`

/**
 * Helper function to get js/ts templates
 * @param {*} name
 */
const getPlopTemplate = (name = "", jsx = false) => {
  return `templates/${name}.${extension(jsx)}.hbs`
}

/**
 * pageHelper
 *
 * Configuration for generating Next.js pages
 */
const pageHelper = () => {
  const basePath = srcDirectory ? `src/pages/` : `pages/`
  const filename = `{{${fileCasing} name}}`
  const path = `${basePath}/${filename}.${extension(true)}`
  const template = getPlopTemplate("page", true)

  return {
    description: "A new page in our Next.js application",
    prompts: [
      {
        type: "input",
        name: "name",
        message: `Page name`,
      },
    ],
    actions: (prompts) => {
      return [
        {
          type: "add",
          path: path,
          templateFile: template,
        },
      ]
    },
  }
}

/**
 * pageHelper
 *
 * Configuration for generating Next.js API routes
 */
const apiHelper = () => {
  const basePath = srcDirectory ? `src/pages/api` : `pages/api`
  const filename = `{{${fileCasing} name}}`
  const path = `${basePath}/${filename}.${extension(false)}`
  const template = getPlopTemplate("api")

  return {
    description: "An api route in our Next.js application",
    prompts: [{ type: "input", name: "name", message: "Route name" }],
    actions: (prompts) => {
      return [
        {
          type: "add",
          path: path,
          templateFile: template,
        },
      ]
    },
  }
}
