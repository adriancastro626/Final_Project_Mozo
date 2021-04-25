import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import { InputTextarea } from "primereact/inputtextarea";

import { element } from "prop-types";
import { Container, Col, Image, FormGroup, Form, Table } from "react-bootstrap";

export const Cart = () => {
	const history = useHistory();
	const goBack = () => {
		history.goBack();
	};
	const { store, actions } = useContext(Context);
	console.log("mistore", store);

	const totProducts = () => {
		let total = 0;
		store.cart.map(element => (total += element.Quantity));

		return total;
	};

	const formatCurrency = value => {
		return value.toLocaleString("es-CR", { style: "currency", minimumFractionDigits: 2, currency: "CRC" });
	};

	const totPrices = () => {
		let total = 0;
		store.cart.map(element => (total += element.Price));

		return total;
	};

	const totDiscount = () => {
		let total = 0;
		store.cart.map(element => (total += element.Discount));

		return total;
	};

	const totTax = () => {
		let total = 0;
		total = (13 / 100) * (totPrices() - totDiscount());

		return total;
	};

	const totSubTotal = () => {
		let total = 0;
		total = totPrices() - totDiscount();

		return total;
	};

	const totTotal = () => {
		let total = 0;
		total = totTax() + totPrices();
		total = total - totDiscount();
		return total;
	};

	let footerGroup = (
		<ColumnGroup>
			<Row>
				<Column footer="Total:" colSpan={2} footerStyle={{ textAlign: "right" }} />
				<Column footer={formatCurrency(totPrices())} />
			</Row>
			<Row>
				<Column footer="Descuento:" colSpan={2} footerStyle={{ textAlign: "right" }} />
				<Column footer={formatCurrency(totDiscount())} />
			</Row>
			<Row>
				<Column footer="SubTotal:" colSpan={2} footerStyle={{ textAlign: "right" }} />
				<Column footer={formatCurrency(totSubTotal())} />
			</Row>
			<Row>
				<Column footer="I.V.A (13%):" colSpan={2} footerStyle={{ textAlign: "right" }} />
				<Column footer={formatCurrency(totTax())} />
			</Row>
			<Row>
				<Column footer="Total a pagar:" colSpan={2} footerStyle={{ textAlign: "right" }} />
				<Column footer={formatCurrency(totTotal())} />
			</Row>
		</ColumnGroup>
	);

	const [dialog, setDialog] = useState(false);
	const handleShow = () => {
		setDialog(true);
	};
	const handleHide = () => {
		setDialog(false);
		history.push("/");
	};

	return (
		<Container className="border border-danger rounded">
			<Table>
				<tr>
					<td>
						<h1>Mi pedido</h1>
					</td>
					<td>
						<h1 className="text-right">({totProducts()} productos)</h1>
					</td>
				</tr>
			</Table>
			<Row>
				<Col>
					<DataTable value={store.cart ? store.cart : ""} footerColumnGroup={footerGroup}>
						<Column field="Product" header="Producto" />
						<Column field="Quantity" header="Cant de Productos" />
						<Column field="Price" header="Precio" />
					</DataTable>
				</Col>
			</Row>
			<Row>
				<Col>
					<hr />
				</Col>
			</Row>
			<Row>
				<h5>Requerimientos especiales</h5>
				<textarea className="form-control" rows="3" />
			</Row>
			<br />
			<Container className="d-flex align-items-center flex-column">
				<Row className="p-2">
					<Link to={`/payment`}>
						<Button className="primary">Ordenar y Pagar Ahora</Button>
					</Link>
				</Row>
				<br />
				<Row className="p-2">
					<Button className="p-button-success pull-right" onClick={handleShow}>
						Ordenar Ahora
					</Button>
				</Row>
			</Container>
			<br />
			<Dialog header="Orden" visible={dialog} style={{ width: "50vw" }} onHide={handleHide}>
				<h1>Su orden es la #0000</h1>
				<br />
				<h6>Tiempo estimado de preparaci&oacute;n: 20 minutos</h6>
			</Dialog>
		</Container>
	);
};
