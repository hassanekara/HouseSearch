import { gql } from "@apollo/client";
//Getting Data From the database

export const GET_ALL_USERS_DATAS =  gql`
  query GetAllUsers {
  getAllUsers {
    _id
    fullName
    email
    telephone
    password
    role
    house_id {
      _id
      location
      description
      status
      price
      size
      numberOfBeds
      image_cover {
        url
        filename
      }
      images_url {
        url
        filename
      }
      user_id {
        _id
        fullName
        email
        telephone
        password
      }
      request_id {
        fullName
        email
        message
        telephone
      }
    }
  }
  }
`;


//Inserting Data into database
export const ADD_USER_DATA = gql`
  mutation (
    $fullName: String!
    $email: String!
    $password: String!
    $telephone: String!
    $role: String!
  ) {
    signUp(
      input: {
        fullName: $fullName
        email: $email
        password: $password
        telephone: $telephone
        role:$role
      }
    ) {
      fullName
      email
      password
      telephone
      role
    }
  }
`;

export const USER_SIGN_IN_MUTATION = gql`
 mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    userId
    token
    tokenExpiration
  }
}
`


export const DELETE_USER_DATA= gql`
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
`