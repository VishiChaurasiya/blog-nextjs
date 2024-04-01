interface IParams {
  number?: string;
}

const blogs = async ({ params }: { params: IParams }) => {
  return <h1>Tag Page {params.number}</h1>;
};

export default blogs;
