const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			baseURL: `${process.env.BACKEND_URL}/api`,
			response: null,
			products: [],
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
					ProductID: 1,
					Product: "Hamburguesa doble",
					Price: 2000,
					Discount: 500,
					SubTotal: 1500,
					Tax: 130,
					Total: 1630
				},
				{
					Quantity: 1,
					ProductID: 6,
					Product: "Coca Cola",
					Price: 1500,
					Discount: 350,
					SubTotal: 1000,
					Tax: 0,
					Total: 1330
				}
			],
			NewOrderID: 0
		},
		actions: {
			// Use getActions to call a function within a fuction

			syncTokenFromSessionStore: () => {
				const token = localStorage.getItem("token");
				console.log("Application just loaded, sync");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			login: async (Username, Password) => {
				const store = getStore();

				await fetch(`${store.baseURL}/login`, {
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
						if (resp.status !== 200) {
							alert("There was an error!!");
							return false;
						}
						return resp.json();
					})
					.then(data => {
						console.log("This came from the backend ", data);
						localStorage.setItem("token", data.access_token);
						setStore({ access_token: data.access_token });
						window.location.reload();
					})
					.catch(error => console.error("There has been an error login in!!", error));
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log("Login Out");
				setStore({ token: null });
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
						setStore({ detailorders: data });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			changeOrderState: (orderid, newstate) => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre al change order state ", newstate);
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
						setStore({ detailorders: data });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			newOrder: (
				state,
				notes,
				orderdate,
				utotProducts,
				utotPrices,
				utotDiscount,
				utotTax,
				utotSubTotal,
				utottotTotal
			) => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre a newOrder ", orderdate);
				fetch(`${store.baseURL}/neworder`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					},
					body: JSON.stringify({
						OrderTypeID: 1,
						OrderDate: orderdate,
						State: state,
						TotalQuantity: utotProducts,
						EstimatedTime: 20,
						Notes: notes,
						SubTotal: utotPrices,
						Discount: utotDiscount,
						Tax: utotTax,
						Total: utottotTotal,
						ClientName: "ClientName",
						Cart: store.cart
					})
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						setStore({ NewOrderID: data.NewOrderID });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			getAllProducts: () => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre al get products");
				fetch(`${store.baseURL}/managemenu`, {
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
						//LOOP THE ARRAY TO CHANGE ALL THE PRODUCTS STATES JUST FOR THE DATATABLE READING
						for (var i = 0; i < data.length; i++) {
							if (data[i].Available == true) {
								data[i].Available = "Disponible";
							} else {
								data[i].Available = "No Disponible";
							}
						}
						setStore({ products: data });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			updateProduct: (productid, category, name, price, description, imageurl, available) => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre a updateproduct ");
				let state = null;
				if (available == "Disponible") state = true;
				else state = false;

				fetch(`${store.baseURL}/updateproduct`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					},
					body: JSON.stringify({
						ProductID: productid,
						Category: category,
						Name: name,
						Price: price,
						Description: description,
						ImageURL: imageurl,
						Available: state
					})
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						setStore({ response: data.status });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			newProduct: (category, name, price, description, imageurl, available) => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre a newproduct ");
				let state = null;
				if (available == "Disponible") state = true;
				else state = false;

				fetch(`${store.baseURL}/newproduct`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					},
					body: JSON.stringify({
						Category: category,
						Name: name,
						Price: price,
						Description: description,
						ImageURL: imageurl,
						Available: state
					})
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						setStore({ response: data.status });
					})

					.catch(err => {
						console.log("error", err);
					});
			},
			deleteProduct: productid => {
				const store = getStore();
				let token = store.token; //localStorage.getItem("token");
				console.log("entre a deleteproduct ");

				fetch(`${store.baseURL}/deleteproduct/${productid}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						//Authorization: `Bearer	${token}`
					}
				})
					.then(resp => {
						return resp.json();
					})
					.catch(err => {
						console.log("error", err);
					});
			}
		}
	};
};

export default getState;
