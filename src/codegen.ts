import { PromptObject, prompt } from "prompts"
import { UserConfig } from "./config"

const multiPrompt = async (userConfig: UserConfig) => {
  const typeResponse = await prompt({
    name: "type",
    type: "select",
    message: "Choose a resource to generate.",
    choices: [
      { title: "Page", value: "page" },
      { title: "API route", value: "api" },
    ],
  })

  console.log(typeResponse)

  if (typeResponse.type === "page") {
    const dateFetchResponse = await prompt({
      type: "select",
      name: "dataType",
      message: "How does your page fetch data?",
      choices: [
        {
          title:
            "getStaticProps (Static Generation): Fetch data at build time.",
          value: "getStaticProps",
        },
        {
          title:
            "getServerSideProps (Server-side Rendering): Fetch data on each request.",
          value: "getServerSideProps",
        },
      ],
    })
  }
}

export default {
  prompt: async (userConfig: UserConfig) => multiPrompt(userConfig),
}
