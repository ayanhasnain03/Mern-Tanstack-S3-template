import React from "react";
import { Button } from "../atoms/button";
import { Trash } from "lucide-react";
import { Link } from "react-router";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
   <Link to={`/product/${id}`} className="block">
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
   </Link>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <p className="text-xl font-semibold text-green-600 mb-4">${price.toFixed(2)}</p>

        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={() => onEdit(id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Edit
          </Button>
          <button
            onClick={() => onDelete(id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
           <Trash className="inline mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
