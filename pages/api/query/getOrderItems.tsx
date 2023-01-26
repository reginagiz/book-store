import { gql } from "@apollo/client";

export const ITEMS_QUERY = gql`
  query ORDERS_QUERY {
    orderItems {
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
`;
