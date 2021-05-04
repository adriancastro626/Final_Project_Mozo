import React from "react";
import { HEREMap, Marker, RouteLine } from "here-maps-react";

export const Location = () => {
	const [shape, setShape] = React.useState([]);

	function getData() {
		fetch(
			"https://router.hereapi.com/v8/routes?apikey=748NnFbJXQPbezH0nR6ssrGGmegWF_ddjzl21htvx7o&transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=polyline"
		)
			.then(res => res.json())
			.then(data => getRoute(data));
	}

	function getRoute(data) {
		fetch("https://3001-violet-macaw-moa7sc2l.ws-us03.gitpod.io/api/map/route", {
			method: "POST",
			body: JSON.stringify({ route: data.routes[0].sections[0].polyline })
		})
			.then(res => res.json())
			.then(data => {
				setShape(data);
				return data;
			})
			.catch(e => {
				console.error("Error to get decode: ", e);
			});
	}

	React.useEffect(() => {
		let route = getData();
	}, []);

	return <h1>hola</h1>;
};
