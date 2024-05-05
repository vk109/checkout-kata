import React from "react";
import { useSelector } from "react-redux";
import { getcartInfo } from "../../redux/slice/cart";

const Cart = () => {
	const { item, totalPrice } = useSelector(getcartInfo);
	return (
		<>
			<div>
				<h3>CartInfo</h3>
				{item}-{totalPrice}
			</div>
		</>
	);
};
export default Cart;
