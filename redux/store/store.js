import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice.js'
import emailReducer from '../reducers/otpSlice.js'
import productDetailsReducer from '../reducers/productSlice.js'
import cartReducer from '../reducers/cartSlice.js';
import orderReducer from '../reducers/orderSlice.js'
import wishListSlice from '../reducers/wishListSlice.js';


export const store=configureStore({
    reducer:{
        user:userReducer,
        email:emailReducer,
        productDetails:productDetailsReducer,
        cart:cartReducer,
        order:orderReducer,
        wishlist:wishListSlice
    },
})