const express = require('express')
const {expressMiddleware} = require('@apollo/server/express4')
const path = require('path')
const {ApolloServer} = require('@apollo/server')
// const {authMiddleware} = require('/utils/auth.js')
require('dotenv').config()

// const {TypeDefs, resolvers} = require('./schemas.js')
// const db = require('./config/connection')

const PORT = process.env.PORT || 3001;

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startApolloServer = async () => {
await server.start();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


}

startApolloServer();


