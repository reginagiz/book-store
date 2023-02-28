import { gql } from "@apollo/client";

export const GET_ORDER = gql`
query GET_ORDER($id: ID!) {
  order(where: {id:$id}) {
    id
    createdAt
    totalprice
    customer{
      name
      email
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