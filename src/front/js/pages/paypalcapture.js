import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function PayPalCapture() {
	const { store, actions } = useContext(Context);
	let estados = "";
	let enviar = "";
	let boton = "";
	let estado1 = "";
	let estado2 = "";
	let estado3 = "";
	var guardado = localStorage.getItem("datos");

	if (store.PayStatus === "") {
		estados = "CONSULTANDO PAGO";
		enviar = "/paypalcapture";
		boton = "Espere";
	} else if (store.PayStatus === "COMPLETED") {
		estados = "ORDEN COMPLETADA";
		estado1 = "Su orden es la #" + store.NewOrderID;
		estado2 = "Gracias por su compra!";
		estado3 = "Tiempo estimado de preparación: 20 minutos";

		enviar = "/frontmenu";
		boton = "Aceptar";
		//	localStorage.removeItem("TipoCambio");
		//	localStorage.removeItem("datos");
	} else {
		estados = "PAGO NO REALIZADO";
		enviar = "/cart";
		boton = "Regresar";
		//	localStorage.removeItem("TipoCambio");
		//	localStorage.removeItem("datos");
	}
	useEffect(async () => {
		await actions.getPayPalStatus();
		if (store.PayStatus === "COMPLETED") {
			await actions.newOrder(
				"Nueva",
				notes,
				new Date(),
				utotProducts,
				utotPrices,
				utotDiscount,
				utotTax,
				utotSubTotal,
				utottotTotal,
				"Pagada"
			);
			estados = "ORDEN COMPLETADA";
			estado1 = "Su orden es la #" + store.NewOrderID;
			estado2 = "Gracias por su compra!";
			estado3 = "Tiempo estimado de preparación: 20 minutos";

			enviar = "/frontmenu";
			boton = "Aceptar";
			//	localStorage.removeItem("TipoCambio");
			//	localStorage.removeItem("datos");
		}
	}, []);

	console.log("objetoObtenido: ", JSON.parse(guardado));

	let notes = JSON.parse(guardado)[0];
	let utotProducts = JSON.parse(guardado)[1];
	let utotPrices = JSON.parse(guardado)[2];
	let utotDiscount = JSON.parse(guardado)[3];
	let utotTax = JSON.parse(guardado)[4];
	let utotSubTotal = JSON.parse(guardado)[5];
	let utottotTotal = JSON.parse(guardado)[6];
	console.log("Estadosss", store.PayStatus);
	useEffect(() => {
		actions.removePayPal();
	}, []);

	console.log("Mi store", store);
	return (
		<Container className="border border-danger rounded">
			<Row className="justify-content-center pt-3 mt-3 mr-1">
				<Col className="col-md-5 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-dark">{estado1}</h1>
							<br />
							<h1 className="text-dark">{estados}</h1>
							<br />
							<h1>{estado2}</h1>
							<br />
							<h6>{estado3}</h6>
						</FormGroup>
						<FormGroup className="text-center mx-sm-4 pb-3">
							<Link to={enviar}>
								<Button variant="outline-primary">{boton} </Button>
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default PayPalCapture;
