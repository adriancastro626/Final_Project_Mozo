const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			baseURL: "https://3001-plum-wombat-xh4fhyx8.ws-us03.gitpod.io/api",
			orders: [
				// {
				// 	OrderID: 101,
				// 	Quantity: 5,
				// 	State: "En Preparacion",
				// 	Notes: "Sin lechuga"
				// }
			],
			detailorders: [
				{
					OrderID: 101,
					Products: [
						{
							Quantity: 2,
							Product: "Hamburguesa clasica"
						},
						{
							Quantity: 1,
							Product: "Taco"
						}
					]
				},
				{
					OrderID: 103,
					Products: [
						{
							Quantity: 2,
							Product: "Hamburguesa doble"
						},
						{
							Quantity: 1,
							Product: "Coca Cola"
						}
					]
				}
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

			login: async (username, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				};
				try {
					const resp = await fetch("https://3001-plum-wombat-xh4fhyx8.ws-us03.gitpod.io/api/token", opts);
					if (resp.status !== 200) {
						alert("Hay un error");
						return false;
					}

					const data = await resp.json();
					console.log("This come from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.error("There has been an error login in");
				}
			},

			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};
				// fetching data from the backend
				fetch("https://3001-turquoise-crocodile-vp9cmk5h.ws-us03.gitpod.io/api/hello", opts)
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
			}
		}
	};
};

export default getState;
