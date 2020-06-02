import { Contact } from "../models/Contact"

export const resolvers = {
  Query: {
    contacts: async () => {
      const contacts = await Contact.find({}, (err, contacts) => {
        console.log(contacts)
        if (err) return console.log(err)
        return contacts
      }).exec()
      return contacts
    }
  }
}