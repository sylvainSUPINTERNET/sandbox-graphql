'use strict';

const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const BookSchema = require('./schemas/Book.schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: BookSchema,
    graphiql: true // FOR DEV only (else you face query must be provided by default and can't test)
}))


app.listen(4999, () => {
    console.log(`App started on port : 4999`);
})