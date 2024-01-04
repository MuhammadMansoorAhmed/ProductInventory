import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productServices";
import { toast } from "react-toastify";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],

}

//create new Product
export const createProduct = createAsyncThunk(
    "products/create", //name
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//get All Product
export const getAllProducts = createAsyncThunk(
    "products/getAllProducts", //name
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProducts();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//Delete Product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct", //name
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//view Product
export const viewProduct = createAsyncThunk(
    "products/viewProduct", //name
    async (id, thunkAPI) => {
        try {
            return await productService.viewProduct(id);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update Product
export const updateProduct = createAsyncThunk(
    "products/updateProduct", //name
    async ({ id, formData }, thunkAPI) => {
        try {
            return await productService.updateProduct(id, formData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VAL(state, action) {
            const product = action.payload;
            const arr = [];
            product.map((item) => {
                const { price, quantity } = item;
                const productValue = price * quantity;
                return arr.push(productValue);
            });
            const totalValue = arr.reduce((a, b) => {
                return a + b
            }, 0)
            state.totalStoreValue = totalValue;
        },
        CALC_OUT_OF_STOCK(state, action) {
            const product = action.payload;
            const arr = [];
            product.map((item) => {
                const { quantity } = item;
                return arr.push(quantity);
            });
            let count = 0;
            arr.forEach((number) => {
                if (number === 0 || number === "0") {
                    count += 1
                }
            });
            state.outOfStoke = count
        },
        CALC_CATEGORY(state, action) {
            const product = action.payload;
            const arr = [];
            product.map((item) => {
                const { category } = item;
                return arr.push(category);
            });
            const uniqueCategory = [...new Set(arr)]
            state.category = uniqueCategory;

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;//msg from server
                toast.error(action.payload)
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products.push(action.payload);
                toast.success("Product added successfully")
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;//msg from server
                toast.error(action.payload)
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products = action.payload;

            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;//msg from server
                toast.error(action.payload)
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Product deleted successfully")

            })
            .addCase(viewProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(viewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;//msg from server
                toast.error(action.payload)
            })
            .addCase(viewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;//msg from server
                toast.error(action.payload)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Product Updated Successfully")
            })
    }
})

export const { CALC_STORE_VAL, CALC_OUT_OF_STOCK, CALC_CATEGORY } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;
export const selectProduct = (state) => state.product.product;

export default productSlice.reducer