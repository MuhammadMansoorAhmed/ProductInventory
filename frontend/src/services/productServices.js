import axios from "axios";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/product`

//create product 
const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData)
    return response.data
}
//get all product 
const getAllProducts = async () => {
    const response = await axios.get(API_URL)
    return response.data
}
//Delete product 
const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
}
//View product 
const viewProduct = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
}
//Update Product
const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${API_URL}/${id}`, formData)
    return response.data
}

const productService = {
    createProduct,
    getAllProducts,
    deleteProduct,
    viewProduct,
    updateProduct
}

export default productService;