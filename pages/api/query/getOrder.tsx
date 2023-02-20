import { gql } from "@apollo/client";

export const GET_ORDER = gql`
query GET_ORDER($id: ID!) {
    order(where: {id:$id}) {
      id
      createdAt
      totalprice
      customer {
        name
        email
        orderitems {
          price
          quantity
          product {
            title
            author {
              name
            }
          }
        }
      }
    }
  }
`;