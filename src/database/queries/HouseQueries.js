import { gql } from "@apollo/client";

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
      link
      numberOfBeds
      images
    }
  }
`;

export const ADD_HOUSE_MUTATION = gql`
  mutation Mutation(
    $location: String!
    $status: String!
    $price: Float!
    $size: Float!
    $description: String!
    $image: String!
    $link: String!
    $numberOfBeds: Int!
    $images: [String!]
  ) {
    addHouse(
      location: $location
      status: $status
      price: $price
      size: $size
      description: $description
      image: $image
      link: $link
      numberOfBeds: $numberOfBeds
      images: $images
    ) {
      id
      location
      status
      price
      size
      description
      image
      link
      numberOfBeds
      images
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
    $image: String
    $link: String
    $numberOfBeds: Int
    $images: [String!]
  ) {
    updateHouse(
      id: $updateHouseId
      location: $location
      status: $status
      price: $price
      size: $size
      description: $description
      image: $image
      link: $link
      numberOfBeds: $numberOfBeds
      images: $images
    ) {
      id
      location
      status
      price
      size
      description
      image
      link
      numberOfBeds
      images
    }
  }
`;

export const DELETE_HOUSE_MUTATION = gql`
  mutation DeleteHouse($deleteHouseId: ID!) {
    deleteHouse(id: $deleteHouseId)
  }
`;
