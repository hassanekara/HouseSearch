import { gql } from "@apollo/client";

export const GET_ONE_OF_MYHOUSE_DATA = gql`
  query GetMyHouse($getMyHouseId: ID!) {
    getMyHouse(id: $getMyHouseId) {
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
        role
      }
      request_id {
        fullName
        email
        message
        telephone
      }
    }
  }
`;


export const GET_ALL_OF_REQUESTED_DATA = gql`
 query GetAllUsersRequested {
  getAllUsersRequested {
    fullName
    email
    message
    telephone
    house_id
    user_id
    _id
  }
}
`;

export const GET_ONE_OF_REQUESTED_DATA = gql`
 query Query($getOneUserRequestId: ID) {
  getOneUserRequest(id: $getOneUserRequestId) {
    fullName
    email
    message
    telephone
    house_id
    user_id
    _id
  }
}
`;
export const ADD_REQUEST_MORE_INFO_DATA = gql`
  mutation (
    $fullName: String!
    $email: String!
    $telephone: String!
    $message: String!
    $house_id:[ID]
  ) {
    createUserRequest(
      input: {
        fullName: $fullName
        email: $email
        telephone: $telephone
        message: $message
        house_id: $house_id
      }
    ) {
      fullName
      email
      telephone
      message
      house_id
    }
  }
`;
