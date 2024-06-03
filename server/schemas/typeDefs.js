// This creates the typedef string, which defines the sceham types
// for our api. We define our schema types, queries, mutations, input types
// and custom scalars and enums if necessary

const typeDefs = `

type User {
    _id: ID,
    username: String!,
    email: String!
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
me: User,
threads(_id: ID!): [Thread]
comments(thread_id: ID!): [Comments]
}

type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    createThread(name: String!, user_id: ID!): Thread
    createComment(comment: String!, user_id: ID!, thread_id: ID!): Comments
}

`

module.exports = typeDefs;