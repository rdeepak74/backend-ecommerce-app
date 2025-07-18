import { uploadToCloudinary } from "../middlewares/cloudinaryMiddleware.js";
import Product from "../models/Product.js";

export const creatProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, stock, ratings } = req.body;

        const result = await uploadToCloudinary(req.file.buffer, 'products');

        const imageUrl = result.secure_url;

        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock,
            ratings,
            imageUrl
        });
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
}


export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        next(error);
    }
}


export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })

    } catch (error) {
        next(error);
    }
}