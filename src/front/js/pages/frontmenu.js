import React, { useState, useEffect, useContext } from "react";
import PropTypes, { element } from "prop-types";
import { Container, Button, Row, Card, CardDeck, Col, Badge } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputNumber } from "primereact/inputnumber";

export const Frontmenu = () => {
	const { store, actions } = useContext(Context);
	const [Quantity, setQuantity] = useState(0);

	useEffect(() => {
		actions.getAllProducts();
	}, []);

	return (
		<Container>
			<h1 className="mr-auto text-center">MOZO MENU</h1>
			<div>
				<Row>
					{store.products && store.products.length > 0
						? store.products.map((element, index) => (
								<CardDeck key={index} className="col-md-4">
									<Card>
										<Card.Img variant="top" src={`${element.ImageURL}`} />
										<Card.Body>
											<Card.Title>{element.Name}</Card.Title>
											<Card.Text>{element.Description}</Card.Text>
										</Card.Body>
										<Card.Footer>
											<div className="text-center pb-0">
												<Badge pill variant="primary">
													{element.Available}
												</Badge>{" "}
												<Badge variant="light">{element.Price}</Badge>{" "}
											</div>
											<div className="text-center pb-0">
												<Button
													variant="success"
													size="sm"
													onClick={() => {
														actions.addCarrito(
															Quantity,
															element.ProductID,
															element.Name,
															element.Price
														);
													}}>
													Agregar
												</Button>{" "}
												<InputNumber
													value={element.Quantity}
													onValueChange={e => setQuantity(e.value)}
													mode="decimal"
													showButtons
													buttonLayout="vertical"
													style={{ width: "6em" }}
													decrementButtonClassName="p-button-secondary"
													incrementButtonClassName="p-button-secondary"
													incrementButtonIcon="pi pi-plus"
													decrementButtonIcon="pi pi-minus"
												/>
											</div>
										</Card.Footer>
									</Card>
								</CardDeck>
						  ))
						: ""}
				</Row>
			</div>
		</Container>
	);
};
