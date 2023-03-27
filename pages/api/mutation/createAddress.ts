import { gql } from "@apollo/client";

export const CREATE_ADDRESS = gql`
mutation CREATE_ADDRESS(
    $country: String
    $city: String
    $street: String
    $build: String
    $index: String
    $id: ID
  ) {
    createAddress(
      data: {
        country: $country
        city: $city
        street: $street
        build: $build
        index: $index
        customer: { connect: { id: $id } }
      }
    ) {
      city
      country
      street
      build
      index
      customer {
        name
        email
      }
    }
  }
`;