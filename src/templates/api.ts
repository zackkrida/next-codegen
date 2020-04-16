// prettier-ignore
export const TS = meta =>
  `
import { NextApiRequest, NextApiResponse } from 'next'

type ${meta.name}Data = {${meta.isDynamic ? ` ${meta.name.toLowerCase()} ` : ``}}

export default (req: NextApiRequest, res: NextApiResponse<${meta.name}Data>) => {
  ${meta.isDynamic ? `  const { query: { ${meta.name.toLowerCase()} } } = req` : ''}  res.status(200).json({${meta.isDynamic ? ` ${meta.name.toLowerCase()} ` : ``}})
}
`.trim()

export const JS = meta =>
  `
export default (req, res) => {
  res.status(200).json({})
}
`.trim()
