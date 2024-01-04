import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOut from "../../components/customHooks/useRedirectLoggedOut";
import { selectIsLoggedIn } from "../../Redux/features/auth/authSlice";
import { useEffect } from "react";
import { getAllProducts } from "../../Redux/features/product/productSlice";
import ProductList from "../../components/product/productlist/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";



const Dashboard = () => {
    useRedirectLoggedOut("/login")

    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isLoading, isError, message } = useSelector((state) => state.product);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getAllProducts())
        }
        if (isError) {
            console.log(message);
        }
    }, [dispatch, isError, isLoggedIn, message]);

    return (
        <div>
            <ProductSummary products={products} />
            <ProductList products={products} isLoading={isLoading} />

        </div>
    )
}

export default Dashboard
