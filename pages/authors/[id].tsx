import { gql } from "@apollo/client";
import client from "../../helpers/appolo-client"
import Link from "next/link";


const Post=()=>{
    return(
        <h1>Posts</h1>
    )

}
export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
        query {
          Movie {
            title
            year
          }
        }
      `,
    });
  
    return {
      props: {
        data: data.Movie,
      },
    };
  }
  export default Post;