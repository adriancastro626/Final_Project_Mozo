import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Retrive = () => {
	const { store, actions } = useContext(Context);
	let { token } = useParams();
	const [password, setPassword] = useState(null);
	console.log("estoy en resetpassword func", token);
	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1>Reestablecer Contraseña</h1>
						</FormGroup>

						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="password"
								className="form-control"
								placeholder="Nueva contraseña"
								onChange={e => setPassword(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<Button
								className="btn btn-block signin"
								onClick={() => actions.updatePassword(token, password)}>
								Reestablecer
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
