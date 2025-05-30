import express from 'express';
import multer from 'multer';
import { createProduct } from '../controllers/productController.js';

const upload = multer();
const router = express.Router();
router.post('/create', upload.single('image'), createProduct);
export default router;
