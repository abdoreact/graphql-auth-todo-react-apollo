const User = require("./models/User");
const { sign, verify } = require("jsonwebtoken");
const Todo=require("./models/Todo")
const jwtsecret = require("./config.json").jwt;
const argon2 = require("argon2");
const handleError = (err) => {
  const error = { email: "", password: "" };
  if (err.code === 11000) {
    return {
      error: {
        email: "Error. Email already in use.",
        password: "",
      },
    };
  }
  Object.values(err.errors).forEach(({ properties: { path, message } }) => {
    error[path] = message;
  });
  return { error };
};
module.exports = {
  Query: {
    isAuth:(_, {jwt}) => {
        return verify(jwt, jwtsecret, (err) => {
            if(err){
                return false
            }
            return true
        })
    },
    currentUser:async (_, {jwt}) => {
        return verify(jwt, jwtsecret, async (err, decoded) => {
            const user=await User.findById(decoded.id)
            const todos=await Todo.find({user:user._id})
            return{
                id:user._id,
                email:user.email,
                todos
            }
        })
    }
    

  },
  Mutation: {
    register: async (_, { email, password }) => {
      try {
        const user = await User.create({ email, password });
        return { id: sign({ id: user._id }, jwtsecret) };
      } catch (err) {
        return handleError(err);
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return {
          error: {
            email: "Error. Email not found.",
            password: "",
          },
        };
      }
      if (!(await argon2.verify(user.password, password))) {
        return {
          error: {
            email: "",
            password: "Error. Incorrect password.",
          },
        };
      }
      return { id: sign({ id: user._id }, jwtsecret) };
    },
    addTodo:(_, {jwt, body}) => {
      return verify(jwt, jwtsecret, async (_, decoded) => {
        return await Todo.create({user:decoded.id, body})
      })
    }
  },
};
