import { gql } from "@apollo/client";

export const GET_ALL_HOUSES = gql`
  query getHouses {
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

export const GET_ONE_HOUSE = gql`
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

export const ADD_HOUSE_MUTATION = gql`
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

export const UPDATE_HOUSE_MUTATION = gql`
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

export const DELETE_HOUSE_MUTATION = gql`
  mutation DeleteHouse($deleteHouseId: ID!) {
    deleteHouse(id: $deleteHouseId)
  }
`;

console.log("Ok")