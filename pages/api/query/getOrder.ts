import { gql } from "@apollo/client";

export const GET_ORDER = gql`
query GET_ORDER($id: ID!) {
  order(where: {id:$id}) {
    id
    createdAt
    totalprice
     customer {
      id
      name
      email
      address{
        id
        country
        city
        street
        index
        build
      }
    }
    cart{
      quantity
      product{
        price
        title
        author{
          name
        }
      }
    }
  }
}
`;