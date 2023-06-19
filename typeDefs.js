const {gql}=require('apollo-server-express');


// Queries
// For LINE 7 comes the JS 's name
// Line 18 [Employee] comes line 8
const typeDefs=gql`
 type Employee{
    id:ID
    first_name:String!
    last_name:String!
    email: String!
    gender: String!
    salary: String!
 }
 type User{
    id:ID
    username:String!
    email:String!
    password: String!
    token:String
 }
 
 type Query{   
   hello:String
   getAll:[Employee!]!
   getPost(id: ID):Employee
   login(email: String!, password: String!): LoginResponse
 }
 type AuthData{
   id:ID
   token:String!
   tokenExpiration:Int!
 }
 input PostEmployee {
  id:ID
  first_name: String!
  last_name: String!
  email: String!
  gender: String!
  salary: String!
}

 input PostSignUp{
   username:String!
    email:String!
    password: String!
 }
 input UserInput {
    email: String!
    password: String!
  }

  type LoginResponse {
  email: String!
  password: String!
  # Add other fields like token, etc., if needed
}

 type Mutation{ 
  createPostEmployee(post: PostEmployee): Employee 
  updateEmployee(id:String,post:PostEmployee):Employee
  DeleteEmployee(id:String):String
  signUp(post:PostSignUp):User
  
 }
`;






// Line 32  it we give the "post" key. and Employee Comes from type  Employee
// Line 23Input use for Create and Update
// Line 33 UpdateEmployee work like take first "id" comes from line 9 and called as string
// Line 33 then  given the name of the key is  "post" and make sure the "post" equal to your Input 



module.exports=typeDefs;