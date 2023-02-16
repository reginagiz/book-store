import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
mutation CREATE_CUSTOMER($name: String, $email: String) {
    createCustomer(data: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

