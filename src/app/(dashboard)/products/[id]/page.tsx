interface Params {
  id: string;
}

// forçar que a pagina sempre seja renderizada de forma dinamica
export const dynamic = "force-dynamic";

const ProductDetailsPage = ({params: {id}} : {params: Params}) => {
  return (
    <>
      <h1>Product Details: Id = {id}</h1>
    </>
  );
};

export default ProductDetailsPage;
