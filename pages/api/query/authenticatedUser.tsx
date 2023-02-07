import gql from 'graphql-tag';

export const GET_AUTH_USER = gql`
query GET_AUTH_USER($id:ID){
  user (where: { id: $id }){
    id
    name
    email
  }
}
`;