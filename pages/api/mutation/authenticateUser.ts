import gql from 'graphql-tag';

export const AUTH_USER = gql`
mutation authenticateUser($email:String!, $password:String!){
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }  
`;