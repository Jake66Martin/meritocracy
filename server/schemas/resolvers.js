const { User, Thread, Comments } = require("../models/index");
const { signToken, AuthenticationError } = require("../utils/auth");

const emailValidation = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw AuthenticationError;
        }
        const user = await User.findOne({
          where: {
            _id: context.user._id,
          },
        });
        return user;
      } catch (err) {
        console.log(err);
      }
    },

    threads: async (parent, { _id }, context) => {
      try {
        const threads = await Thread.findAll({
          where: {
            id: _id,
          },
        });
        return threads;
      } catch (err) {
        console.log(err);
      }
    },

    comments: async (parent, { thread_id }, context) => {
      try {
        const comments = Comments.findAll({
          where: {
            thread_id: thread_id,
          },
        });
        return comments;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createThread: async (parent, { name }, context) => {
      try {
        const thread = Thread.create({
          name,
          user_id: context.user._id,
        });
        return thread;
      } catch (err) {
        console.log(err);
      }
    },

    createComment: async (parent, { comment, thread_id }, context) => {
      try {
        const newComment = Comments.create({
          comment,
          user_id: context.user._id,
          thread_id: thread_id,
        });
        return newComment;
      } catch (err) {
        console.log(err);
      }
    },

    addUser: async (parent, { username, email, password }, context) => {
      try {
        const isDuplicatedEmail = await User.findOne({
          where: {
            email: email,
          },
        });

        if (isDuplicatedEmail) {
          throw new Error(
            "Email already exists. Please choose a different email."
          );
        }

        if (emailValidation.test(email) && passwordValidation.test(password)) {
          const user = await User.create({
            username,
            email,
            password,
          });
          const token = signToken(user);
          return { token, user };
        } else {
          console.log("Error has occured. Confirm email and/or format.");
        }
      } catch (err) {
        console.log(err);
        throw new Error("An error has occured during user creation.");
      }
    },

    login: async (parent, { email, password }, context) => {
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
  },
};
