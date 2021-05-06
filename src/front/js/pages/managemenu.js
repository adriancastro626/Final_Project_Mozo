import React, { useState, useEffect, useContext, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Container, Col, Image } from "react-bootstrap";
import { RadioButton } from "primereact/radiobutton";
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import genericImage from "../../img/defaultFood.png";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles/managemenu.scss";

export const ManageMenu = () => {
	const history = useHistory();
	const toast = useRef(null);
	const { store, actions } = useContext(Context);
	const [action, setAction] = useState(""); //USE STATE TO MANAGE THE CRUD ACTION
	const [response, setResponse] = useState(store.response);
	const [dialog, setDialog] = useState(false);
	const [dialogDelete, setDialogDelete] = useState(false);

	const handleShow = async () => {
		await setAction("Update");
		await setDialog(true);
	};
	const handleHide = () => setDialog(false);

	const hideDeleteProductDialog = () => setDialogDelete(false);

	const [selection, setSelection] = useState("");

	useEffect(() => {
		actions.getAllProducts();
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
		await setCategory(selection.Category);
		await setName(selection.Name);
		await setDescription(selection.Description);
		await setPrice(selection.Price);
		await setImageURL(selection.ImageURL);
		await setAvailable(selection.Available);
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

	const [available, setAvailable] = useState("");
	const onAvailableChange = e => {
		selection.Available = e.value;
		setAvailable(e.value);
	};

	const saveProduct = async () => {
		if (action == "Update") {
			await actions.updateProduct(selection.ProductID, category, name, price, description, imageurl, available);
			await setResponse(store.response);
			if (store.response == "OK") {
				toast.current.show({
					severity: "success",
					summary: "Actualizacion Correcta",
					detail: "El producto ha sido modificado",
					life: 3000
				});
				await handleHide();
			} else {
				toast.current.show({
					severity: "error",
					summary: "Actualizacion Incorrecta",
					detail: "El producto no pudo ser modificado. Verifique los datos.",
					life: 3000
				});
			}
		} else {
			await actions.newProduct(category, name, price, description, imageurl, available);
			await setResponse(store.response);
			if (store.response == "OK") {
				toast.current.show({
					severity: "success",
					summary: "Registro Correcto",
					detail: "El producto ha sido agregado",
					life: 3000
				});
				await handleHide();
			} else {
				toast.current.show({
					severity: "error",
					summary: "Registro Incorrecto",
					detail: "El producto no pudo ser agregado. Verifique los datos.",
					life: 3000
				});
			}
		}
	};

	const productDialogFooter = (
		<React.Fragment>
			<Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={handleHide} />
			<Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
		</React.Fragment>
	);

	const editProduct = async product => {
		await setAction("Update");
		await setSelection(product);
		await setAvailable(product.Available);
		await setCategory(product.Category);
		await setName(product.Name);
		await setDescription(product.Description);
		await setPrice(product.Price);
		await setImageURL(product.ImageURL);
		await setDialog(true);
	};

	const newProduct = async () => {
		await setAction("New");
		await setSelection("");
		await setCategory("");
		await setName("");
		await setDescription("");
		await setPrice("");
		await setImageURL("");
		await setAvailable("");
		await setDialog(true);
	};

	const actionsButtons = rowData => {
		return (
			<React.Fragment>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded p-button-success p-mr-2"
					onClick={async () => await editProduct(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-rounded p-button-warning"
					onClick={async () => await confirmDeleteProduct(rowData)}
				/>
			</React.Fragment>
		);
	};

	const confirmDeleteProduct = async product => {
		await setSelection(product);
		await setDialogDelete(true);
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

	const deleteProduct = async () => {
		await actions.deleteProduct(selection.ProductID);
		await setResponse(store.response);
		if (store.response == "OK") {
			toast.current.show({
				severity: "success",
				summary: "Actualizacion Correcta",
				detail: "El producto ha sido modificado",
				life: 3000
			});
			await hideDeleteProductDialog();
		} else {
			toast.current.show({
				severity: "error",
				summary: "Registro Incorrecto",
				detail: "El producto no pudo ser agregado. Verifique los datos.",
				life: 3000
			});
		}
	};

	const leftToolbarButton = () => {
		return (
			<React.Fragment>
				<Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={newProduct} />
			</React.Fragment>
		);
	};

	const imageBody = rowData => {
		return (
			<img
				src={`${rowData.ImageURL}`}
				onError={e => (e.target.src = `${genericImage}`)}
				className="product-image"
			/>
		);
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
								checked={category === "Todas" ? true : false}
							/>
							<label htmlFor="categorytodas">Todas</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categorydesayuno"
								name="category"
								value="Desayuno"
								onChange={onCategoryChange}
								checked={category === "Desayuno" ? true : false}
							/>
							<label htmlFor="categorydesayuno">Desayuno</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categoryalmuerzo"
								name="category"
								value="Almuerzo"
								onChange={onCategoryChange}
								checked={category === "Almuerzo" ? true : false}
							/>
							<label htmlFor="categoryalmuerzo">Almuerzo</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="categoryotros"
								name="category"
								value="Otros"
								onChange={onCategoryChange}
								checked={category === "Otros" ? true : false}
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
					<div className="p-formgrid p-grid">
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="availabletrue"
								name="available"
								value="Disponible"
								onChange={e => setAvailable(e.value)}
								checked={available === "Disponible"}
							/>
							<label htmlFor="availabletrue">Disponible</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="availablefalse"
								name="available"
								value="No Disponible"
								onChange={e => setAvailable(e.value)}
								checked={available === "No Disponible"}
							/>
							<label htmlFor="availablefalse">No Disponible</label>
						</div>
					</div>
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
			<Container>
				<Row>
					<Col className="text-center">
						<h1>PRODUCTOS</h1>
					</Col>
					<br />
				</Row>
				<Toolbar className="p-mb-4" left={leftToolbarButton} />

				<DataTable
					className="datatable-scroll"
					scrollable
					scrollHeight="400px"
					value={store.products}
					selectionMode="single"
					dataKey="id"
					onRowSelect={onRowSelect}>
					<Column
						headerStyle={{ width: "8em", textAlign: "center" }}
						bodyStyle={{ textAlign: "center", overflow: "visible" }}
						header="Acciones"
						body={actionsButtons}
					/>
					<Column field="ProductID" header="# Producto" sortable />
					<Column header="Imagen" body={imageBody} />
					<Column field="Name" header="Nombre" sortable />
					<Column field="Available" header="Estado" sortable />
				</DataTable>
			</Container>
			<br />
			<Link to="/home">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
