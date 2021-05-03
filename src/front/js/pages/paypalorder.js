import React from "react";
import { Button, Image } from "react-bootstrap";
import PaypalUrl from "../../img/PP_logopeq.png";

//import OrderContext from "../store/orderContext";
//import PayPal from "../pages/paypal";

class PayPalOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refLinks: "",
			orderIds: "",
			tokens: ""
		};
	}
	componentDidMount() {
		console.log("getDerivedStateFromProps(nextProps, prevState)");
		fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-Language": "en_US",
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " +
					btoa(
						"ARuLXWvNlzWJ0yGtZ7NwK9VkmpV9Uf632YlZP8iL0qSPSQZjB9v6aFpznzW9S9z1RzF-hFqdeN4pcNqM:EMWPNB72gCPBFCgfrw095iGVmMGozc9zTeYQlyi2bKNSeoekwMRW_Q8OZVPDljADUvnXjP5ZevxklbRT"
					)
			},
			body: "grant_type=client_credentials"
		})
			.then(response => response.json())
			.then(async data => {
				console.log(data.access_token);
				let accessToken = data.access_token;
				this.setState({ tokens: accessToken });
				let createOrder = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + accessToken
					},
					body: JSON.stringify({
						intent: "CAPTURE",
						purchase_units: [
							{
								amount: {
									currency_code: "USD",
									value: "10"
								}
							}
						],
						application_context: {
							shipping_preference: "NO_SHIPPING",
							return_url: "https://3000-rose-walrus-5pllnzdl.ws-us03.gitpod.io/paypal",
							cancel_url: ""
						}
					})
				};
				console.log("Order body string", createOrder.body);
				console.log("Order body (formatted)", JSON.stringify(JSON.parse(createOrder.body), null, 4));
				fetch("https://api.sandbox.paypal.com/v2/checkout/orders", createOrder)
					.then(async function(response) {
						return response.json();
					})
					.then(async data => {
						console.log("Response data", data);
						console.log("Response data (formatted)", JSON.stringify(data, null, 4));
						let orderId = await data.id;
						console.log(data);
						console.log("Order ID: ", orderId);
						let refLink1 = "https://www.sandbox.paypal.com/checkoutnow?token=" + orderId;
						console.log("Para link: ", refLink1);
						this.setState({ refLinks: refLink1 });
						this.setState({ orderIds: orderId });
						console.log("RefLink: ", refLinks);
					})
					.catch(err => {
						console.log({ ...err });
					});
			})
			.catch(function(error) {
				let edata = error.message;
				console.log("Error:", edata);
			});
		console.log(this.state);
	}

	render() {
		const orderData = {
			orderIds: this.state.orderIds,
			tokens: this.state.tokens
		};
		console.log(orderData);
		console.log("State:", this.state);

		return (
			//<OrderContext.Provider value={this.state}>
			<div>
				<Button href={this.state.refLinks} target="_blank" variant="outline-warning">
					Pagar con <Image src={PaypalUrl} />
				</Button>
			</div>
			//</OrderContext.Provider>
		);
	}
}
export default PayPalOrder;
