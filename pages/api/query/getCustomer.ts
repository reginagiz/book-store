import gql from 'graphql-tag';

export const CUSTOMER = gql`
query CUSTOMER($email: String, $status: StringFilter ) {
  customer(where: { email: $email }) {
    id
    name
    email
    address {
      id
      country
      city
      street
      build
      index
    }
    orderitems(where: { status: $status }) {
      id
      quantity
      status
      product {
        id
        title
        avatar {
          url
        }
        author {
          name
        }
        price
      }
    }
  }
}

`;