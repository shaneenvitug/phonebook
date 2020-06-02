import gql from 'graphql-tag'

export const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: Int!
  }

  type Query {
    contacts: [Contact]!
  }
`