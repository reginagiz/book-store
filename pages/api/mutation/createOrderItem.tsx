import { gql } from "@apollo/client";

export const CREATE_ORDER_ITEM = gql`
mutation CREATE_ORDER_ITEM($id: ID!) {
    createOrderItem(data: { quantity: 1, product: { connect: { id: $id } } }) {
        quantity
        product {
          title
          id
          price
          author {
            name
          }
        }
      }
}   
`;