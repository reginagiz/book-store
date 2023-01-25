import gql from 'graphql-tag';

export const UPDATE_ORDER_ITEM = gql`
mutation UPDATE_ORDER_ITEM($id: ID!, $input: Int!) {
    updateOrderItem(where: { id: $id }, data: { quantity: $input }) {
      quantity
      product {
        id
        title
      }
    }
  }
`;