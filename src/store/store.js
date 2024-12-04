import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../Reducers/UserReducer';
import productsSlice from '../Reducers/productSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        products:productsSlice
          }
})

export default store;