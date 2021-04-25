import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const NavbarMenu = () => {
	const { store, actions } = useContext(Context);
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
						{!store.token ? (
							<Link to="/login">
								<Button className="navbar-brand mb-0 h1">Log In</Button>
							</Link>
						) : (
							<Button onClick={() => actions.logout()} className="navbar-brand mb-0 h1">
								Log out
							</Button>
						)}
					</Nav.Link>
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
						<Link to="/register">
							<span className="navbar-brand mb-0 h1">Usuarios</span>
						</Link>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
