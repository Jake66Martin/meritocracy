// These are the required imports for use on the server page

// This is the import for express
const express = require('express')
// This function allows one to integrate apollo server with express
const {expressMiddleware} = require('@apollo/server/express4')
// The path module provides utilities for working with file and directory paths
const path = require('path')
// A class from apollo server used to instantiate a new apollo server instance
const {ApolloServer} = require('@apollo/server')
// Our auth middleware for the back end token retrieval
const {authMiddleware} = require('./utils/auth.js')
// The import of dotenv for envrionment variables
require('dotenv').config()

// This code imports our typedefs and resolvers from the schemas file
const {typeDefs, resolvers} = require('./schemas.js')
// This line imports our database connection
const db = require('./config/connection')

// This line defines the port we will be listening on
const PORT = process.env.PORT || 3001;

// This line creates a new instance of express
const app = express();

// This line is to create a new instance of apollo server with the required parameters
// of typedefs (schema definitions) and resolvers (to resolve the fields of the graph types)
const server = new ApolloServer({
    typeDefs,
    resolvers
});


const startApolloServer = async () => {
await server.start();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
}));

// This block of code sets up the serving of static files and handling routes
// for the production environment conditional
if (process.env.NODE_ENV === 'production') {
// express stativ serves the static files from the specified directory of
// ('../client/dist), __dirname represents the directory of the currently
// executing script. path.join creates an absolute path by concatenating
// the directory names
    app.use(express.static(path.join(__dirname, '../client/dist')));
// Route handler that catches all GET requests that havent been previously handled,
// responds by sending the index.html from the ../client/dist after being joined 
// __dirname, ..client/dist, index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
    });
}

// This block of code intializes the database and starts the express server once
// the database is successfully synchronized
// when force is set to false, it syncs without dropping/recreating the tables
db.sync({force: false}).then(()=>{
// This starts the server on the specified port, and then runs a callback function    
    app.listen(PORT, ()=> {
// Within the callback, we have console logs telling us that the api server is running
// on specified port, and that use graphql at this url        
        console.log(`API servers running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    });
});

};

startApolloServer();


