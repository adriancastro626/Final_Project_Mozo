import React, { useState, useEffect, useContext, useRef } from "react";
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
import { Container, Col, Image, FormGroup, Form, Dropdown } from "react-bootstrap";

import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import genericImage from "../../img/defaultFood.png";

export const ManageMenu = () => {
	// let { value } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [action, setAction] = useState(""); //USE STATE TO MANAGE THE CRUD ACTION
	const [response, setResponse] = useState(store.response);
	const [dialog, setDialog] = useState(false);
	const [dialogDelete, setDialogDelete] = useState(false);
	const handleShow = () => {
		setAction("Update");
		setDialog(true);
	};
	const handleHide = () => setDialog(false);

	const hideDeleteProductDialog = () => setDialogDelete(false);

	const [selection, setSelection] = useState("");

	useEffect(() => {
		actions.getAllProducts();
	}, []);

	const goBack = () => {
		history.goBack();
	};
	console.log("mi store", store);

	const onRowSelect = event => {
		setSelection(event.data);
		console.log("selection", selection);
		setCategory(selection.Category);
		setName(selection.Name);
		setDescription(selection.Description);
		setPrice(selection.Price);
		setImageURL(selection.ImageURL);
		setState(selection.Available == "Disponible" ? true : false);
	};

	const [name, setName] = useState(selection.Name);
	const [description, setDescription] = useState(selection.Description);
	const [price, setPrice] = useState(selection.Price);
	const onPriceChange = e => {
		setPrice(e.value);
	};
	const [imageurl, setImageURL] = useState(selection.ImageURL);
	const [category, setCategory] = useState(selection.Category);
	const onCategoryChange = e => {
		setCategory(e.value);
	};

	const [state, setState] = useState("");
	const onStateChange = () => {
		if (state) setState(false);
		else setState(true);
	};
	const toast = useRef(null);
	const saveProduct = () => {
		console.log("entre a save ", action);
		console.log("category ", category);
		console.log("name ", name);
		console.log("price ", price);
		console.log("description ", description);
		console.log("imageurl ", imageurl);
		console.log("state ", state);
		if (action == "Update") {
			actions.updateProduct(selection.ProductID, category, name, price, description, imageurl, state);
			setResponse(store.response);
			console.log(store.response, " response");
			if (store.response == "OK") {
				toast.current.show({
					severity: "success",
					summary: "Actualizacion Correcta",
					detail: "El producto ha sido modificado",
					life: 3000
				});
				handleHide();
			} else {
				toast.current.show({
					severity: "error",
					summary: "Actualizacion Incorrecta",
					detail: "El producto no pudo ser modificado. Verifique los datos.",
					life: 3000
				});
			}
		} else {
			actions.newProduct(category, name, price, description, imageurl, state);
		}
	};

	const productDialogFooter = (
		<React.Fragment>
			<Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={handleHide} />
			<Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
		</React.Fragment>
	);

	const editProduct = product => {
		setAction("Update");
		setSelection(product);
		console.log("selec", selection);
		setDialog(true);
	};

	const actionsButtons = rowData => {
		return (
			<React.Fragment>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded p-button-success p-mr-2"
					onClick={() => editProduct(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-rounded p-button-warning"
					onClick={() => confirmDeleteProduct(rowData)}
				/>
			</React.Fragment>
		);
	};

	const confirmDeleteProduct = product => {
		setDialogDelete(true);
	};

	const deleteProductDialogFooter = (
		<React.Fragment>
			<Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
			<Button
				label="S&iacute;"
				icon="pi pi-check"
				className="p-button-text"
				onClick={() => {
					deleteProduct();
				}}
			/>
		</React.Fragment>
	);

	const deleteProduct = () => {
		console.log("entre a delproduct");
		actions.deleteProduct(selection.ProductID);
		toast.current.show({
			severity: "success",
			summary: "Actualizacion Correcta",
			detail: "El producto ha sido modificado",
			life: 3000
		});
		hideDeleteProductDialog();
		actions.getAllProducts();
	};

	return (
		<Container>
			<Toast ref={toast} />
			<br />
			<Dialog
				visible={dialog}
				style={{ width: "450px" }}
				header="Detalle del Producto"
				modal
				className="p-fluid"
				footer={productDialogFooter}
				onHide={handleHide}>
				<Col xs={6} md={4}>
					<Image
						src={`${selection.ImageURL}`}
						onError={e => (e.target.src = `${genericImage}`)}
						alt=""
						className="product-image"
						roundedCircle
					/>
				</Col>
				<div className="p-field">
					<label htmlFor="name">Nombre</label>
					<InputText
						id="name"
						defaultValue={selection.Name}
						onChange={event => setName(event.target.value)}
						required
						autoFocus
					/>
				</div>
				<div className="p-field">
					<label htmlFor="description">Descripci&oacute;n</label>
					<InputTextarea
						id="description"
						defaultValue={selection.Description}
						onChange={e => setDescription(e.target.value ? e.target.value : e.target.defaultValue)}
						rows={3}
						cols={20}
					/>
				</div>

				<div className="p-field">
					<label className="p-mb-3">Categor&iacute;a</label>
					<div className="p-formgrid p-grid">
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categorytodas"
								name="category"
								value="Todas"
								onChange={onCategoryChange}
								checked={category === "Todas"}
							/>
							<label htmlFor="categorytodas">Todas</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categorydesayuno"
								name="category"
								value="Desayuno"
								onChange={onCategoryChange}
								checked={category === "Desayuno"}
							/>
							<label htmlFor="categorydesayuno">Desayuno</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categoryalmuerzo"
								name="category"
								value="Almuerzo"
								onChange={onCategoryChange}
								checked={category === "Almuerzo"}
							/>
							<label htmlFor="categoryalmuerzo">Almuerzo</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categoryotros"
								name="category"
								value="Otros"
								onChange={onCategoryChange}
								checked={category === "Otros"}
							/>
							<label htmlFor="categoryotros">Otros</label>
						</div>
					</div>
				</div>
				<div className="p-formgrid p-grid">
					<div className="p-field p-col">
						<label htmlFor="price">Precio</label>
						<InputNumber
							id="price"
							value={selection.Price}
							onChange={onPriceChange}
							mode="currency"
							currency="CRC"
							locale="es-CR"
							required
						/>
					</div>
				</div>
				<div className="p-field">
					<label htmlFor="imageurl">URL de imagen</label>
					<InputText
						id="imageurl"
						defaultValue={selection.ImageURL}
						onChange={e => setImageURL(e.target.value ? e.target.value : e.target.defaultValue)}
					/>
				</div>
				<div className="p-field">
					<br />
					<Checkbox inputId="cb1" onChange={onStateChange} checked={state} />
					<label htmlFor="cb1" className="p-checkbox-label">
						{state ? "Disponible" : "No Disponible"}
					</label>
				</div>
			</Dialog>
			<Dialog
				visible={dialogDelete}
				style={{ width: "450px" }}
				header="Confirmar"
				modal
				footer={deleteProductDialogFooter}
				onHide={hideDeleteProductDialog}>
				<div className="confirmation-content">
					<i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
					<span>
						&nbsp;Desea eliminar el producto: <b>{selection.Name}</b>?
					</span>
				</div>
			</Dialog>
			<Container className="border rounded">
				<Row>
					<Col className="text-center">
						<h1>PRODUCTOS</h1>
					</Col>
					<br />
				</Row>
			</Container>
			<Container>
				<DataTable value={store.products} selectionMode="single" dataKey="id" onRowSelect={onRowSelect}>
					<Column
						headerStyle={{ width: "8em", textAlign: "center" }}
						bodyStyle={{ textAlign: "center", overflow: "visible" }}
						header="Acciones"
						body={actionsButtons}
					/>
					<Column field="ProductID" header="# Producto" sortable />
					<Column field="Name" header="Nombre" sortable />
					<Column field="Available" header="Estado" sortable />
				</DataTable>
			</Container>
			<br />
			<Link to="/">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
