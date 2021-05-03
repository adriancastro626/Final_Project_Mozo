import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login.js";
import { Retrive1 } from "./pages/retrive1.js";
import { Retrive } from "./pages/retrive2.js";
import { Register } from "./pages/register.js";
import { Register1 } from "./pages/register1.js";
import { ManageOrder } from "./pages/manageorder.js";
import { ManageMenu } from "./pages/managemenu.js";
import { ManageUser } from "./pages/manageuser.js";
import { Frontmenu } from "./pages/frontmenu.js";
import { Payment } from "./pages/payment";
import { PayPalCapture } from "./pages/paypalcapture";
import { Cart } from "./pages/cart";
import injectContext, { Context } from "./store/appContext";

import { NavbarMenu } from "./component/navbar";
import { NavbarLogin } from "./component/navbar2";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<NavbarLogin />
							<Login />
						</Route>
						<Route exact path="/frontmenu">
							<NavbarLogin />
							<Frontmenu />
						</Route>
						<Route exact path="/register">
							{store.login ? <NavbarMenu /> : <NavbarLogin />}
							<Register />
						</Route>
						<Route exact path="/register1">
							<Register1 />
						</Route>
						<Route exact path="/retrive1">
							<Retrive1 />
						</Route>
						<Route exact path="/retrive/:token">
							<Retrive />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
						<Route exact path="/manageorder">
							{store.login ? <NavbarMenu /> : <NavbarLogin />}
							<ManageOrder />
						</Route>
						<Route exact path="/manageuser">
							{store.login ? <NavbarMenu /> : <NavbarLogin />}
							<ManageUser />
						</Route>
						<Route exact path="/managemenu">
							{store.login ? <NavbarMenu /> : <NavbarLogin />}
							<ManageMenu />
						</Route>
						<Route exact path="/payment">
							<Payment />
						</Route>
						<Route exact path="/paypalcapture">
							<PayPalCapture />
						</Route>
						<Route exact path="/cart">
							{store.login ? <NavbarMenu /> : <NavbarLogin />}
							<Cart />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
