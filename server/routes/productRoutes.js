import express from 'express';
import multer from 'multer';
import { createProduct, deleteProduct, getProducts } from '../controllers/productController.js';

const upload = multer();
const router = express.Router();
router.post('/create', upload.single('image'), createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);
export default router;
