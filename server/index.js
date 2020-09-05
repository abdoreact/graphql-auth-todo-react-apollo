const express=require("express")
const {ApolloServer} = require("apollo-server-express")
const {connect, set}=require("mongoose")
const app=express()
const mongouri=require("./config.json").mongodburi
const typeDefs=require("./typeDefs")
const resolvers=require("./resolvers")
set('useCreateIndex', true)
const server=new ApolloServer({
    typeDefs,
    resolvers,
    playground:false
})
server.applyMiddleware({app})
const port=process.env.PORT || 8080
connect(mongouri, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(port, () => console.log(port)))
.catch(err => console.log(err))