import graphqlRequest from "./graphqlRequest";

export interface Post {
  slug: string;
  title: string;
  id: string;
  modified: string;
  excerpt: string;
  date: string;
  content: string;
  enqueuedStylesheets: {
    nodes: {
      src: string;
    }[];
  };
  tags: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  author: {
    node: {
      name: string;
    };
  };
  seo: {
    breadcrumbs: {
      url: string;
      text: string;
    }[];
    canonical: string;
    cornerstone: boolean;
    focuskw: string;
    metaDesc: string;
    metaKeywords: string;
    metaRobotsNofollow: string;
    metaRobotsNoindex: string;
    opengraphAuthor: string;
    opengraphDescription: string;
    opengraphImage?: {
      altText: string;
      mediaItemUrl: string;
      sourceUrl: string;
    };
    opengraphModifiedTime: string;
    opengraphPublishedTime: string;
    opengraphPublisher: string;
    opengraphSiteName: string;
    opengraphTitle: string;
    opengraphType: string;
    opengraphUrl: string;
    readingTime: number;
    schema: {
      articleType: string[];
      pageType: string[];
      raw: string;
    };
    title: string;
    twitterDescription: string;
    twitterImage: {
      altText: string;
      mediaItemUrl?: string;
      sourceUrl: string;
    };
    twitterTitle: string;
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
          enqueuedStylesheets {
            nodes {
              src
            }
          }
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
          seo {
            breadcrumbs {
              url
              text
            }
            canonical
            cornerstone
            focuskw
            metaDesc
            metaKeywords
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphAuthor
            opengraphDescription
            opengraphImage {
              altText
              mediaItemUrl
              sourceUrl
            }
            opengraphModifiedTime
            opengraphPublishedTime
            opengraphPublisher
            opengraphSiteName
            opengraphTitle
            opengraphType
            opengraphUrl
            readingTime
            schema {
              articleType
              pageType
              raw
            }
            title
            twitterDescription
            twitterImage {
              altText
              mediaItemUrl
              sourceUrl
            }
            twitterTitle
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
