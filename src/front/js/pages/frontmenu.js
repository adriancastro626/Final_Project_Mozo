import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Card, CardDeck, Carousel, Badge } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";

export const Frontmenu = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {});

	return (
		<Container>
			<h1 className="mr-auto text-center">MOZO MENU</h1>
			{/* <Container>
				<Carousel fade>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://www.recetas-venezolanas.com/base/stock/Recipe/36-image/36-image_web.jpg"
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>{name}</h3>
							<p>{description}</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://blogthinkbig.com/wp-content/uploads/sites/4/2017/06/hamburguesa.jpg?fit=940%2C400"
							alt="Second slide"
						/>

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://colanta.com/sabe-mas/wp-content/uploads/2018/11/Nachos-Con-Carne-1.jpg"
							alt="Third slide"
						/>

						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</Container> */}
			<div>
				<CardDeck>
					<Card>
						<Card.Img variant="top" src="holder.js/100px160" />
						<Card.Body>
							<Card.Title>Hamburguesa</Card.Title>
							<Card.Text>Description del menu</Card.Text>
						</Card.Body>
						<Card.Footer>
							<Badge pill variant="primary">
								Disponibilidad
							</Badge>{" "}
						</Card.Footer>
					</Card>
					<Card>
						<Card.Img variant="top" src="holder.js/100px160" />
						<Card.Body>
							<Card.Title>Card title</Card.Title>
							<Card.Text>
								This card has supporting text below as a natural lead-in to additional content.{" "}
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">Last updated 3 mins ago</small>
						</Card.Footer>
					</Card>
					<Card>
						<Card.Img variant="top" src="holder.js/100px160" />
						<Card.Body>
							<Card.Title>Card title</Card.Title>
							<Card.Text>
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This card has even longer content than the first to show that equal height
								action.
							</Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">Last updated 3 mins ago</small>
						</Card.Footer>
					</Card>
				</CardDeck>
			</div>
		</Container>
	);
};
