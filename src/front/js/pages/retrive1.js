import React, { useContext, useState, useRef } from "react";
import { Container, Button, Image, Form, Modal } from "react-bootstrap";
import { BsFillUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Toast } from "primereact/toast";

export const Retrive1 = () => {
	const toast = useRef(null);
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [response, setResponse] = useState(store.response);
	return (
		<Container>
			<Toast ref={toast} />
			<Modal.Dialog>
				<Modal.Header>
					<Modal.Title>Recuperar Contraseña</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>No te preocupes, a todos nos pasa.</p>

					<Form>
						<Form.Group controlId="formBasicEmail font-weight-bold">
							<Form.Label className="mb-0">
								<BsFillUnlockFill /> Ingrese su Correo
							</Form.Label>
							<Form.Control
								type="email"
								onChange={e => setEmail(e.target.value)}
								placeholder="Ingrese Correo"
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer className="justify-content-center">
					<Button
						type="reset"
						variant="outline-dark"
						onClick={async () => {
							await actions.sendEmailRetrievePassword(email);
							await setResponse(store.response);
							if (store.response == "OK") {
								toast.current.show({
									severity: "success",
									summary: "Envio Correcto",
									detail: "El correo ha sido enviado, por favor verifiquelo y siga las instrucciones",
									life: 3000
								});
								await setEmail("");
							} else {
								toast.current.show({
									severity: "error",
									summary: "Envio Incorrecto",
									detail:
										"No fue posible enviar el correo. Es posible que no se encuentre registrado. Verifique los datos.",
									life: 3000
								});
							}
						}}>
						Recuperar Contraseña
					</Button>
					<Button variant="outline-dark">
						<Link to="/">Ir al inicio</Link>
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		</Container>
	);
};
