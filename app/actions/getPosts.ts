import graphqlRequest from "./graphqlRequest";

export interface Post {
  slug: string;
  title: string;
  id: string;
  modified: string;
  excerpt: string;
  content: string;
  tags: {
    nodes: {
      name: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

export async function getPosts(): Promise<Post[]> {
  const query = {
    query: `query NewQuery {
      posts {
        nodes {
          slug
          title
          id
          modified
          excerpt
          content
          tags {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }`,
  };

  const res = await graphqlRequest(query);
  const posts = res.data.posts.nodes;

  return posts;
}
