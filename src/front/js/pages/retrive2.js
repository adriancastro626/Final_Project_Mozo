import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Button, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Toast } from "primereact/toast";

export const Retrive = () => {
	const { store, actions } = useContext(Context);
	const toast = useRef(null);
	let { token } = useParams();
	const [password, setPassword] = useState(null);
	const [response, setResponse] = useState(store.response);
	console.log("estoy en resetpassword func", token);
	return (
		<Container>
			<Toast ref={toast} />
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
								type="reset"
								className="btn btn-block signin"
								onClick={async () => {
									await actions.updatePassword(token, password);
									await setResponse(store.response);
									if (store.response == "OK") {
										toast.current.show({
											severity: "success",
											summary: "Actualizacion Correcta",
											detail: "Puede intentar el ingreso al sistema nuevamente",
											life: 3000
										});
										await setPassword("");
									} else {
										toast.current.show({
											severity: "error",
											summary: "Actualizacion Incorrecta",
											detail: "No fue posible actualizar la contraseña. Token vencido o invalido",
											life: 3000
										});
									}
								}}>
								Reestablecer
							</Button>
							<br />
							<Link to="/">
								<Button className="btn btn-secondary btn-block">Ir al inicio</Button>
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
