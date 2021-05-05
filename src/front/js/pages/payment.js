import React, { useContext } from "react";
import PayPalOrder from "./paypalorder";
import { Context } from "../store/appContext";

import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Payment() {
	const { store, actions } = useContext(Context);
	let Cobro = 6000;
	const Cambio = 600;
	let pagar = Cobro / Cambio;
	return (
		<Container>
			<Row className="justify-content-center pt-3 mt-3 mr-1">
				<Col className="col-md-5 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-dark">PAGO DE LA ORDEN</h1>
							<h3 className="text-dark">{store.NewOrderID}</h3>
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
							<Link to="/">
								<Button variant="outline-danger">Regresar sin pagar</Button>
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default Payment;
