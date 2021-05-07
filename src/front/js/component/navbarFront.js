import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Image, Dropdown, Button } from "react-bootstrap";
import genericImage from "../../img/defaultFood.png";
import { Context } from "../store/appContext";

export const NavbarFront = () => {
	const { store, actions } = useContext(Context);
	const [totalOrder, settotalOrder] = useState(0);

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 ">
			<Image src={`${genericImage}`} height="60" alt="MOZO Logo" style={{ display: "block", margin: "auto" }} />

			<Dropdown>
				<Link to="/cart">
					<Button variant="light">
						<i className="fas fa-shopping-cart" /> Ir al Carrito
					</Button>
				</Link>

				<Dropdown.Toggle split variant="light" id="dropdown-split-basic" />

				<Dropdown.Menu>
					{store.cart && store.cart.length > 0 ? (
						store.cart.map((element, index) => {
							return (
								<Dropdown.Item
									key={index}
									onClick={() => {
										actions.deleteCarrito(index, element.Total);
									}}
									className="dropdown-item">
									<i className="fas fa-trash">
										&nbsp;
										{element.Product}: Cantidad {element.Quantity}, SubTotal {element.Total}
									</i>
								</Dropdown.Item>
							);
						})
					) : (
						<p className="text-center">Carrito Vacio</p>
					)}
					<div className="dropdown-divider" />
					<Link to="/cart">
						<p>Total a pagar: {store.totalOrder}</p>
					</Link>
				</Dropdown.Menu>
			</Dropdown>
		</nav>
	);
};

// function updateCart( totalOrder ) {
// 	totalOrder.forEach( function( totalOrder ) {
// 		updateToCart( item.Total, item.quantity ); // update database
// 	});
// 	// calculate the new totals
// 	// refresh page
// }
