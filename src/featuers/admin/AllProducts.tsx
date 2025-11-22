import { Loader } from "lucide-react";
import type { Product } from "@/types";
import Card from "./Card";
import AddProduct from "./AddProduct";
import useGetProducts from "./useGetProducts";

export interface AdminProduct {
  data: {
    data: Product[];
  };
}
const AllProducts = () => {
  const {
    products,
    isPending,
  }: { products: AdminProduct; isPending: boolean } = useGetProducts();
  const allProducts: Product[] = products?.data?.data;

  if (isPending)
    return (
      <div className="flex items-center justify-center my-24">
        <Loader className="animate-spin size-16 text-primary" />
      </div>
    );

  return (
    <>
      {/* الزر الرئيسي */}
      <AddProduct />
      {/* Products */}
      {allProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center my-24 text-muted-foreground text-xl">
          لا توجد منتجات حالياً
        </div>
      )}
    </>
  );
};

export default AllProducts;
