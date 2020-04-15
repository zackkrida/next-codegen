import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next

const BlogsSlug: NextPage<BlogsSlugProps> = () => {
  return <div>BlogsSlug</div>
}

type BlogsSlugProps = {}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {}
  }
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false
  }
}

export default BlogsSlug