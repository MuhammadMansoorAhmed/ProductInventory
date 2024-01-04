import "./ProductSummary.scss"
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import { CALC_OUT_OF_STOCK, CALC_STORE_VAL, CALC_CATEGORY, selectTotalStoreValue, selectOutOfStock, selectCategory } from "../../../Redux/features/product/productSlice";
import { useEffect } from "react";


const earningIcon = <AiFillDollarCircle size={40} color="#fff" />
const productIcon = <BsCart4 size={40} color="#fff" />
const categoryIcon = <BiCategory size={40} color="#fff" />
const outOfStockIcon = <BsCartX size={40} color="#fff" />

//Format Amount
export const formatAmount = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ProductSummary = ({ products }) => {
    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue)
    const outOfStock = useSelector(selectOutOfStock)
    const category = useSelector(selectCategory)

    useEffect(() => {
        dispatch(CALC_STORE_VAL(products))
        dispatch(CALC_OUT_OF_STOCK(products))
        dispatch(CALC_CATEGORY(products))
    }, [dispatch, products])


    return (
        <div className="product-summary">
            <h3 className="--mt">Inventory stats</h3>
            <div className="info-summary">
                <InfoBox
                    icon={productIcon}
                    title={"Total Product"}
                    count={products.length}
                    bgColor="card1"
                />
                <InfoBox
                    icon={earningIcon}
                    title={"Total Store Value"}
                    count={`$${formatAmount(totalStoreValue.toFixed(2))}`}
                    bgColor="card2"
                />
                <InfoBox
                    icon={outOfStockIcon}
                    title={"Out Of Stoke"}
                    count={outOfStock}
                    bgColor="card3"
                />
                <InfoBox
                    icon={categoryIcon}
                    title={"All Categories"}
                    count={category.length}
                    bgColor="card4"
                />
            </div>
        </div>
    )
}

export default ProductSummary
