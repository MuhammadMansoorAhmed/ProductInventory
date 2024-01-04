import "./ProductList.scss"
import { SpinnerImage } from "../../loader/Loader"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { AiOutlineEye } from "react-icons/ai"
import { useEffect, useState } from "react"
import Search from "../../search/Search"
import { useDispatch, useSelector } from "react-redux"
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../Redux/features/product/filterSlice"
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteProduct, getAllProducts } from "../../../Redux/features/product/productSlice"
import { Link } from "react-router-dom"


const ProductList = ({ products, isLoading }) => {

    const [search, setSearch] = useState("");
    const filteredProduct = useSelector(selectFilteredProducts)
    const dispatch = useDispatch()

    const shortText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text
    }

    const delProduct = async (id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getAllProducts())
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Product',
            message: 'Are you sure to Delete Product.',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => delProduct(id)
                },
                {
                    label: 'Cancel',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    //Begin Pagination
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState([])
    const [itemOffset, setItemOffset] = useState([]);
    const itemsPerPage = 5

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredProduct.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredProduct.length / itemsPerPage));
    }, [filteredProduct, itemOffset])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProduct.length;

        setItemOffset(newOffset);
    }
    //End Pagination

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({
            products, search
        }))
    }, [dispatch, products, search]);

    return (
        <div className="product-list">
            <hr />
            <div className="table">
                <div className="--flex-between --flex-dir-column">
                    <span><h3>Inventory Items</h3></span>
                    <span><Search value={search} onChange={(e) => {
                        setSearch(e.target.value)
                    }} /></span>
                </div>
                {isLoading && <SpinnerImage />}
                <div className="table">
                    {!isLoading && products.length === 0 ? (
                        <p>-- No Product Found, Please add a product...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S/n</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((product, index) => {
                                        const { _id, name, category, price, quantity } = product
                                        return (
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{shortText(name, 16)}</td>
                                                <td>{category}</td>
                                                <td>{"$"}{price}</td>
                                                <td>{quantity}</td>
                                                <td>{"$"}{price * quantity}</td>
                                                <td className="icons" >
                                                    <span>
                                                        <Link to={`/product-detail/${_id}`}>
                                                            <AiOutlineEye
                                                                size={25}
                                                                color="purple"
                                                                style={{ marginRight: "2px" }}

                                                            />
                                                        </Link>
                                                        <Link to={`/product-update/${_id}`}>
                                                            <FaEdit
                                                                size={20}
                                                                color="green"
                                                                style={{ marginRight: "2px" }}
                                                            />
                                                        </Link>
                                                        <FaTrashAlt
                                                            size={20}
                                                            color="red"
                                                            onClick={() => confirmDelete(_id)}
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activePage"
                />
            </div>

        </div>
    )
}

export default ProductList
