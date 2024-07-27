import { gql } from "@apollo/client";

export const GET_CONTACT_US_CONTENTS = gql`
  query Query {
    getContactUsContents {
      id
      fullName
      email
      message
    }
  }
`;

export const GET_CONTACT_US_CONTENT = gql`
  query GetContactUsContent($getContactUsContentId: ID!) {
    getContactUsContent(id: $getContactUsContentId) {
      id
      fullName
      email
      message
    }
  }
`;

// export const ADD_CONTACT_US_CONTENT = gql `
// mutation AddContactUsContent($fullName: String!, $email: String!, $message: String!) {
//   addContactUsContent(fullName: $fullName, email: $email, message: $message) {
//     id
//     fullName
//     email
//    message
//  }
// }
// `
export const ADD_CONTACT_US_CONTENT =gql`
mutation(
  $fullName:String!
  $email:String!
  $message:String!
){
  addContactUsContent(
    input:{
      fullName:$fullName
      email:$email
      message:$message
    }
  ){
    fullName,
    email,
    message
  }
}
`

export const ADD_HOUSE_MUTATION_XX = gql`
  mutation Mutation($input: HouseInput) {
    addHouse(input: $input) {
      id
      location
      status
      price
      size
      description
      numberOfBeds
    }
  }
`;

export const GET_ALL_HOUSES = gql`
  query GetHouses {
    getHouses {
      id
      location
      status
      price
      size
      description
      numberOfBeds
      images_url {
        url
        filename
      }
    }
  }
`;