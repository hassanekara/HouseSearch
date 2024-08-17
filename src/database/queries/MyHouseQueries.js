import { gql } from "@apollo/client";
//Getting Data From the database
// export const GET_MYHOUSE_DATAS = gql`
//   query GetMyHouses {
//     getMyHouses {
//       id
//       location
//       description
//       price
//       size
//       status
//       numberOfBeds
//       image_cover{
//         url
//       }
//       images_url{
//         filename
//         url
//       }
//     }
//   }
// `;

export const GET_MYHOUSE_DATAS = gql`
  query GetMyHouses {
    getMyHouses {
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
    user_id {
      _id
      fullName
      email
      telephone
      password
      role
    }
  }
  }
`;
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
    request_id {
      fullName
      email
      message
      telephone
    }
    user_id {
      _id
      fullName
      email
      telephone
      password
      role
    }
    }
  }
`;
export const GET_FILTERED_UNRENTED_HOUSES_DATA = gql`
query GetFilteredUnrentedHouses {
  getFilteredUnRentedHouses {
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
    user_id {
      _id
      fullName
      email
      telephone
      password
      role
    }
  }
}
`
export const GET_FILTERED_RENTED_HOUSES_DATA = gql`
query GetFilteredRentedHouses {
  getFilteredRentedHouses {
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
    user_id {
      _id
      fullName
      email
      telephone
      password
      role
    }
  }
}
`
export const GET_FILTERED_PENDIND_HOUSES_DATA =gql`
query GetFilteredPendingHouses {
  getFilteredPendingHouses {
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
    user_id {
      _id
      fullName
      email
      telephone
      password
      role
    }
  }
}
`
//Inserting Data into database
export const ADD_MYHOUSE_DATA = gql`
  mutation (
    $location: String!
    $description: String!
    $price: Int!
    $size: Int!
    $status:String!
    $numberOfBeds: Int!
    $image_cover: [ImageToBeSaved!]
    $images_url: [ImageToBeSaved!]
    # $user_id:[ID]
    # $request_id:[ID]
  ) {
    addMyHouse(
      input: {
        location: $location
        description: $description
        price: $price
        size: $size
        status:$status
        numberOfBeds: $numberOfBeds
        image_cover: $image_cover
        images_url: $images_url
        # house_id:$house_id
        # request_id:$request_id
      }
    ) {
      location
      description
      price
      size
      status
      numberOfBeds
      image_cover{
        filename
        url
      }
      images_url {
        filename
        url
      }
    #   user_id {
    #   _id
    #   fullName
    #   email
    #   telephone
    #   password
    #   role
    # }
    # request_id {
    #   fullName
    #   email
    #   message
    #   telephone
    # }
    }
  }
`;

export const DELETE_MYHOUSE_DATA= gql`
 mutation DeleteMyHouse($deleteMyHouseId: ID!) {
  deleteMyHouse(id: $deleteMyHouseId)
  }`