import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
  input SignUpInput {
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type SignUpPayload {
    user: User!
  }
  type SignInPayload {
    user: User!
  }
  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }
  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
    contacts: [Contact]!
  }
  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    createContact(name: String!, email: String!, phone: String!): Contact!
  }
`