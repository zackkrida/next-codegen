import { trim } from "ramda"

const printList = arr => arr.reduce((acc, i) => acc + `\n${i}`, "")

const getNextTSImports = ({ isDynamic, dataFetcher }) => {
  const imports = [nextTSImports[dataFetcher]]

  if (isDynamic) {
    imports.push(nextTSImports.getStaticPaths)
  }

  return `import { NextPage, ${imports.join(", ")} } from 'next'`
}

export const TS = meta =>
  trim(`
${printList([`import React from 'react'`, getNextTSImports(meta)])}

const ${meta.name}: NextPage<${meta.name}Props> = () => {
  return <div>${meta.name}</div>
}

type ${meta.name}Props = {}
${meta.dataFetcher ? `\n${fetchersTS[meta.dataFetcher]}\n` : ""}
${meta.isDynamic ? `${fetchersTS.getStaticPaths}\n` : ""}
export default ${meta.name}
`)

export const JS = meta =>
  trim(`

const ${meta.name} = () => {
  return <div>${meta.name}</div>
}
${meta.dataFetcher ? `\n${fetchersJS[meta.dataFetcher]}\n` : ""}
export default ${meta.name}

`)

const fetchersTS = {
  getStaticProps: trim(`
export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {}
  }
}`),
  getStaticPaths: trim(`
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}
`),
  getServerSideProps: trim(`
export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  }
}
`),
}

const nextTSImports = {
  getStaticProps: "GetStaticProps",
  getStaticPaths: "GetStaticPaths",
  getServerSideProps: "GetServerSideProps",
}

const fetchersJS = {
  getStaticProps: trim(`
export async function getStaticProps(context) {
  return {
    props: {}
  }
}
`),
  getStaticPaths: trim(`
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false
  }
}
`),
  getServerSideProps: trim(`
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
`),
}
