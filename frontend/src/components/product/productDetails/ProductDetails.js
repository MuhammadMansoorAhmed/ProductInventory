import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOut from "../../customHooks/useRedirectLoggedOut"
import "./ProductDetails.scss"
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../Redux/features/auth/authSlice";
import { useEffect } from "react";
import { viewProduct } from "../../../Redux/features/product/productSlice";
import Card from "../../card/Card"
import { SpinnerImage } from "../../loader/Loader";
import DOMPurify from "dompurify";


const ProductDetails = () => {
    useRedirectLoggedOut("/login");
    const dispatch = useDispatch();
    const { id } = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isLoading, isError, message } = useSelector((state) => state.product);

    const stockStatus = (quantity) => {
        if (quantity > 0) {
            return <span className="--color-success">In Stock</span>
        }
        return <span className="--color-danger">Out of Stock</span>

    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(viewProduct(id))

        }
        if (isError) {
            console.log(message);
        }
    }, [dispatch, id, isError, isLoggedIn, message]);


    return (
        <div className="product-detail">
            <h3 className="--mt">Product Detail</h3>
            <Card cardClass="card">
                {isLoading && <SpinnerImage />}
                {product && (
                    <div className="detail">
                        <Card cardClass={"group"}>
                            {product?.image ? (
                                <img src={product.image.filePath} alt={product.image.fileName} />
                            ) : (
                                <p>No image set for this product</p>

                            )}
                        </Card>
                        <h4>Product Availability: {stockStatus(product.quantity)}</h4>
                        <hr />
                        <h4><span className="badge">Name:</span> &nbsp; {product.name}</h4>
                        <p className=""><b>&rarr; SKU: </b> {product.sku}</p>
                        <p className=""><b>&rarr; Category: </b> {product.category}</p>
                        <p className=""><b>&rarr; Price: </b> {product.price}</p>
                        <p className=""><b>&rarr; Quantity in Stock: </b> {product.quantity}</p>
                        <p className=""><b>&rarr; Total value in Stock: </b> {"$"}{product.quantity * product.price}</p>
                        <hr />
                        <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.description),
                        }}></div>
                        <hr />
                        <code className="--color-dark">Created on: {product.createdAt.toLocaleString("en-US")}</code><br />
                        <code className="--color-dark">Last Updated: {product.updatedAt.toLocaleString("en-US")}</code>
                    </div>
                )}
            </Card>

        </div>
    )
}

export default ProductDetails
