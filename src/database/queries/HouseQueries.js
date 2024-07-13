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
      image
      link
      numberOfBeds
      images
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
