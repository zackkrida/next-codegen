/**
 * Next Codegen
 */
import config from "./config"
import codegen from "./codegen"

const log = console.info
const messages = {
  welcome: "> Welcome to next-codegen.",
}

const generateConfig = async () => {
  log(messages.welcome)
  const response = await config.prompt()
  try {
    await config.write(response)
    log(config.messages.success)
  } catch (error) {
    log(config.messages.fail)
  }
  process.exit()
}

const generateCode = async config => {
  const response = await codegen.prompt(config)
  log(response)
}

// This is the whole app :)
;(async function run() {
  try {
    const userConfig = await config.get().then(JSON.parse)
    await generateCode(userConfig)
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(error)
    }
    await generateConfig()
  }
})()
