import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next

const UsersId: NextPage<UsersIdProps> = () => {
  return <div>UsersId</div>
}

type UsersIdProps = {}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {}
  }
}

export default UsersId