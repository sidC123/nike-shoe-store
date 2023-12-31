import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import counterSlice from "./counterSlice";

export default configureStore({
    reducer: {
        cart: cartSlice,
        counter: counterSlice
    },
})