import graphqlRequest from "./graphqlRequest";

export async function getTitles(): Promise<string[]> {
  const query = {
    query: `query NewQuery {
              posts {
                nodes {
                  slug
                }
              }
            }`,
  };

  const res = await graphqlRequest(query);
  const titles = res.data.posts.nodes.map(
    (node: { slug: string }) => node.slug
  );

  return titles;
}
