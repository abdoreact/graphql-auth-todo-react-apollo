import {gql} from '@apollo/client';
export const isAuthQuery=gql`
query isAuth($jwt:String){
  isAuth(jwt:$jwt)
}
`
export const currentUserQuery=gql`
query currentUser($jwt:String){
  currentUser(jwt:$jwt){
    id
    todos{
      _id
      body
    }
    email
  }
}
`

export const loginQuery=gql`
mutation Login($email:String, $password:String){
  login(email:$email, password:$password){
    id
    error{
      email
      password
    }
  }
}
`