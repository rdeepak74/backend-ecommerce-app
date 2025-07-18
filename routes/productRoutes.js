import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { creatProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/isAdminMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', isAuthenticated, isAdmin, upload.single('imageUrl'), creatProduct); // admin-only
router.put('/:id', isAuthenticated, isAdmin, updateProduct); // admin-only
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct); // admin-only

export default router;

