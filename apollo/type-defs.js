import gql from 'graphql-tag'

export const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type Query {
    contacts: [Contact]!
  }
`