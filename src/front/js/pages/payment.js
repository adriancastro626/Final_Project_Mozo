import React, { useContext, useEffect } from "react";
import PayPalOrder from "./paypalorder";
import { Context } from "../store/appContext";

import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Payment() {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getTipoCambio();
	}, []);

	var guardado = localStorage.getItem("datos");

	console.log("objetoObtenido: ", JSON.parse(guardado));
	let Cobro = JSON.parse(guardado)[6];
	console.log("Cobro:", Cobro);

	const Cambio = localStorage.getItem("TipoCambio");
	console.log("Cambio", Cambio);
	let pagar = Cobro / Cambio;
	pagar = pagar.toFixed(2);
	return (
		<Container className="border border-danger rounded">
			<Row className="justify-content-center pt-3 mt-3 mr-1">
				<Col className="col-md-5 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-dark">REALICE SU PAGO</h1>
						</FormGroup>
						<FormGroup className="text-center mx-sm-4 pb-3">
							<h6>Por un monto de:</h6>
							<h1>$ {pagar}</h1>
							<h3>(¢ {Cobro})</h3>
							<h6>Con tipo de cambio en USD$ 1 = ¢ {Cambio}</h6>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3 text-center">
							<PayPalOrder />
						</FormGroup>
						<FormGroup className="text-center mx-sm-4 pb-3">
							<Link to="/frontmenu">
								<Button variant="outline-danger">Regresar al men&uacute;</Button>
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default Payment;
