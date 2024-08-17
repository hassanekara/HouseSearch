import { gql } from "@apollo/client";

export const GET_ALL_REQUESTS = gql`
  query Query {
  getAllUsersRequested {
    fullName
    email
    message
    telephone
    _id
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

export const GET_ONE_REQUEST = gql`
  query GetHouse($getHouseId: ID!) {
    getHouse(id: $getHouseId) {
      id
      location
      status
      price
      size
      description
      image
      numberOfBeds
      images_url
    }
  }
`;

export const ADD_REQUEST_MUTATION = gql`
  mutation (
    $location: String!
    $status: String!
    $price: Float!
    $size: Float!
    $description: String!
    $numberOfBeds: Int!
    $images_url: [ImageToBeSavedReturned!]
  ) {
    addHouse(
      input: {
        location: $location
        status: $status
        price: $price
        size: $size
        description: $description
        numberOfBeds: $numberOfBeds
        images_url: $images_url
      }
    ) {
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

export const UPDATE_REQUEST_MUTATION = gql`
  mutation UpdateHouse(
    $updateHouseId: ID!
    $location: String
    $status: String
    $price: Float
    $size: Float
    $description: String
    $numberOfBeds: Int
    $images_url: [ImageToBeSavedReturned!]
  ) {
    updateHouse(
      id: $updateHouseId
      location: $location
      status: $status
      price: $price
      size: $size
      description: $description
      numberOfBeds: $numberOfBeds
      images_url: $images_url
    ) {
      id
      location
      status
      price
      size
      description
      numberOfBeds
      images_url
    }
  }
`;

export const DELETE_REQUEST_MUTATION = gql`
mutation DeleteUserRequest($deleteUserRequestId: ID) {
  deleteUserRequest(id: $deleteUserRequestId)
}
`;

console.log("Ok")