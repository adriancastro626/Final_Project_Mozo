import React, { useState, useEffect, useContext } from "react";
//import { Consumer } from "./paypalorder";
import { Context } from "../store/appContext";

import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function PayPalCapture() {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getPayPalStatus();
	}, []);
	//let OrderIds = localStorage.getItem("PayOrderId");
	//console.log(OrderIds);
	//localStorage.removeItem("PayToken");
	//localStorage.removeItem("PayOrderId");
	//OrderIds = localStorage.getItem("PayOrderId");
	//console.log(OrderIds);
	//console.log(store.PayPalOrderId);
	let estado = "";
	if (store.PayStatus === "") {
		estado = "CONSULTANDO PAGO";
	} else if (store.PayStatus === "COMPLETED") {
		estado = "PAGO REALIZADO";
	} else {
		estado = "PAGO NOOOOO REALIZADO";
	}
	console.log("ESTADO obtenido", store.PayStatus);
	useEffect(() => {
		actions.removePayPal();
	}, []);
	return (
		<Container>
			<Row className="justify-content-center pt-3 mt-3 mr-1">
				<Col className="col-md-5 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-dark">{estado}</h1>
						</FormGroup>

						<FormGroup className="text-center mx-sm-4 pb-3">
							<Link to="/">
								<Button variant="outline-primary">Regresar al menú</Button>
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default PayPalCapture;
