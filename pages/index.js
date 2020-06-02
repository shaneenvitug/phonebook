import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { withApollo } from "../apollo/client"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const ContactQuery = gql`
  query ContactQuery {
    contacts {
      name
      email
      phone
    }
  }
`

function Home() {
  const { data, loading } = useQuery(ContactQuery)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Reconnect App coming soon!</p>
        {data && data.contacts.map(({name}) => <div>{name}</div>)}
      </section>
    </Layout>
  )
}

export default withApollo(Home)
