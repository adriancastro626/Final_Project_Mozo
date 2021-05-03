import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./login";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [Username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [type, setType] = useState("");
	const [password, setPassword] = useState("");
	const [validated, setValidated] = useState(false);
	const history = useHistory();
	useEffect(() => {
		if (store.signUp) {
			alert("El usuario ha sido creado exitosamente");
			history.push("/");
		}
		actions.getToken();
		if (!store.login) {
			history.push("/");
		}
	}, []);
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
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								{" "}
								<BsFillLockFill /> Confirmar Contraseña
							</Form.Label>
							<Form.Control type="password" placeholder="Contraseña" required />
						</Form.Group>
						<Form.Group id="formHorizontalRadios1" className="text-center">
							<Form.Check
								type="radio"
								inline
								value="Administrador"
								label="Administrador"
								name="UserType"
								onChange={e => setType(e.target.value)}
							/>
							<Form.Check
								type="radio"
								inline
								value="Colaborador"
								label="Colaborador"
								name="UserType"
								onChange={e => setType(e.target.value)}
							/>
						</Form.Group>
						<Link to="/register1">
							<FormGroup className="mx-sm-4 pb-3 text-center">
								<Button
									variant="outline-success"
									type="submit"
									onClick={() => {
										actions.signUp(Username, email, password, type);
									}}>
									Crear Usuario
								</Button>
							</FormGroup>
						</Link>
					</Form>
				</Col>
			</Row>
			<br />
			<Link to="/home">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
