import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import genericImage from "../../img/defaultFood.png";

export const NavbarLogin = () => {
	return (
		<nav className="navbar navbar-dark bg-dark mb-3 ">
			<Image src={`${genericImage}`} height="60" alt="MOZO Logo" style={{ display: "block", margin: "auto" }} />
		</nav>
	);
};
