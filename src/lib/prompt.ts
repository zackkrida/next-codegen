import * as basePrompt from "prompts"

const validateName = name =>
  !name.startsWith("/") &&
  !name.endsWith(".js") &&
  !name.endsWith(".ts") &&
  !name.endsWith("tsx")

const onCancel = () => {
  console.log("Exited next-codegen.")
  process.exit(1)
}

export const prompt = async () => {
  const { type, name } = await basePrompt(
    [
      {
        name: "type",
        type: "select",
        message: "Choose a resource to generate.",
        choices: [
          { title: "Page", value: "page" },
          { title: "API route", value: "api" },
        ],
      },
      {
        name: "name",
        type: "text",
        message:
          "What is the name of your route? For example: about-us, users/[id], login",
        validate: validateName,
      },
    ],
    { onCancel }
  )

  if (type === "api") {
    return {
      type,
      name,
    }
  }

  if (type === "page") {
    const { dataFetcher } = await basePrompt(
      [
        {
          type: "select",
          name: "dataFetcher",
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
            {
              title: "This page doens't fetch data (yet).",
              value: null,
            },
          ],
        },
      ],
      { onCancel }
    )

    return {
      type,
      name,
      dataFetcher,
    }
  }
}
