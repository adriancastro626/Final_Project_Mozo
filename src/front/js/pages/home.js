import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import MOZOImageUrl from "../../img/MozoHome.png";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import { Button } from "primereact/button";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	// useEffect(() => {
	// 	console.log(store);

	// 	if (!store.token) {
	// 		history.push("/");
	// 	}
	// }, []);

	return (
		<div className="cont s--inactive">
			<div className="cont__inner">
				<div className="el">
					<Link to="/managemenu">
						<div className="el__overflow">
							<div className="">
								<div className="el__bg" />
								<div>
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
					</Link>
				</div>
				<div className="el">
					<Link to="/manageorder">
						<div className="el__overflow">
							<div className="">
								<div className="el__bg" />
								<div>
									<img src="https://i.ibb.co/bHSNyYz/ordenes.jpg" />
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
					</Link>
				</div>

				<div className="el">
					<Link to="/register">
						<div className="el__overflow">
							<div className="">
								<div className="el__bg" />
								<div>
									<img src="https://i.ibb.co/MkjbMrs/managing-users.jpg" />
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
					</Link>
				</div>
			</div>
		</div>
	);
};
