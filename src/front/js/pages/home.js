import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import MOZOImageUrl from "../../img/MozoHome.png";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token]
	);

	return (
		<div className="cont s--inactive">
			<div className="cont__inner">
				<div className="el">
					<div>
						<Link to="/frontmenu">
							<Button label="Menu" className="p-button-rounded p-button-secondary" />
						</Link>
					</div>
					<div className="el__overflow">
						<div className="">
							<div className="el__bg" />
							<div className="">
								<img src="https://i.ibb.co/3BvpXJN/menu.jpg" />
							</div>
						</div>
					</div>
					<div className="el__index">
						<div className="el__index-back">1</div>
						<div className="el__index-front">
							<div className="el__index-overlay" data-index="1">
								1
							</div>
						</div>
					</div>
				</div>
				<div className="el">
					<div>
						<Link to="/manageorder">
							<Button label="Ordenes" className="p-button-rounded p-button-secondary" />
						</Link>
					</div>
					<div className="el__overflow">
						<div className="">
							<div className="el__bg" />
							<div className="">
								<Link to="/manageorder">
									<img src="https://i.ibb.co/bHSNyYz/ordenes.jpg" />
								</Link>
							</div>
						</div>
					</div>
					<div className="el__index">
						<div className="el__index-back">2</div>
						<div className="el__index-front">
							<div className="el__index-overlay" data-index="2">
								2
							</div>
						</div>
					</div>
				</div>
				<div className="el">
					<div>
						<Link to="/register">
							<Button label="Usuario" className="p-button-rounded p-button-secondary" />
						</Link>
					</div>
					<div className="el__overflow">
						<div className="">
							<div className="el__bg" />
							<div className="">
								<Link to="/register">
									<img src="https://i.ibb.co/MkjbMrs/managing-users.jpg" />
								</Link>
							</div>
						</div>
					</div>
					<div className="el__index">
						<div className="el__index-back">3</div>
						<div className="el__index-front">
							<div className="el__index-overlay" data-index="3">
								3
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
