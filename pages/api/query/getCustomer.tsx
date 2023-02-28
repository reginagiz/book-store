import gql from 'graphql-tag';

export const CUSTOMER = gql`
query CUSTOMER($email: String) {
  customer(where: { email: $email }) {
    id
    name
    email
    orderitems {
      id
      quantity
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