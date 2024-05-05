import React from "react";

const Product = ({ product, handleAddToCart }) => {
	const handleCart = (id) => {
		handleAddToCart(id);
	};
	return (
		<>
			<div className="product-item-box">
				<div className="pro-img-box">
					<img src={product.thumbnail} alt={product.id} className="pro-img" />
				</div>
				<div className="name-price-box">
					<p>{product.id}</p>
					<p>{product.price}</p>
				</div>
				<div className="add-to-cart">
					<button onClick={() => handleCart(product.id)}>Add To Cart</button>
				</div>
			</div>
		</>
	);
};
export default Product;
