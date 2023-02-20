import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
mutation CREATE_ORDER($email: String, $input: Int) {
  createOrder(
     data: {
       totalprice: $input
       customer: { connect: { email: $email }
       }
     }
     ){
      id
     createdAt
     totalprice
     customer{
       name
       email
       orderitems{
         id
         quantity
         product{
           title
           author{
             name
           }
           price
         }
       }
       }
     }
   }
 
`;