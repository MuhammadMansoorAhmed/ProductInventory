const asyncHandler = require('express-async-handler');
const Product = require('../modals/ProductModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('cloudinary').v2;



const createProduct = asyncHandler(
    async (req, res) => {
        const { name, sku, category, quantity, price, description } = req.body;

        //validation
        if (!name || !category || !quantity || !price || !description) {
            res.status(400);
            throw new Error("please fill in all fields");
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
        //  create Product
        const product = await Product.create({
            user: req.user.id,
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: fileData
        });
        res.status(201).json(product)

    }
);

module.exports = createProduct