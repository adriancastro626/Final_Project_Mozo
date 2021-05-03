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
import { Toolbar } from "primereact/toolbar";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import genericImage from "../../img/defaultFood.png";
import "../../styles/manageuser.scss";

export const ManageUser = () => {
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

	const hideDeleteUserDialog = () => setDialogDelete(false);

	const [selection, setSelection] = useState("");

	useEffect(() => {
		actions.getAllUsers();
		actions.getToken();
		if (!store.login) {
			history.push("/");
		}
	}, []);

	const goBack = () => {
		history.goBack();
	};
	console.log("mi store", store);

	const onRowSelect = event => {
		setSelection(event.data);
		console.log("selection", selection);
		setName(selection.UserName);
		setEmail(selection.Email);
		setType(selection.Type);
	};

	const [userid, setUserID] = useState(selection.UserID);
	const [name, setName] = useState(selection.UserName);
	const [email, setEmail] = useState(selection.Email);
	const [type, setType] = useState(selection.Type);
	const onTypeChange = e => {
		setType(e.value);
	};
	const toast = useRef(null);
	const saveUser = () => {
		console.log("entre a save ", action);
		if (action == "Update") {
			actions.updateUser(selection.UserID, name, email, type);
			setResponse(store.response);
			console.log(store.response, " response");
			if (store.response == "OK") {
				toast.current.show({
					severity: "success",
					summary: "Actualizacion Correcta",
					detail: "El usuario ha sido modificado",
					life: 3000
				});
				handleHide();
				actions.getAllUsers();
			} else {
				toast.current.show({
					severity: "error",
					summary: "Actualizacion Incorrecta",
					detail: "El usuario no pudo ser modificado. Verifique los datos.",
					life: 3000
				});
			}
		}
	};

	const userDialogFooter = (
		<React.Fragment>
			<Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={handleHide} />
			<Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
		</React.Fragment>
	);

	const editUser = user => {
		console.log("user selec", user);
		setAction("Update");
		setSelection(user);
		setDialog(true);
	};

	const actionsButtons = rowData => {
		return (
			<React.Fragment>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded p-button-success p-mr-2"
					onClick={() => editUser(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-rounded p-button-warning"
					onClick={() => confirmDeleteUser(rowData)}
				/>
			</React.Fragment>
		);
	};

	const confirmDeleteUser = user => {
		setDialogDelete(true);
	};

	const deleteUserDialogFooter = (
		<React.Fragment>
			<Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
			<Button
				label="S&iacute;"
				icon="pi pi-check"
				className="p-button-text"
				onClick={() => {
					deleteUser();
				}}
			/>
		</React.Fragment>
	);

	const deleteUser = () => {
		console.log("entre a deluser");
		actions.deleteUser(selection.UserID);
		actions.getAllUsers();
		toast.current.show({
			severity: "success",
			summary: "Eliminación Correcta",
			detail: "El usuario ha sido eliminado",
			life: 3000
		});
		hideDeleteUserDialog();
	};

	const leftToolbarButton = () => {
		return (
			<React.Fragment>
				<Button
					label="Nuevo"
					icon="pi pi-plus"
					className="p-button-success p-mr-2"
					onClick={() => history.push("/register")}
				/>
			</React.Fragment>
		);
	};
	return (
		<Container>
			<Toast ref={toast} />
			<br />
			<Dialog
				visible={dialog}
				style={{ width: "450px" }}
				header="Detalle del Usuario"
				modal
				className="p-fluid"
				footer={userDialogFooter}
				onHide={handleHide}>
				<div className="p-field">
					<label htmlFor="name">Nombre</label>
					<InputText
						id="name"
						defaultValue={selection.UserName}
						onChange={event => setName(event.target.value)}
						required
						autoFocus
					/>
				</div>
				<div className="p-field">
					<label htmlFor="email">Email</label>
					<InputText
						id="email"
						defaultValue={selection.Email}
						onChange={e => setEmail(e.target.value ? e.target.value : e.target.defaultValue)}
						required
					/>
				</div>

				<div className="p-field">
					<div className="p-formgrid p-grid">
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="typeadmin"
								name="type"
								value="Administrador"
								onChange={onTypeChange}
								checked={type === "Administrador" ? true : false}
							/>
							<label htmlFor="typeadmin">Administrador</label>
						</div>
						<div className="p-field-radiobutton p-col-6">
							<RadioButton
								inputId="typehelp"
								name="type"
								value="Colaborador"
								onChange={onTypeChange}
								checked={type === "Colaborador" ? true : false}
							/>
							<label htmlFor="typehelp">Colaborador</label>
						</div>
					</div>
				</div>
			</Dialog>
			<Dialog
				visible={dialogDelete}
				style={{ width: "450px" }}
				header="Confirmar"
				modal
				footer={deleteUserDialogFooter}
				onHide={hideDeleteUserDialog}>
				<div className="confirmation-content">
					<i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
					<span>
						&nbsp;Desea eliminar el usuario: <b>{selection.UserName}</b>?
					</span>
				</div>
			</Dialog>
			<Container>
				<Row>
					<Col className="text-center">
						<h1>USUARIOS</h1>
					</Col>
					<br />
				</Row>
				<Toolbar className="p-mb-4" left={leftToolbarButton} />

				<DataTable
					className="datatable-scroll"
					scrollable
					scrollHeight="400px"
					value={store.users}
					selectionMode="single"
					dataKey="id"
					onRowSelect={onRowSelect}>
					<Column
						headerStyle={{ width: "8em", textAlign: "center" }}
						bodyStyle={{ textAlign: "center", overflow: "visible" }}
						header="Acciones"
						body={actionsButtons}
					/>
					<Column field="UserName" header="Nombre" sortable />
					<Column field="Type" header="Tipo" sortable />
				</DataTable>
			</Container>
			<br />
			<Link to="/home">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
