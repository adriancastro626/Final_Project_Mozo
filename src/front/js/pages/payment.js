import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col, Card } from "react-bootstrap";
import { BsPersonFill, BsFillLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import paypalImageUrl from "../../img/logopaypal.png";
import xImageUrl from "../../img/x.jpg";

import "../../styles/demo.scss";

export const Payment = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Row className=" justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-5 formulary border border-danger rounded">
					<Form action="">
						<FormGroup className="mx-sm-0 pb-0 text-right">
							<Image
								src={xImageUrl}
								width={50}
								height={50}
								className="img-responsive center-block-md-0"
							/>
						</FormGroup>
						<FormGroup className="text-center pb-0">
							<Image
								src="https://thumbs.dreamstime.com/b/icono-de-la-mano-del-camarero-dise%C3%B1o-plano-aislado-166702856.jpg/"
								roundedCircle
								width={171}
								height={180}
								className="img-responsive center-block-md-2"
							/>
							<h2>MOZO</h2>
							<br />
						</FormGroup>
						<FormGroup className="text-center pb-3">
							<h3 className="text-dark">PAGO DE LA ORDEN</h3>
							<h3 className="text-dark">#0000</h3>
						</FormGroup>
						<FormGroup className="text-center mx-sm-4 pb-3">
							<h6>Estás a punto de pagar con PayPal la cantidad de:</h6>
							<h1>¢ 5 650.00</h1>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3 text-center">
							<img src={paypalImageUrl} />
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
