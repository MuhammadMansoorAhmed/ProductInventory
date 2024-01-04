import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getAllProducts, selectIsLoading, selectProduct, updateProduct, viewProduct } from "../../Redux/features/product/productSlice"
import { useEffect, useState } from "react"
import ProductForm from "../../components/product/productForm/ProductForm"
import Loader from "../../components/loader/Loader"

const UpdateProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const isLoading = useSelector(selectIsLoading)

    const productUpdate = useSelector(selectProduct);
    const [product, setProduct] = useState(productUpdate)
    const [productImage, setProductImage] = useState("")
    const [productImagePreview, setProductImagePreview] = useState(null)
    const [description, setDescription] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setProductImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        dispatch(viewProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        setProduct(productUpdate)
        setProductImagePreview(
            productUpdate && productUpdate.image ? `${productUpdate.image.filePath}` : null
        );
        setDescription(
            productUpdate && productUpdate.description ? productUpdate.description : ""
        );
    }, [productUpdate])

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();//use FormData to be able to send data with image 
        formData.append("name", product?.name)
        formData.append("category", product?.category)
        formData.append("quantity", product?.quantity)
        formData.append("price", product?.price)
        formData.append("description", description)
        if (productImage) {
            formData.append("image", productImage)
        }

        console.log(...formData);


        await dispatch(updateProduct({ id, formData }))
        await dispatch(getAllProducts())
        navigate("/dashboard")
    }


    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">
                Add New Product
            </h3>
            <ProductForm
                product={product}
                productImage={productImage}
                productImagePreview={productImagePreview}
                description={description}

                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
            />
        </div>
    )
}

export default UpdateProduct
