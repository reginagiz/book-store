import gql from 'graphql-tag';

export const BOOK_QUERY = gql`
query BOOK_QUERY($id:ID) {
    book(where: { id: $id }){
        title
        id
        year
        genre
        price
        description
        avatar{
            url
        }
        author{
            name
          }
      }
    }
`;
