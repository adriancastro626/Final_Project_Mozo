import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Image, Dropdown, Button } from "react-bootstrap";
import genericImage from "../../img/defaultFood.png";
import { Context } from "../store/appContext";

export const NavbarFront = () => {
	const { store, actions } = useContext(Context);

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
										actions.deleteCarrito(index);
									}}
									className="dropdown-item">
									{element.Product}, Cantidad {element.Quantity}, SubTotal {element.SubTotal}
								</Dropdown.Item>
							);
						})
					) : (
						<p className="text-center">Carrito Vacio</p>
					)}
					<Dropdown.Item>{store.Total}</Dropdown.Item>

					{/* {store.cart && store.cart.length > 0
						? store.cart.map((element, index) => (
								<Dropdown.Item key={index}>
									{element.Product}, {element.Quantity}, {element.SubTotal}
								</Dropdown.Item>
						  ))
						: ""} */}
				</Dropdown.Menu>
			</Dropdown>
		</nav>
	);
};
