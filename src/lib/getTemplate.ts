import * as getApiTemplates from "../templates/api"
import * as getPageTemplates from "../templates/page"

export const getTemplate = ({
  isAPI,
  usesTS,
  name,
  isDynamic,
  dataFetcher,
}: GetTemplateProps) => {
  const choices = {
    api: getApiTemplates[usesTS ? "TS" : "JS"],
    page: getPageTemplates[usesTS ? "TS" : "JS"],
  }

  return choices[isAPI ? "api" : "page"]({ name, isDynamic, dataFetcher })
}

type TemplateProps = {
  name: string
  isDynamic: boolean
  dataFetcher: string | null
}

type GetTemplateProps = { isAPI: boolean; usesTS: boolean } & TemplateProps
