export default async function graphqlRequest(query: {
  query: string;
}): Promise<any> {
  const url = "https://www.interactly.video/blog/graphql";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers.append(
      "Authorization",
      `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    );
  }

  const res = await fetch(url, {
    next: { tags: ["api"] },
    headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  const resJson = await res.json();
  return resJson;
}
