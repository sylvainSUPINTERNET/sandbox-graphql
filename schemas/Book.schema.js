'use strict';

const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList} = graphql;


// DEV 
const {memDb, memAuthors} = require('../db/mockData');



const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        "id": { type: GraphQLID },
        "title": { type: GraphQLString },
        "sn": { type: GraphQLString },
        "author": {
            type: AuthorType,
            resolve(parent, args) {
                return memAuthors.filter( author => author.id === parent.authorId)[0];
            }
        }
    })
});

 
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        "id": { type: GraphQLID },
        "name": { type: GraphQLString },
        "age": { type: GraphQLInt },
        "books": {
            "type": GraphQLList(BookType),
            resolve(parent, args) {
                return memDb.filter( book => book.authorId === parent.id)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    "name": "RootQueryType",
    "fields": {
        "book": {
            "type": BookType,
            "args": {
                "id": {
                   type: GraphQLID
                }
            },
            resolve(parent, args) {
                // get data from db and other source
                return memDb.filter( book => book.id === args.id)[0];
            }
        },
        "books": {
            "type": new GraphQLList(BookType),
            resolve(parent, args){
                return memDb
            }
        },
        "authors": {
            "type": AuthorType, 
            "args": {
                "id": {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return memAuthors.filter( author => author.id === args.id)[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery});