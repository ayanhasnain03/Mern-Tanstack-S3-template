import type { CREATE_PRODUCT_TYPE, PRODUCT_RESPONSE } from "@/types";

const baseURL = import.meta.env.VITE_API_URL;

export const createProductApi = async (payload: CREATE_PRODUCT_TYPE): Promise<void> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("price", payload.price.toString());

  if (payload.image && payload.image[0]) {
    formData.append("image", payload.image[0]);
  }

  const response = await fetch(`${baseURL}/create`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create product");
  }
};
export const getProductsApi = async ():Promise<PRODUCT_RESPONSE>=>{
  const response = await fetch(`${baseURL}`);
  return response.json();
}
export const deleteProductApi = async (id: string): Promise<void> => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
 await response.json();
}
