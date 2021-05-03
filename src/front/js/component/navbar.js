import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Menubar } from "primereact/menubar";
import { Container } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import genericImage from "../../img/defaultFood.png";

export const NavbarMenu = () => {
	const { store, actions } = useContext(Context);
	const items = [
		{
			label: "Menu",
			icon: "pi pi-fw pi-book",

			items: [
				{
					label: "Ver",
					icon: "pi pi-fw pi-search",
					url: (window.location.hash = "/frontmenu")
				},
				{
					label: "Administrar",
					icon: "pi pi-fw pi-pencil",
					url: (window.location.hash = "/managemenu")
				}
			]
		},
		{
			label: "Usuarios",
			icon: "pi pi-fw pi-user",
			items: [
				{
					label: "Nuevo",
					icon: "pi pi-fw pi-user-plus",
					url: (window.location.hash = "/register")
				},
				{
					label: "Administrar",
					icon: "pi pi-fw pi-users",
					url: (window.location.hash = "/manageuser")
				}
			]
		},
		{
			label: "Ordenes",
			icon: "pi pi-fw pi-calendar",
			items: [
				{
					label: "Administrar",
					icon: "pi pi-fw pi-pencil",
					url: (window.location.hash = "/manageorder")
				}
			]
		}
	];
	return (
		<Menubar
			model={items}
			end={
				<Link to="/">
					<Button
						label="Logout"
						icon="pi pi-fw pi-power-off"
						className="p-button-danger"
						onClick={() => actions.logout()}
					/>{" "}
				</Link>
			}
			start={
				<Link to="/home">
					<img
						alt="logo"
						src={`${genericImage}`}
						onError={e => (e.target.src = `${genericImage}`)}
						height="40"
						className="p-mr-2"
					/>
				</Link>
			}
		/>
	);
};
