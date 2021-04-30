import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./login";
import "../../styles/demo.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [Username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validated, setValidated] = useState(false);
	const history = useHistory();
	useEffect(() => {
		console.log("estoy en el useEffect");
		if (store.signUp) {
			alert("Username was created successfully");
			history.push("/");
		}
	});
	const handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	// export const Register = () => {
	//     const { store, actions } = useContext(Context);
	//     const [username, setUsername] = useState("");
	//     const [Email, setEmail] = useState("");
	//     const [Password, setPassword] = useState("");
	//     const [validated, setValidated] = useState(false);
	//     const history = useHistory();
	//     const token = sessionStorage.getItem("token");

	// 	const handleSubmit = event => {
	// 		const form = event.currentTarget;
	// 		if (form.checkValidity() === false) {
	// 			event.preventDefault();
	// 			event.stopPropagation();
	// 		}

	// 		setValidated(true);
	// 	};

	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<FormGroup className="text-center pb-3">
						<h1 className="text-dark">Nuevo Usuario</h1>
					</FormGroup>
					<Form noValidate validated={validated} onClick={handleSubmit}>
						<Form.Group controlId="formBasicUser">
							<Form.Label>
								{" "}
								<BsPeopleCircle /> Nombre Usuario
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Usuario"
								onChange={e => setUsername(e.target.value)}
								required
								isInvalid
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>
								{" "}
								<BsEnvelope /> Correo Electronico
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="Correo"
								onChange={e => setEmail(e.target.value)}
								required
								isInvalid
							/>
							<Form.Text className="text-muted">Nunca compartiremos su correo, con nadie más.</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								{" "}
								<BsFillLockFill /> Contraseña
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Contraseña"
								onChange={e => setPassword(e.target.value)}
								required
								isInvalid
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								{" "}
								<BsFillLockFill /> Confirmar Contraseña
							</Form.Label>
							<Form.Control type="password" placeholder="Contraseña" required isInvalid />
						</Form.Group>
						<Form.Group id="formHorizontalRadios1" className="text-center">
							<Form.Check type="radio" inline label="Administrador" />
							<Form.Check type="radio" inline label="Colaborador" />
						</Form.Group>
						<Link to="/register1">
							<FormGroup className="mx-sm-4 pb-3 text-center">
								<Button
									variant="outline-success"
									type="submit"
									onClick={() => {
										actions.signUp(Username, email, password);
									}}>
									Crear Usuario
								</Button>
							</FormGroup>
						</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
