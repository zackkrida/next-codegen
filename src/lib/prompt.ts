import * as ask from "prompts"
import * as minimist from "minimist"

export const prompt = async () => {
  const args = minimist(process.argv.slice(2))
  const validateName = name =>
    !name.startsWith("/") &&
    !name.endsWith(".js") &&
    !name.endsWith(".ts") &&
    !name.endsWith("tsx")

  // Set arguments
  let type = args._[0] // api or page
  let name = args._[1] // the route of the api or page
  let dataFetcher = null

  if (args.ssg) dataFetcher = "getStaticProps"
  if (args.ssr) dataFetcher = "getServerSideProps"
  // Validate arguments
  if (args.ssg && args.ssr) {
    console.log(
      "Please only specify a single data fetcher, either --ssg or --ssr."
    )
    process.exit()
  }
  if (type && !["api", "page"].includes(type)) {
    console.log(
      "The first argument to next-codegen must be the route type (api or page).\nPlease try again."
    )
    process.exit()
  }
  if (name && !validateName(name)) {
    console.log(
      "Name is invalid. Do not include a leading slash or file extension.\nPlease try again."
    )
  }

  const onCancel = () => {
    console.log("Exited next-codegen.")
    process.exit()
  }

  if (!type) {
    const typeRes = await ask(
      {
        name: "type",
        type: "select",
        message: "Choose a resource to generate.",
        choices: [
          { title: "Page", value: "page" },
          { title: "API route", value: "api" },
        ],
      },
      { onCancel }
    )
    type = typeRes.type
  }

  if (!name) {
    const nameRes = await ask(
      {
        name: "name",
        type: "text",
        message:
          "What is the name of your route? For example: about-us, users/[id], login",
        validate: validateName,
      },
      { onCancel }
    )
    name = nameRes.name
  }

  if (type === "api") {
    return {
      type,
      name,
    }
  }

  if (type === "page" && !dataFetcher) {
    const dataFetchRes = await ask(
      {
        type: "select",
        name: "dataFetcher",
        message: "How does your page fetch data?",
        choices: [
          {
            title:
              "getStaticProps (Static Generation): Fetch data at build time. [--ssg]",
            value: "getStaticProps",
          },
          {
            title:
              "getServerSideProps (Server-side Rendering): Fetch data on each request. [--ssr]",
            value: "getServerSideProps",
          },
          {
            title: "No data fetching at build time or server-side.",
            value: null,
          },
        ],
      },
      { onCancel }
    )

    dataFetcher = dataFetchRes.dataFetcher
  }

  return {
    type,
    name,
    dataFetcher,
  }
}
