import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProduct: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            const { products, search } = action.payload;
            const tempProducts = products.filter((product) => {
                return product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
            })

            state.filteredProduct = tempProducts
        }
    }
});

export const { FILTER_BY_SEARCH } = filterSlice.actions

export const selectFilteredProducts = (state) => state.filter.filteredProduct;

export default filterSlice.reducer