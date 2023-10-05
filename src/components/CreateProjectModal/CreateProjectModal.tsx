import "./CreateProjectModal.style.css";
import { useState } from "react";
import Button from "../Button/Button";
import { ProjectFormModel } from "../../interfaces/ProjectFormModel";
import { TextField, Typography } from "@mui/material";

interface ExtendedProps {
	visible: boolean;
	onCancel: () => void;
	onFinish: () => void;
}

export default function CreateProjectModal(props: ExtendedProps) {
	const [form, setForm] = useState<ProjectFormModel>({} as ProjectFormModel);

	return (
		<div
			className="create-modal-background"
			style={{ visibility: props.visible ? "visible" : "hidden" }}
			onClick={(e) => {
				props.onCancel();
			}}
		>
			<div
				className="create-modal-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="button-container">
					<Typography variant="h5">Create</Typography>
				</div>
				<div className="create-input-container">
					<TextField
						placeholder="Title"
						onChange={(e) => {
							setForm((old_form) => {
								old_form.title = e.target.value;
								return old_form;
							});
						}}
					/>
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
