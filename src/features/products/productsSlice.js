import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const Products_URL = 'https://dummyjson.com/products?limit=100';

const initialState = {
  allProducts:[],
  products: [],
  isLoading: true,
  isError: false,
  message:'',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts',async ()=>{
    try {
        const res = await axios.get(Products_URL);
        return res.data.products;
    } catch (error) {
        return error.message;
    }
})

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory:(state,action)=>{
     state.products =  state.allProducts.filter((product)=>product.category === action.payload)
    },
    filterByBrand:(state,action)=>{
      state.products = state.allProducts.filter((product)=>product.brand === action.payload)
    },
    filterByPrice:(state)=>{
      state.products = state.products.sort((a, b) => {
        return a.price - b.price;
    });
    },
    filterByRating:(state)=>{
      state.products = state.products.sort((a, b) => {
        return b.rating - a.rating;
    });
    },
    filterByDiscount:(state)=>{
      state.products = state.products.sort((a, b) => {
        return b.discountPercentage - a.discountPercentage;
    });
    }
  },
  extraReducers(builder){
    builder
    .addCase(fetchProducts.pending,(state,action)=>{
        state.isLoading=true;
    })
    .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.products = action.payload
        state.allProducts = action.payload
    })
    .addCase(fetchProducts.rejected,(state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.error.message
    })
  }
});
export const { filterByCategory,filterByBrand,filterByPrice,filterByDiscount,filterByRating } = productsSlice.actions;

export default productsSlice.reducer;
