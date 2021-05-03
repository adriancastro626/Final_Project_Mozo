import React, { useState, useEffect, useContext, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col, Card } from "react-bootstrap";
import { BsPersonFill, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Toast } from "primereact/toast";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [Username, setUsername] = useState(null);
	const [Password, setPassword] = useState(null);
	const history = useHistory();
	const toast = useRef(null);

	useEffect(() => {
		console.log("mi store", store);
		actions.getToken();
		if (store.login) {
			history.push("/home");
		}
		let token = localStorage.getItem("token");
		if (token == "undefined") {
			toast.current.show({
				severity: "error",
				summary: "Error de autenticación",
				detail: "Usuario y/o contraseña incorrectos",
				life: 3000
			});
		}
	}, []);

	return (
		<Container>
			<Toast ref={toast} />
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<Form action="">
						<FormGroup className="text-center pb-0">
							<Image
								src="https://thumbs.dreamstime.com/b/icono-de-la-mano-del-camarero-dise%C3%B1o-plano-aislado-166702856.jpg/"
								roundedCircle
								width={171}
								height={180}
								className="img-responsive center-block-md-2"
							/>
							<h2>MOZO</h2>
						</FormGroup>
						<FormGroup className="text-center pb-3">
							<h1 className="text-dark">Bienvenido (a)</h1>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<label>
								<BsPersonFill /> Usuario
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Usuario"
								value={Username}
								onChange={e => setUsername(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<label>
								<BsFillLockFill /> Contraseña
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								value={Password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Link to="/retrive1">
								<Button variant="link" size="sm">
									¿Olvidó Contraseña?
								</Button>
							</Link>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							{/* {setUsername ? <Redirect to="/home" /> : "Incorrecto"} */}
							<Button
								className="btn btn-block signin"
								onClick={() => {
									actions.login(Username, Password);
								}}>
								Ingresar
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
