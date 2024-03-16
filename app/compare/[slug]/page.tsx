interface IParams {
  name?: string;
}

const comparePage = async ({ params }: { params: IParams }) => {
  return <h1>Compare Page {params.name}</h1>;
};

export default comparePage;
