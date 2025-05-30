export type  CREATE_PRODUCT_TYPE = {
    title: string;
    description: string;
    price: number;
  image?: FileList | null;
}
export type PRODUCT_RESPONSE = {
    _id: string;
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}[];
