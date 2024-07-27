import { gql } from "@apollo/client";

export const GET_MYHOUSE_DATAS = gql`
 query GetMyHouses {
  getMyHouses {
    id
    location
    description
  }
}
`;

export const GET_ONE_OF_MYHOUSE_DATA = gql`
  query GetMyHouse($getMyHouseId: ID!) {
    getMyHouse(id: $getMyHouseId) {
      id
      location
      email
      description
    }
  }
`;

// `
export const ADD_MYHOUSE_DATA =gql`
mutation(
  $location:String!
  $description:String!
){
  addMyHouse(
    input:{
      location:$location
      description:$description
    }
  ){
    location,
    description
  }
}
`

export const DELETE_MYHOUSE_DATA= gql`
 mutation DeleteMyHouse($deleteMyHouseId: ID!) {
  deleteMyHouse(id: $deleteMyHouseId)
  }`