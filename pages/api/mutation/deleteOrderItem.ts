import { gql } from "@apollo/client";

export const DELETE_ORDER_ITEM = gql`
mutation DELETE_ORDER_ITEM($id: ID!) {
  deleteOrderItem(where: { id: $id }) {
    id
    product {
      id
    }
    quantity
  }
}   
`;