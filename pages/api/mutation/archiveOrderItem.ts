import gql from 'graphql-tag';

export const ARCHIVE_ORDER_ITEM = gql`
mutation ARCHIVE_ORDER_ITEM($id: ID!, $input: String) {
    updateOrderItem(where: { id: $id }, data: { status: $input }) {
      status
      product {
        id
        title
      }
    }
  }
`;