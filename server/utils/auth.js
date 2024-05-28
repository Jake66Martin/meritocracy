// Importing the graph ql error module from graphql library.
const {GraphQLError} = require('graphql');
// Importing the json web token from jwt library
const jwt = require('jsonwebtoken');


// Credentials for our json web token authentication
const secret = 'ourlittlesecret';
const expiration = '2h';

// The exportation of our error and authentication functions
module.exports = {
    // This part of the code refers to our authentiation error, which will throw 
    // a graphql error when the user is not authenticated.
     AuthenticationError: new GraphQLError('Could not authenticate user.',{
    // The error object contains and extensions field, which includes additional information
    // about the error found within the extensions object (code:field and associated value) .    
        extensions: {
            code: 'UNAUTHENTICATED'
         },
     }),
     authMiddleware: function({req}) {
        // This line checks to see if a token is present for extraction in either the request body,
        // the query parameters of the URL, or the Authorization header of the request.
        // It then assigns that data to "token"
        let token = req.body.token || req.query.token || req.headers.authorization

        // This checks if there is an authorization header. It if exists, it proceeds to split the
        // header at spaces, it removes (pop method) the last member of the created array (the token),
        // and then uses the trim method to remove any leading or trailing white spaces
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // This checks the value of token, and if it is falsy, then it returns the req
        //object as is with no changes
        if (!token) {
            return req;
        }

        // This is a try catch block that attempts code and catches any errors
        // within the catch part of the block
        try {
        // The verify function checks the token for the secret and assigns an expiration.
        // Assuming verification goes through, it then extracts the data via object destructuring
        // and assigns the data to req.user 
          const {data} = jwt.verify(token, secret, {maxAge: expiration});
          req.user = data;
        } catch {
        // This catches whether a token is valid or not and throws a message
        // within the console log    
          console.log('Invalid token')
        }

        return req;
     },

     // This function creates the jwt for a user
     signToken: function ({email, userName, _id}) {
     // This line assigns an object containing these values to payload   
        const payload = {email, userName, _id};
     // This returns a signed json web token with payload assigned to data as a new object
     // to maintain organization, the secret, and the time it expires  
        return jwt.sign({data: payload}, secret, {expiresIn: expiration})
     }
};