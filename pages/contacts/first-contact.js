import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstContact() {
  return (
    <Layout>
      <Head>
        <title>First Contact</title>
      </Head>
      <h1>First Contact</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}