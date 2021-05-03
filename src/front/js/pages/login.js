import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col, Card } from "react-bootstrap";
import { BsPersonFill, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [Username, setUsername] = useState(null);
	const [Password, setPassword] = useState(null);
	const history = useHistory();

	console.log("This is your token: ", store.token);
	const handleClick = () => {
		actions.login(Username, Password);
		console.log("store ", store);
		if (!store.token) {
			history.push("/home");
		}
	};

	return (
		<Container>
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
								</Button>{" "}
							</Link>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							{/* {setUsername ? <Redirect to="/home" /> : "Incorrecto"} */}
							<Button className="btn btn-block signin" onClick={handleClick}>
								Ingresar
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
