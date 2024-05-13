import {createSlice} from '@reduxjs/toolkit'

const initialState={
    cart:[]
}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCartProducts:(state,action)=>{
            state.cart=action.payload
        }
    }
})

export const {setCartProducts}=cartSlice.actions
export default cartSlice.reducer;