import { gql } from "@apollo/client";

export const CREATE_ORDER_ITEM = gql`
mutation CREATE_ORDER_ITEM($id: ID!,$email: String) {
  createOrderItem(
    data: {
      quantity: 1
      product: { connect: { id: $id } }
      customer: { connect: { email: $email } }
    }
  ) {
    quantity
    customer {
      name
      email
    }
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