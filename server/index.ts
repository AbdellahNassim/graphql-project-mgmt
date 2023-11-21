import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import dotenv from "dotenv";
const colors = require("colors");
import connectDB from "./config/db";
dotenv.config({
  path: "../.env",
});

const root = {
  hello: () => "Hello world!",
};
connectDB();
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
  })
);
const port = process.env.PORT || 5000;
app.listen(port);

console.log(
  `Running a GraphQL API server at http://localhost:${port}/graphql"`
);
