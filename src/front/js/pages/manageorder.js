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
import { Container, Col, Image } from "react-bootstrap";

export const ManageOrder = () => {
	// let { value } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [orders, setOrders] = useState([]);

	const [dialog, setDialog] = useState(false);
	const handleShow = () => {
		setDialog(true);
	};
	const handleHide = () => setDialog(false);

	const [selection, setSelection] = useState("");
	const [selectiondetail, setSelectionDetail] = useState("");

	useEffect(() => {
		actions.getAllOrders();
		console.log("entre a orders");
	}, []);

	const goBack = () => {
		history.goBack();
	};
	console.log("mi store", store);

	const ViewDataColumn = () => {
		return <Button type="button" icon="pi pi-search" className="p-button-secondary" onClick={handleShow} />;
	};

	const onRowSelect = event => {
		setSelection(event.data);
		const selectedorderdetail = store.detailorders.find(element => element.OrderID == selection.OrderID);
		setSelectionDetail(selectedorderdetail);
		console.log("selectiondetail", selectedorderdetail);
		console.log("selection", selection);
	};

	console.log("orders", store.orders);

	return (
		<Container>
			<br />
			<Dialog header="Detalle de la Orden" visible={dialog} style={{ width: "50vw" }} onHide={handleHide}>
				{selection ? (
					<div>
						<h1>Orden #{selection.OrderID}</h1>
						{selection.State == "En Preparacion" ? (
							<Badge value={selection.State} severity="info" />
						) : selection.State == "Completada" ? (
							<Badge value={selection.State} />
						) : selection.State == "Cancelada" ? (
							<Badge value={selection.State} severity="danger" />
						) : selection.State == "Esperando recolecta" ? (
							<Badge value={selection.State} severity="success" />
						) : selection.State == "Nueva" ? (
							<Badge value={selection.State} severity="warning" />
						) : (
							""
						)}
					</div>
				) : (
					<h1>Debe seleccionar una orden</h1>
				)}
				<br />
				<DataTable value={selectiondetail ? selectiondetail.Products : ""}>
					<Column field="Quantity" header="Cant de Productos" />
					<Column field="Product" header="Producto" />
				</DataTable>
				<br />
				<h3>Notas de la orden</h3>
				<InputTextarea rows={5} cols={120} value={selection.Notes} disabled />
				{selection.State == "En Preparacion" ? (
					<Container className="d-flex justify-content-between w-100">
						<Button label="Lista" className="p-button-primary" />
						<Button label="Cancelar" className="p-button-danger" />
					</Container>
				) : selection.State == "Esperando recolecta" ? (
					<Button label="Recolectado" className="p-button-success" />
				) : selection.State == "Nueva" ? (
					<Container className="d-flex justify-content-between w-100">
						<Button label="Preparar" className="p-button-info" />
						<Button label="Cancelar" className="p-button-danger" />
					</Container>
				) : (
					""
				)}
			</Dialog>
			<Container className="border rounded">
				<Row>
					<Col className="text-center">
						<h1>&Oacute;RDENES</h1>
					</Col>
					<br />
				</Row>
			</Container>
			<Container className="card">
				<DataTable value={store.orders} selectionMode="single" dataKey="id" onRowSelect={onRowSelect}>
					<Column
						header="Ver"
						body={ViewDataColumn}
						headerStyle={{ width: "8em", textAlign: "center" }}
						bodyStyle={{ textAlign: "center", overflow: "visible" }}
					/>
					<Column field="OrderID" header="# Orden" sortable />
					<Column field="Quantity" header="Cant de Productos" sortable />
					<Column field="State" header="Estado" sortable />
				</DataTable>
			</Container>
			<br />
			<Link to="/">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
