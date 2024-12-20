interface Params {
  id: string;
}

const ProductDetailsPage = ({params: {id}} : {params: Params}) => {
  return (
    <>
      <h1>Product Details: Id = {id}</h1>
    </>
  );
};

export default ProductDetailsPage;
