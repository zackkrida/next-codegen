import { accessSync, constants, outputFileSync, readFileSync } from "fs-extra"

export const exists = path => {
  try {
    accessSync(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

export const prefixPath = dir => path => `${dir}/${path}`

export const write = ({ path, data }) =>
  outputFileSync(path, data, { flag: "wx+" })

export const read = path => {
  try {
    const file = readFileSync(path, { encoding: "utf-8" })
    return JSON.parse(file)
  } catch (error) {
    console.error(error.message)
  }
}
