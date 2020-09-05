const {gql} = require("apollo-server-express")
module.exports=gql`
    type Error{
        email:String
        password:String
    }
    type User{
        email:String
        password:String
        error:Error
        id:ID
        todos:[Todo]
    }
    type Todo{
        user:ID
        body:String
        _id:ID
    }
    type Query{
        isAuth(jwt:String):Boolean
        currentUser(jwt:String):User
    }
    type Mutation{
        register(email:String, password:String):User
        login(email:String, password:String):User
        addTodo(jwt:String, body:String):Todo
    }
    
`