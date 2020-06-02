import { ApolloServer } from "apollo-server-micro"
import mongoose from "mongoose"

import { schema } from "../../apollo/schema"

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => { console.log("We are connected!")}).catch(err => console.log(err))

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx;
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });