import React, { useState, useEffect } from "react";
import Product from "../product";
import { data } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getcartInfo, addtoCart } from "../../redux/slice/cart";
import Cart from "../cart";
const ProductList = () => {
	const [products] = useState(data);
	const [cartItem, setCartItem] = useState([]);
	const { totalPrice } = useSelector(getcartInfo);
	const dispatch = useDispatch();
	const handleAddToCart = (id) => {
		setCartItem([...cartItem, id]);
	};

	console.log("cartItem", cartItem);
	const countOfElement = (arr) => {
		const counter = {};
		const narr = arr.map((item) => {
			if (counter[item]) {
				counter[item] += 1;
			} else {
				counter[item] = 1;
			}
		});
		console.log("counter", counter);
		return counter;
	};
	const calculateTotalPrice = (quantity, p, dq, dp) => {
		const discountedOffer = Math.floor(quantity / dq);
		const remainingQuantity = quantity % dq;

		const totalDiscountedPrice = discountedOffer * dp;
		const remainingPrice = remainingQuantity * p;
		return totalDiscountedPrice + remainingPrice;
	};
	const calTP = (obj) => {
		let counters = {};
		let totalP;
		const pp = Object.keys(obj).map((key) => {
			const item = products.find((el) => el.id === key);
			if (item.offer !== 0 && item.offerPrice !== 0) {
				totalP = calculateTotalPrice(
					obj[key],
					item.price,
					item.offer,
					item.offerPrice,
				);
				counters[key] = totalP;
				// if (counters[key]) {
				//   counters[key] = totalP;
				// } else {
				//   counters[key] = totalP;
				// } //counter
			} else {
				console.log("obj[key]", obj[key], item.price);
				totalP = parseInt(obj[key] * item.price);
				counters[key] = totalP;
				// if (counters[key]) {
				//   counters[key] = totalP;
				// } else {
				//   counters[key] = totalP;
				// }
			} //if else
		});
		let totalPrice = 0;
		console.log("pp", pp, totalP, counters);
		const z = Object.values(counters).map((i) => {
			totalPrice = parseInt(totalPrice + i);
		});
		console.log("totalPrice cal", totalPrice);
		return totalPrice;
	};
	useEffect(() => {
		if (cartItem.length > 0) {
			const counterObj = countOfElement(cartItem);
			const totalPrice = calTP(counterObj);
			const items = cartItem;
			const item = cartItem.toString().replaceAll(",", "");
			console.log("totalPrice", totalPrice, item, items);
			dispatch(addtoCart({ item: item, items: items, totalPrice: totalPrice }));
		}
	}, [cartItem]);
	return (
		<>
			{totalPrice !== 0 ? <Cart /> : null}
			<hr />
			<div className="product-box">
				{products.length > 0
					? products.map((item) => {
							return (
								<Product
									key={item.id}
									product={item}
									handleAddToCart={handleAddToCart}
								/>
							);
					  })
					: null}
			</div>
		</>
	);
};
export default ProductList;
