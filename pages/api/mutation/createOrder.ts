import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
mutation CREATE_ORDER(
  $id: CustomerRelateToOneForCreateInput
  $input: Int
  $cart: OrderItemRelateToManyForCreateInput
  $address: AddressRelateToOneForCreateInput
) {
  createOrder(
    data: { totalprice: $input, cart: $cart, 
    customer: $id, address: $address }
  ) {
    id
    address{
      country
    }
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