import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:{},
    isAuthenticated:false,
    shippingAddress:[]
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            state.token=action.payload.token
            state.isAuthenticated=true
        },
        setShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload
        }
    }
})

export const {setUser,setShippingAddress}=userSlice.actions
export default userSlice.reducer;