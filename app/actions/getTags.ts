import graphqlRequest from "./graphqlRequest";

export interface Tag {
  slug: string;
  name: string;
  description: string;
}

export async function getTags(): Promise<Tag[]> {
  const query = {
    query: `query NewQuery {
      tags {
        nodes {
          slug
          name
          description
        }
      }
    }`,
  };

  const res = await graphqlRequest(query);
  const tags = res.data.tags.nodes;

  return tags;
}
