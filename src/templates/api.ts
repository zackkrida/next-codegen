export const TS = meta =>
  `
import { NextApiRequest, NextApiResponse } from 'next'

type ${meta.name}Data = {}

export default (req: NextApiRequest, res: NextApiResponse<${meta.name}Data>) => {
  res.status(200).json({})
}
`.trim()

export const JS = meta =>
  `
export default (req, res) => {
  res.status(200).json({})
}
`.trim()
