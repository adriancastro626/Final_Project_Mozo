import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col, Card } from "react-bootstrap";
import { BsPersonFill, BsFillLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = () => {
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		};
		fetch("https://3001-turquoise-alpaca-fdgfaj66.ws-us03.gitpod.io/api/token", opts)
			.then(resp => {
				if (resp.status === 200) return resp.json();
				else alert("Hay un error");
			})
			.then()
			.catch(error => {
				console.error("Hubo un Error", error);
			});
	};

	return (
		<Container>
			{/* <Card border="primary" style={{ width: "60rem" }}> */}
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
								value={username}
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
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<Link to="/retrive1">
								<Button variant="link" size="sm">
									¿Olvidó Contraseña?
								</Button>{" "}
							</Link>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							{/* <Link to="/"> */}
							<Button className="btn btn-block signin" onClick={handleClick}>
								Ingresar
							</Button>
							{/* </Link> */}
						</FormGroup>
						{/* <FormGroup className="mx-sm-4 pb-3 text-center">
							<Link to="/register">
								<Button variant="outline-primary" onClick={handleClick}>
									Registrarse
								</Button>{" "}
							</Link>
						</FormGroup> */}
					</Form>
				</Col>
			</Row>
			{/* </Card> */}
		</Container>
	);
};
