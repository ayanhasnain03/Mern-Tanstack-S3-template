import Product from "../models/product.js";
import { deleteFromS3, uploadToS3 } from "../utils/s3.js";


export const createProduct = async(req, res) => {
    try {
        const { title, description, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const { key, url } = await uploadToS3(file);
        const product = new Product({
            title,
            description,
            price,
            imageUrl: url,
            imageKey: key
        });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find().select("-imageKey");
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getProductById = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product
            .findById(id)
            .select("-imageKey");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
       await deleteFromS3(product.imageKey);
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
