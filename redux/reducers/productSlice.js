import {createSlice} from '@reduxjs/toolkit'

const initialState={
    productDetails:{},
    featuredProducts:[],
    products:[]
}

export const productDetailsSlice=createSlice({
    name:"productDetails",
    initialState,
    reducers:{
        setProductDetails:(state,action)=>{
            state.productDetails=action.payload
        },
        setFeaturedProduct:(state,action)=>{
            state.featuredProducts=action.payload
        },
        setFullProducts:(state,action)=>{
            state.products=action.payload
        }
    }
})

export const {setProductDetails,setFeaturedProduct,setFullProducts}=productDetailsSlice.actions
export default productDetailsSlice.reducer;