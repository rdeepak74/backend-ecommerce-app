import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { creatProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/',isAuthenticated,creatProduct); // admin-only
router.put('/:id',isAuthenticated,updateProduct); // admin-only
router.delete('/:id',isAuthenticated,deleteProduct); // admin-only

export default router;  

