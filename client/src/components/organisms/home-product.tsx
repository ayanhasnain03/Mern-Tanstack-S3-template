import { useDeleteProduct, useGetAllProducts } from "@/hooks/use-product";
import { ProductCard } from "../molecule/product-card";

export const HomeProducts = () => {
  const { data, isLoading, isError, error } =
    useGetAllProducts();

  const { mutate: deleteProduct } = useDeleteProduct();

const handleDelete = (id: string) => {
  if (!window.confirm("Are you sure you want to delete this product?")) {
    return;
  }
  deleteProduct(id);
}


  if (isLoading ) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <section className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {data?.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.imageUrl}
          onEdit={() => console.log(`Edit product ${product._id}`)}
          onDelete={() => handleDelete(product._id)}
        />
      ))}
    </section>
  );
};
