import { gql } from "@apollo/client";

export const ORDER_ITEMS = gql`
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
