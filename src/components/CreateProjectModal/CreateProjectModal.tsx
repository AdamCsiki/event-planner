import "./CreateProjectModal.style.css";
import { useState, useContext } from "react";
import Button from "../Button/Button";
import { ProjectFormModel } from "../../interfaces/ProjectFormModel";
import { Typography } from "@mui/material";
import TextField from "../TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { FetchContext } from "../../context/FetchContext";
import { basePath } from "../../api/api";

interface ExtendedProps {
	visible: boolean;
	onCancel: () => void;
	onFinish: () => void;
}

export default function CreateProjectModal(props: ExtendedProps) {
	const [form, setForm] = useState<ProjectFormModel>({} as ProjectFormModel);

	const fetchPlus = useContext(FetchContext).fetchPlus;

	const putProject = () => {
		const url = basePath + "/users/user/project";

		return fetchPlus(url, {})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("FetchPlus failed.");
			})
			.then((data) => {
				console.log(data);
				return data;
			})
			.catch((err) => {
				console.error(err);
			})
			.then((res) => {
				return res;
			});
	};

	return (
		<div
			className="modal-background"
			style={{ visibility: props.visible ? "visible" : "hidden" }}
			onClick={(e) => {
				props.onCancel();
			}}
		>
			<div
				className="modal-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<Typography variant="h5">Create</Typography>
				<div className="create-input-container">
					<TextField
						label={"Title"}
						onChange={(e) => {
							setForm((old_form) => {
								old_form.name = e.target.value;
								return old_form;
							});
						}}
					/>
					<DatePicker label={"Deadline"} />
				</div>
				<div className="button-container">
					<Button
						onClick={(e) => {
							props.onCancel();
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={(e) => {
							props.onFinish();
						}}
					>
						Finish
					</Button>
				</div>
			</div>
		</div>
	);
}
