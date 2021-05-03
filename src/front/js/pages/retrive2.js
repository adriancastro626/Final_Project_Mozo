import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";

export const Retrive = () => {
	let { token } = useParams();
	console.log("estoy en resetpassword func", token);
	useEffect(() => {
		fetch(`https://3001-lime-rooster-trsy6393.ws-us03.gitpod.io/confirm_email/${token}`)
			.then(resp => {
				return resp.json();
			})
			.then(resp => {
				console.log(resp);
			});
	}, []);
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
								onChange={e => setPass(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<Button className="btn btn-block signin" onClick={() => reset_Password()}>
								Reestablecer
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
