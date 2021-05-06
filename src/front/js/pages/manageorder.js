import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Container, Col } from "react-bootstrap";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const ManageOrder = () => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [orders, setOrders] = useState([]);
	const [globalFilter, setGlobalFilter] = useState(null);

	const [dialog, setDialog] = useState(false);
	const handleHide = () => setDialog(false);

	const [selection, setSelection] = useState("");

	useEffect(() => {
		actions.getAllOrders();
		actions.getToken();
		if (!store.login) {
			history.push("/");
		}
	}, []);

	const goBack = () => {
		history.goBack();
	};

	const onRowSelect = async event => {
		await setSelection(event.data);
	};

	const viewOrder = async order => {
		await setSelection(order);
		await actions.getOrderDetail(order.OrderID);
		await setDialog(true);
	};

	const [NewState, setNewState] = useState(selection ? selection.State : "");
	const [dialogOrderState, setDialogOrderState] = useState(false);
	const handleShowOrderState = async newstate => {
		await actions.changeOrderState(selection.OrderID, newstate);
		await setNewState(newstate);
		await setDialogOrderState(true);
	};
	const handleHideOrderState = async () => {
		await setDialogOrderState(false);
		await setDialog(false);
		await actions.getAllOrders();
	};

	const header = (
		<div className="table-header">
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="Buscar" />
			</span>
		</div>
	);

	const actionsButtons = rowData => {
		return (
			<React.Fragment>
				<Button
					icon="pi pi-search"
					className="p-button-rounded p-button-success p-mr-2"
					onClick={async () => await viewOrder(rowData)}
				/>
			</React.Fragment>
		);
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
						<Button
							label="Lista"
							className="p-button-primary"
							onClick={() => {
								handleShowOrderState("Esperando recolecta");
							}}
						/>
						<Button
							label="Cancelar"
							className="p-button-danger"
							onClick={() => {
								handleShowOrderState("Cancelada");
							}}
						/>
					</Container>
				) : selection.State == "Esperando recolecta" ? (
					<Button
						label="Recolectado"
						className="p-button-success"
						onClick={() => {
							handleShowOrderState("Completada");
						}}
					/>
				) : selection.State == "Nueva" ? (
					<Container className="d-flex justify-content-between w-100">
						<Button
							label="Preparar"
							className="p-button-info"
							onClick={() => {
								handleShowOrderState("En Preparacion");
							}}
						/>
						<Button
							label="Cancelar"
							className="p-button-danger"
							onClick={() => {
								handleShowOrderState("Cancelada");
							}}
						/>
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
							La orden cambi&oacute; de <strong>{selection.State}</strong> a&nbsp;
							{NewState == "En Preparacion" ? (
								<Badge value={NewState} severity="info" size="large" />
							) : NewState == "Completada" ? (
								<Badge value={NewState} size="large" />
							) : NewState == "Cancelada" ? (
								<Badge value={NewState} severity="danger" size="large" />
							) : NewState == "Esperando recolecta" ? (
								<Badge value={NewState} severity="success" size="large" />
							) : NewState == "Nueva" ? (
								<Badge value={NewState} severity="warning" size="large" />
							) : (
								""
							)}
						</h3>
					</div>
				) : (
					<h1>Debe seleccionar una orden</h1>
				)}
			</Dialog>
			<Container>
				<Row>
					<Col className="text-center">
						<h1>&Oacute;RDENES</h1>
					</Col>
					<br />
				</Row>
				<DataTable
					className="datatable-scroll"
					scrollable
					scrollHeight="400px"
					value={store.orders}
					selectionMode="single"
					dataKey="id"
					onRowSelect={onRowSelect}
					header={header}
					globalFilter={globalFilter}
					emptyMessage="No se encontraron datos">
					<Column
						headerStyle={{ width: "8em", textAlign: "center" }}
						bodyStyle={{ textAlign: "center", overflow: "visible" }}
						header="Acciones"
						body={actionsButtons}
					/>
					<Column field="OrderID" header="# Orden" sortable />
					<Column field="TotalQuantity" header="Cant de Productos" sortable />
					<Column field="State" header="Estado" sortable />
				</DataTable>
			</Container>
			<br />
			<Link to="/home">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
