import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function PayPalCapture() {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getPayPalStatus();
	}, []);

	let estado = "";
	let enviar = "";
	let boton = "";
	let estado1 = "";
	let estado2 = "";
	let estado3 = "";
	if (store.PayStatus === "") {
		estado = "CONSULTANDO PAGO";
		enviar = "/paypalcapture";
		boton = "Espere";
	} else if (store.PayStatus === "COMPLETED") {
		estado = "ORDEN COMPLETADA";
		estado1 = "Su orden es la #" + store.NewOrderID;
		estado2 = "Gracias por su compra!";
		estado3 = "Tiempo estimado de preparación: 20 minutos";

		enviar = "/";
		boton = "Aceptar";
	} else {
		estado = "PAGO NO REALIZADO";
		enviar = "/cart";
		boton = "Regresar";
	}
	useEffect(() => {
		actions.removePayPal();
	}, []);
	return (
		<Container className="border border-danger rounded">
			<Row className="justify-content-center pt-3 mt-3 mr-1">
				<Col className="col-md-5 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-dark">{estado1}</h1>
							<br />
							<h1 className="text-dark">{estado}</h1>
							<br />
							<h1>{estado2}</h1>
							<br />
							<h6>{estado3}</h6>
						</FormGroup>
						<FormGroup className="text-center mx-sm-4 pb-3">
							<Link to={enviar}>
								<Button variant="outline-primary">{boton}</Button>
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default PayPalCapture;
