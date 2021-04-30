const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			baseURL: `${process.env.BACKEND_URL}/api`,
			login: false,
			UserName: "",
			signUp: false,
			orders: [
				// {
				// 	OrderID: 101,
				// 	Quantity: 5,
				// 	State: "En Preparacion",
				// 	Notes: "Sin lechuga"
				// }
			],
			detailorders: [
				// {
				// 	OrderID: 1,
				// 	Products: [
				// 		{
				// 			Quantity: 2,
				// 			Product: "Hamburguesa clasica"
				// 		},
				// 		{
				// 			Quantity: 1,
				// 			Product: "Taco"
				// 		}
				// 	]
				// },
			],
			cart: [
				{
					Quantity: 2,
					Product: "Hamburguesa doble",
					Price: 2000,
					Discount: 500
				},
				{
					Quantity: 1,
					Product: "Coca Cola",
					Price: 1500,
					Discount: 350
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, sync");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login Out");
				setStore({ token: null });
			},

			login: (Username, Password) => {
				const store = getStore();

				fetch(`${store.baseURL}/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						Usuario: Username,
						Password: Password
					})
				})
					.then(resp => {
						//console.log("respuesta", resp.json());
						return resp.json();
					})
					.then(data => {
						//setStore({ token: data.results || data.result });

						sessionStorage.setItem("token", data.access_token);
						setStore({ Usuario: Username });
						console.log(Username);
						window.location.reload();
					})

					.catch(err => {
						console.log("error", err);
					});
			},

			signUp: (Username, Email, Password) => {
				const store = getStore();

				fetch(`${store.baseURL}/user`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						Usuario: Username,
						Email: Email,
						Password: Password
					})
				})
					.then(resp => {
						//console.log("respuesta", resp.json());
						return resp.json();
					})
					.then(data => {
						//setStore({ token: data.results || data.result });

						setStore({ user: true });
					})

					.catch(err => {
						console.log("error", err);
					});
			},

			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};
				// fetching data from the backend
				fetch(`${process.env.BACKEND_URL}api/hello`, opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			getAllOrders: () => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre al get orders");
				fetch(`${store.baseURL}/manageorder`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log("respuesta", data);
						setStore({ orders: data });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			getOrderDetail: orderid => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre al get order details ", orderid);
				fetch(`${store.baseURL}/orderdetail/${orderid}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log("respuesta", data);
						setStore({ detailorders: data });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			changeOrderState: (orderid, newstate) => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre al change order state ");
				fetch(`${store.baseURL}/changeorderstate/${orderid}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					},
					body: JSON.stringify({ OrderID: orderid, State: newstate })
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log("respuesta", data);
						setStore({ detailorders: data });
					})

					.catch(err => {
						console.log("error", err);
					});
			}
		}
	};
};

export default getState;
