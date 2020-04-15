import { trim } from "ramda"

export const TS = meta =>
  trim(`
import { NextApiRequest, NextApiResponse } from 'next'

type ${meta.name}Data = {}

export default (req: NextApiRequest, res: NextApiResponse<${meta.name}Data>) => {
  res.status(200).json({})
}
`)

export const JS = meta =>
  trim(`
export default (req, res) => {
  res.status(200).json({})
}
`)
