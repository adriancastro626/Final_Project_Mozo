import React, { useEffect, useContext } from "react";
import { Container, Button, Image } from "react-bootstrap";
import PaypalUrl from "../../img/PP_logopeq.png";
import { Context } from "../store/appContext";

export function PayPalOrder() {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getPayPalOrder();
	}, []);
	return (
		<Container>
			<div>
				<Button href={store.PayHRef} variant="outline-warning">
					Pagar con <Image src={PaypalUrl} />
				</Button>
			</div>
		</Container>
	);
}
export default PayPalOrder;
