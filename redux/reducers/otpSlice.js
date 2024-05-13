import {createSlice} from '@reduxjs/toolkit'

const initialState={
    email:null
}

export const emailSlice=createSlice({
    name:"email",
    initialState,
    reducers:{
        setEmailvalue:(state,action)=>{
            state.email=action.payload
        }
    }
})

export const {setEmailvalue}=emailSlice.actions
export default emailSlice.reducer;