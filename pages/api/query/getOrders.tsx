import gql from 'graphql-tag';

export const GET_ORDERS = gql`
query GET_ORDERS($input: CustomerWhereInput) {
    orders(where: { customer: $input }) {
      customer {
        name
        email
      }
      createdAt
      totalprice
      cart {
        quantity
        product {
          title
          price
          author{
            name
          }
        }
      }
    }
  }
`;