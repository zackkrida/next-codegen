import { map, find, test } from "ramda"
import { exists, prefixPath, write } from "./lib/file"
import { pascalCase } from "./lib/string"
import { noPageDirError, validPageDirs } from "./config"
import { prompt } from "./lib/prompt"
import * as getApiTemplates from "./templates/api"
import * as getPageTemplates from "./templates/page"

const getTemplate = ({
  isAPI,
  usesTS,
  name,
  isDynamic,
  dataFetcher,
}: {
  isAPI: boolean
  usesTS: boolean
  name: string
  isDynamic: boolean
  dataFetcher: string | null
}) => {
  const choices = {
    api: getApiTemplates[usesTS ? "TS" : "JS"],
    page: getPageTemplates[usesTS ? "TS" : "JS"],
  }

  return choices[isAPI ? "api" : "page"]({ name, isDynamic, dataFetcher })
}

// ~~~~~~~~~~~~~~~~~~~~~~ APP TIME BABY ~~~~~~~~~~~~~~~~~~~~~~~~~
const app = async () => {
  const getLocal = prefixPath(process.cwd())
  const publicDir = find(exists, map(getLocal, validPageDirs))
  if (!publicDir) {
    console.log(noPageDirError)
    process.exit(1)
  }

  // { type: 'page', name: 'about-is', dataFetcher: 'getStaticProps' }
  const data = await prompt()

  const usesTS = exists(getLocal("tsconfig.json"))
  const isAPI = data.type === "api"
  const extension = usesTS ? `ts${isAPI ? "" : "x"}` : "js"
  const isDynamic = test(/\[\w*\]/, data.name) // Just checking for opening and closing bracket
  const name = pascalCase(isDynamic ? data.name : data.name.split("/")[0])

  const filePath = `${publicDir}/${isAPI ? "api/" : ""}${
    data.name
  }.${extension}`
  const fileContents = getTemplate({
    isAPI,
    usesTS,
    name,
    isDynamic,
    dataFetcher: data.dataFetcher,
  })

  try {
    write({ path: filePath, data: fileContents })
  } catch (error) {
    if (error.code === "EEXIST") {
      console.info("The file already exists.")
    }
  }

  process.exit()
}
app()
