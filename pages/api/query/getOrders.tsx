import gql from 'graphql-tag';

export const GET_ORDERS = gql`
query GET_ORDERS($input: CustomerWhereInput) {
  orders(where: { customer: $input }) {
  address{
    id
    country
    city
    street
    build
    index
  }
    customer {
      id
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