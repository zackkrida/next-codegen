const printList = arr => arr.reduce((acc, i) => acc + `\n${i}`, "")

const getNextTSImports = ({ isDynamic, dataFetcher }) => {
  const imports = [nextTSImports[dataFetcher]]

  if (isDynamic) {
    imports.push(nextTSImports.getStaticPaths)
  }

  return `import { NextPage, ${imports.join(", ")} } from 'next'`
}

export const TS = meta =>
  `
${printList([`import React from 'react'`, getNextTSImports(meta)])}

const ${meta.name}: NextPage<${meta.name}Props> = () => {
  return <div>${meta.name}</div>
}

type ${meta.name}Props = {}
${meta.dataFetcher ? `\n${fetchersTS[meta.dataFetcher]}\n` : ""}
${meta.isDynamic ? `${fetchersTS.getStaticPaths}\n` : ""}
export default ${meta.name}
`.trim()

export const JS = meta =>
  `

const ${meta.name} = () => {
  return <div>${meta.name}</div>
}
${meta.dataFetcher ? `\n${fetchersJS[meta.dataFetcher]}\n` : ""}
${meta.isDynamic ? `${fetchersJS.getStaticPaths}\n` : ""}
export default ${meta.name}

`.trim()

const fetchersTS = {
  getStaticProps: `
export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {}
  }
}`.trim(),
  getStaticPaths: `
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}
`.trim(),
  getServerSideProps: `
export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  }
}
`.trim(),
}

const nextTSImports = {
  getStaticProps: "GetStaticProps",
  getStaticPaths: "GetStaticPaths",
  getServerSideProps: "GetServerSideProps",
}

const fetchersJS = {
  getStaticProps: `
export async function getStaticProps(context) {
  return {
    props: {}
  }
}
`.trim(),
  getStaticPaths: `
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false
  }
}
`.trim(),
  getServerSideProps: `
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
`.trim(),
}
