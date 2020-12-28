require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

const app = express();

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// bind express with graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
