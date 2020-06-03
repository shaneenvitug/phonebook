import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import getConfig from 'next/config'
import bcrypt from 'bcrypt'
import v4 from 'uuid/v4'
import { Contact, User } from "../models/Contact"

const JWT_SECRET = getConfig().serverRuntimeConfig.JWT_SECRET

const users = []

async function createUser(data) {
  const salt = bcrypt.genSaltSync()

  const newUser = {
    id: v4(),
    email: data.email,
    password: bcrypt.hashSync(data.password, salt)
  }

  const user = new User(newUser)
  await user.save()

  return user
}

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.password)
}

export const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}, (err, users) => {
        if (err) return console.log(err)
        return users
      }).exec()
      return users
    },
    contacts: async () => {
      const contacts = await Contact.find({}, (err, contacts) => {
        console.log(contacts)
        if (err) return console.log(err)
        return contacts
      }).exec()
      return contacts
    },
    async viewer(_parent, _args, context, _info) {
      const { token } = cookie.parse(context.req.headers.cookie ?? '')
      if (token) {
        try {
          const { id, email } = jwt.verify(token, JWT_SECRET)

          return users.find(user => user.id === id && user.email === email)
        } catch {
          throw new AuthenticationError(
            'Authentication token is invalid, please log in'
          )
        }
      }
    }
  },
  Mutation: {
    async createContact(_, { name, email, phone }) {
      const person = new Contact({ name, email, phone })
      await person.save()
      return person
    },

    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input)
      return { user }
    },

    async signIn(_parent, args, context, _info) {
      const user = users.find(user => user.email === args.input.email)

      if (user && validPassword(user, args.input.password)) {
        const token = jwt.sign(
          { email: user.email, id: user.id, time: new Date() },
          JWT_SECRET,
          {
            expiresIn: '6h',
          }
        )

        context.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        )

        return { user }
      }

      throw new UserInputError('Invalid email and password combination')
    },

    async signOut(_parent, _args, context, _info) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return true
    },
  },
}