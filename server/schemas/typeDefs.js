// This creates the typedef string, which defines the sceham types
// for our api. We define our schema types, queries, mutations, input types
// and custom scalars and enums if necessary

const typeDefs = `

type User {
    _id: ID,
    username: String!,
    email: String!,
    password: String!
}

type Thread {
    _id: ID,
    name: String!,
    user_id: ID
}

type Comments {
    _id: ID,
    comment: String!,
    user_id: ID,
    thread_id: ID
}

type Auth {
    token: ID!,
    user: User
}

type Query {
me: User
}

type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
}

`

module.exports = typeDefs;