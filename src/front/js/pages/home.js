import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import MOZOImageUrl from "../../img/MozoHome.png";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token]
	);

	return (
		<div className="text-center mt-5">
			<h1>Administraci&oacute;n de MOZO</h1>
			<p>
				<img src={MOZOImageUrl} />
			</p>
			<div className="alert alert-info">{store.message}</div>
		</div>
	);
};
