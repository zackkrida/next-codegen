import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

const PostsId: NextPage<PostsIdProps> = () => {
  return <div>PostsId</div>
}

type PostsIdProps = {}

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

export default PostsId