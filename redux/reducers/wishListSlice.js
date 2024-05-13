import {createSlice} from '@reduxjs/toolkit'

const initialState={
    wishlist:[]
}

export const wishListSlice=createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        setWishlist:(state,action)=>{
            state.wishlist=action.payload
        }
    }
})

export const {setWishlist}=wishListSlice.actions
export default wishListSlice.reducer;