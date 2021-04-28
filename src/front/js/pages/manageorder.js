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
		actions.getOrderDetail(selection.OrderID);
		setDialog(true);
	};
	const handleHide = () => setDialog(false);

	const [selection, setSelection] = useState("");

	useEffect(() => {
		actions.getAllOrders();
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
		console.log("selection", selection);
	};

	const [NewState, setNewState] = useState(selection ? selection.State : "");
	const [dialogOrderState, setDialogOrderState] = useState(false);
	const handleShowOrderState = newstate => {
		actions.changeOrderState(selection.OrderID, newstate);
		setNewState(newstate);
		setDialogOrderState(true);
	};
	const handleHideOrderState = () => {
		setDialogOrderState(false);
		setDialog(false);
		actions.getAllOrders();
	};

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
				<DataTable value={store.detailorders ? store.detailorders.Products : ""}>
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
						<Button
							label="Preparar"
							className="p-button-info"
							onClick={() => {
								handleShowOrderState("En Preparacion");
							}}
						/>
						<Button label="Cancelar" className="p-button-danger" />
					</Container>
				) : (
					""
				)}
			</Dialog>
			<Dialog
				header="Cambio de estado de la orden"
				visible={dialogOrderState}
				style={{ width: "50vw" }}
				onHide={handleHideOrderState}>
				{selection ? (
					<div>
						<h1>Orden #{selection.OrderID}</h1>
						<h3>
							La orden cambi&oacute; de {selection.State} a {NewState}
						</h3>
					</div>
				) : (
					<h1>Debe seleccionar una orden</h1>
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
					<Column field="TotalQuantity" header="Cant de Productos" sortable />
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
