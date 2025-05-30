import { createProductApi, deleteProductApi, getProductsApi } from "@/api/product";
import type { PRODUCT_RESPONSE } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch all products
export const useGetAllProducts = () =>
  useQuery<PRODUCT_RESPONSE, Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

// Create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully!");
    },
    onError: (error: Error) => {
      console.error("Error creating product:", error.message);
      toast.error(`Error creating product: ${error.message}`);
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
    },
    onError: (error: Error) => {
      console.error("Error deleting product:", error.message);
      toast.error(`Error deleting product: ${error.message}`);
    },
  });
};
