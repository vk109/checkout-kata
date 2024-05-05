import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	item: [],
	items: "",
	totalPrice: 0,
};
export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addtoCart: (state, action) => {
			state.item = action.payload.item;
			state.items = action.payload.items;
			state.totalPrice = action.payload.totalPrice;
		},
	},
});

export const { addtoCart } = cartSlice.actions;
export const getcartInfo = (state) => state.cartSlice;
