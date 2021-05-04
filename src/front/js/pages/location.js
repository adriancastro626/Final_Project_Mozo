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
		fetch("https://3001-brown-leopon-6o012zu9.ws-us03.gitpod.io/api/map/route", {
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
		console.log(shape);
	}, []);

	return (
		<HEREMap
			appId="daDrH0hWlmLM1BLR0gjb"
			appCode="mozo"
			apikey="-YqnrrQhW24iqpRz-kWZla58JMkeRy68qYfd0bw2CNw"
			center={{ lat: 10.998666, lng: -63.79841 }}
			zoom={12}>
			<Marker lat={10.998666} lng={-63.79841} />
			<Marker lat={10.998666} lng={-63.79841} />
			<RouteLine shape={shape} strokeColor="#48dad0" lineWidth={4} />
		</HEREMap>
	);
};
