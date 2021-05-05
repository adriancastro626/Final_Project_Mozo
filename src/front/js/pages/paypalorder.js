import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Image } from "react-bootstrap";
import PaypalUrl from "../../img/PP_logopeq.png";
import { Context } from "../store/appContext";

//import OrderContext from "../store/orderContext";
//import PayPal from "../pages/paypal";

export function PayPalOrder() {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getPayPalOrder();
	}, []);
	console.log(store.PayPalOrder);
	return (
		<Container>
			<div>
				<Button href={store.PayHRef} target="_blank" variant="outline-warning">
					Pagar con <Image src={PaypalUrl} />
				</Button>
			</div>
		</Container>
	);
}
export default PayPalOrder;
