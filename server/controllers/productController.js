import Product from "../models/product.js";
import { uploadToS3 } from "../utils/s3.js";


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
