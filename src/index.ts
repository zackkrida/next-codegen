import { exists, prefixPath, write } from "./lib/file"
import { pascalCase } from "./lib/string"
import { noPageDirError, validPageDirs } from "./config"
import { prompt } from "./lib/prompt"
import { getTemplate } from "./lib/getTemplate"

import updateNotifier from "update-notifier"
const pkg = require("../package.json")
const notifier = updateNotifier({ pkg })

const app = async () => {
  const local = prefixPath(process.cwd())
  const pagesDir = validPageDirs.map(local).find(exists)
  if (!pagesDir) {
    console.log(noPageDirError)
    process.exit()
  }

  const data = await prompt()
  const usesTS = exists(local("tsconfig.json"))
  const isAPI = data.type === "api"
  const ext = usesTS ? `ts${isAPI ? "" : "x"}` : "js"
  const isDynamic = /\[\w*\]/.test(data.name) // Just checking for opening and closing bracket

  const name = pascalCase(
    isDynamic
      ? data.name
          .match(/\[(.*?)\]/g)
          .pop()
          .slice(1, -1)
      : data.name
  )

  const filePath = `${pagesDir}/${isAPI ? "api/" : ""}${data.name}.${ext}`
  const fileContents = getTemplate({
    isAPI,
    usesTS,
    name,
    isDynamic,
    dataFetcher: data.dataFetcher,
  })

  try {
    write({ path: filePath, data: fileContents })
    console.log(
      "\x1b[32m",
      "Success!",
      "\x1b[0m",
      `Created ${filePath.replace(process.cwd(), "")}`
    )
    process.exit()
  } catch (error) {
    if (error.code === "EEXIST") {
      console.info("The file already exists.")
    }
  } finally {
    notifier.notify()
  }
}
app()
