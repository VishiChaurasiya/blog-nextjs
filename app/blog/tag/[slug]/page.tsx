interface IParams {
  page?: string;
}

const blogs = async ({ params }: { params: IParams }) => {
  return <h1>Tag Page {params.page}</h1>;
};

export default blogs;
