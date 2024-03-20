import graphqlRequest from "./graphqlRequest";

export interface Post {
  slug: string;
  title: string;
  id: string;
  modified: string;
  excerpt: string;
  date: string;
  content: string;
  tags: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  author: {
    node: {
      name: string;
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
          date
          content
          tags {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }      
        }
      }
    }`,
  };

  const res = await graphqlRequest(query);
  const posts: Post[] = res.data.posts.nodes;

  posts.map((post) => {
    const date = new Date(post.date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    post.date = formattedDate;

    return post;
  });

  return posts;
}
