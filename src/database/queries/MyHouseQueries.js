import { gql } from "@apollo/client";

export const GET_MYHOUSE_DATAS = gql`
  query GetMyHouses {
    getMyHouses {
      id
      location
      description
      price
      size
      numberOfBeds
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
      price
      size
      numberOfBeds
    }
  }
`;

export const ADD_MYHOUSE_DATA =gql`
mutation(
  $location:String!
  $description:String!
  $price:Int!
  $size:Int!
  $numberOfBeds:Int!
  $images_url: [ImageToBeSaved!]
){
  addMyHouse(
    input:{
      location:$location
      description:$description
      price:$price
      size:$size
      numberOfBeds:$numberOfBeds
      images_url:$images_url
    }
  ){
    location,
    description
    price
    size
    numberOfBeds
    images_url{
      filename,
      url
    }
  }
}
`

// export const ADD_MYHOUSE_DATA =gql`
// mutation AddMyHouse($input: AddMyHouseInput) {
//   addMyHouse(input:{
//     description: $description,
//     location: $location,
//     numberOfBeds: $numberOfBeds,
//     price: $price,
//     size: $size,
//     images_url: $images_url
// }) {
//     id
//     location
//     description
//     price
//     size
//     numberOfBeds
//     images_url {
//       filename
//       url
//     }
//   }
// }

// `
// const input ={
//     description: "Uyu Munsi ndabona byakunze",
//     location: "Kicukiro",
//     numberOfBeds: 3,
//     price: 300000,
//     size: 20,
//     images_url:[{
//       url: "http://image.jpg",
//       filename: "Image3"
//     }]
// }

// {
//   "input": {
//     "description": "Uyu Munsi ndabona byakunze",
//     "location": "Kicukiro",
//     "numberOfBeds": 3,
//     "price": 300000,
//     "size": 20,
//     "images_url":[{
//       "url": "http://image.jpg",
//       "filename": "Image3"
//     }]
//   }
// }

export const DELETE_MYHOUSE_DATA= gql`
 mutation DeleteMyHouse($deleteMyHouseId: ID!) {
  deleteMyHouse(id: $deleteMyHouseId)
  }`