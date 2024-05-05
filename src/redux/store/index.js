import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../slice/cart";

export const store = configureStore({
	reducer: {
		cartSlice: cartSlice.reducer,
	},
});
