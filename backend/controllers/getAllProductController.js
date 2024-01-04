const asyncHandler = require('express-async-handler');
const Product = require('../modals/ProductModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('cloudinary').v2;



//get All Products
const getAllProductController = asyncHandler(
    async (req, res) => {
        const products = await Product.find({ user: req.user.id }).sort("-createdAt")
        res.status(200).json(products)
    }
);
//get single product
const getSingleProduct = asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404)
            throw new Error("Product Not Found")
        }

        if (product.user.toString() !== req.user.id) {
            res.status(404)
            throw new Error("User Not Authorized")
        }
        res.status(200).json(product);
    }
);

// delete Product
const deleteProduct = asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404)
            throw new Error("Product Not Found")
        }

        if (product.user.toString() !== req.user.id) {
            res.status(404)
            throw new Error("User Not Authorized")
        }
        await product.deleteOne();
        res.status(200).json(product);

    }
);
//update Product
const updateProductController = asyncHandler(
    async (req, res) => {
        const { name, category, quantity, price, description } = req.body;
        const { id } = req.params

        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404)
            throw new Error("Product Not Found")
        }
        //match product to its user
        if (product.user.toString() !== req.user.id) {
            res.status(404)
            throw new Error("User Not Authorized")
        }

        //Manage Image Upload
        let fileData = {}
        if (req.file) {
            //saving file to cloudinary
            let uploadFile;
            try {
                uploadFile = await cloudinary.uploader.upload(
                    req.file.path,
                    { folder: "Product Invent App", resource_type: "image" }
                )
            } catch (error) {
                res.status(500);
                throw new Error("image could not be uploaded")
            }

            fileData = {
                fileName: req.file.fieldname,
                filePath: uploadFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            }
        }

        //  Update Product
        const updatedProduct = await Product.findByIdAndUpdate(
            { _id: id },
            {
                name,
                category,
                quantity,
                price,
                description,
                image: Object.keys(fileData).length === 0 ? product?.image : fileData,
            },
            {
                new: true,
                runValidators: true,
            }

        )

        res.status(200).json(updatedProduct)

    }
);


module.exports = {
    getAllProductController,
    getSingleProduct,
    deleteProduct,
    updateProductController,
};