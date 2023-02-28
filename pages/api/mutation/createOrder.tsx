import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
mutation CREATE_ORDER(
  $id: CustomerRelateToOneForCreateInput
  $input: Int
  $cart: OrderItemRelateToManyForCreateInput
) {
  createOrder(data: { totalprice: $input, cart: $cart, customer: $id }) {
    id
    customer {
      name
      email
      orders {
        createdAt
        totalprice
        cart {
          id
          quantity
          product {
            price
            title
            author {
              name
            }
          }
        }
      }
    }
  }
}

`;