import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export const NavbarMenu = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand>
				<img
					src="/MozoHome.png"
					width="60"
					height="50"
					className="d-inline-block align-top"
					alt="React Bootstrap logo"
				/>
			</Navbar.Brand>
			<Link to="/">
				<span className="navbar-brand mb-0 h1">MOZO App</span>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link>
						<Link to="/manageorder">
							<span className="navbar-brand mb-0 h1">&Oacute;rdenes</span>
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/">
							<span className="navbar-brand mb-0 h1">Men&uacute;</span>
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/">
							<span className="navbar-brand mb-0 h1">Usuarios</span>
						</Link>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
