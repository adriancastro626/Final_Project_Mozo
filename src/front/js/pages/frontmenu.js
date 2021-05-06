import React, { useState, useEffect, useContext } from "react";
import PropTypes, { element } from "prop-types";
import { Container, Row, Card, CardDeck, Col, Badge } from "react-bootstrap";
import { Button } from "primereact/button";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Tag } from "primereact/tag";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Dialog } from "primereact/dialog";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputNumber } from "primereact/inputnumber";
import "primeflex/primeflex.css";

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
											<Card.Title className="mr-auto text-center font-weight-bold text-uppercase">
												{element.Name}
											</Card.Title>
											<Card.Text className="mr-auto text-center">{element.Description}</Card.Text>
										</Card.Body>
										<Card.Footer>
											<div className="p-grid">
												<div className="p-col">
													<Badge pill variant="primary" className="text-left pb-0">
														{element.Available}
													</Badge>{" "}
												</div>
												<div className="p-col" />
												<div className="p-col">
													<Badge variant="light" className="text-right pb-0 font-weight-bold">
														{"₡" + element.Price}
													</Badge>{" "}
												</div>
											</div>
											<div>
												<InputNumber
													// size="sm"
													value={element.Quantity}
													onValueChange={e => setQuantity(e.value)}
													mode="decimal"
													className="text-center"
													showButtons
													buttonLayout="horizontal"
													style={{ fontSize: "2em", width: "4rem" }}
													decrementButtonClassName="size=sm"
													incrementButtonClassName="size=sm"
													incrementButtonIcon="pi pi-plus"
													decrementButtonIcon="pi pi-minus"
												/>
											</div>
											<div className="text-center mx-auto">
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
