import React from "react";

import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class PayPalCapture extends React.Component {
	//static contextType = OrderContext;

	constructor(props) {
		super(props);
		this.state = {
			numAut: "",
			orderIds: "",
			tokens: ""
		};
	}
	componentDidMount() {
		//console.log("Context=" + JSON.stringify(this.context));
		let orderId = "";
		let token = "";
		fetch("https://api.sandbox.paypal.com/v2/checkout/orders/" + orderId + "/capture", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		})
			.then(function(response) {
				console.log("Response object", response);
				return response.json();
			})
			.then(async data => {
				console.log("Response data", data);
				console.log("Response data (formatted)", JSON.stringify(data, null, 4));
				console.log("Para link: ", data.id);
				this.setState({ numAut: data.id });
				fetch("https://api.sandbox.paypal.com/v2/checkout/orders/" + orderId, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					}
				})
					.then(function(response) {
						console.log("Response object", response);
						return response.json();
					})
					.then(async data => {
						console.log("Response data", data);
						console.log("Response data (formatted)", JSON.stringify(data, null, 4));
						this.setState({ numAut: data.id });
					})
					.catch(err => {
						console.log({ ...err });
					});
			})
			.catch(err => {
				console.log({ ...err });
			});
	}
	render() {
		return (
			<Container>
				<Row className="justify-content-center pt-3 mt-3 mr-1">
					<Col className="col-md-5 formulary">
						<Form action="">
							<FormGroup className="text-center pb-3">
								<h1 className="text-dark">PAGO REALIZADO</h1>
								{
									//	<h3 className="text-dark">{this.state.numAut}</h3>
								}
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
}
export default PayPalCapture;
