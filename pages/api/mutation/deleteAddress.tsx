import { gql } from "@apollo/client";

export const DELETE_ADDRESS = gql`
mutation DELETE_ADDRESS($id:ID){
    deleteAddress(where:{id:$id}){
      id
      country
      city
      street
    }
  }
`;