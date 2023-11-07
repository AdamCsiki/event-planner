import "./CreateProjectModal.style.css";
import { useState, useContext, useEffect } from "react";
import Button from "../../components/Button/Button";
import { ProjectFormModel } from "../../interfaces/ProjectFormModel";
import { Box, Modal, Typography } from "@mui/material";
import TextField from "../../components/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { basePath } from "../../api/api";
import { fetchPlus } from "../../api/fetchPlus";
import dayjs from "dayjs";
import { createProjectRequest } from "../../requests/projectRequests";
import { Timestamp } from "firebase/firestore";

interface ExtendedProps {
	visible: boolean;
	onCancel: () => void;
	onFinish: () => void;
}

export default function CreateProjectModal(props: ExtendedProps) {
	const { visible, onCancel, onFinish } = props;

	const [form, setForm] = useState<ProjectFormModel>({
		start_date: new Date(),
		progress: 0,
	} as ProjectFormModel);

	const putProject = () => {
		return createProjectRequest(form);
	};

	return (
		<Modal
			open={visible}
			onClose={onCancel}
		>
			<div className="modal-container">
				<Typography variant="h5">Create</Typography>
				<div className="create-input-container">
					<TextField
						label={"Title"}
						onChange={(e) => {
							setForm((old_form) => {
								old_form.title = e.target.value;
								return { ...old_form };
							});
						}}
					/>
					<TextField
						label={"Details"}
						multiline
						onChange={(e) => {
							setForm((old_form) => {
								old_form.details = e.target.value;
								return { ...old_form };
							});
						}}
					/>
					<Box sx={{ display: "flex", gap: 2 }}>
						<DatePicker
							label={"Start date"}
							format="DD/MM/YYYY" // @ts-ignore
							value={dayjs(new Date())}
							onChange={(value: string | null) => {
								setForm((old_form) => {
									if (value) {
										old_form.start_date = new Date(value);
									}

									return { ...old_form };
								});
							}}
						/>
						<DatePicker
							label={"Deadline"}
							format="DD/MM/YYYY"
							onChange={(value: string | null) => {
								setForm((old_form) => {
									if (value) {
										old_form.deadline = new Date(value);
									}

									return { ...old_form };
								});
							}}
						/>
					</Box>
				</div>

				<div className="button-container">
					<Button
						onClick={(e) => {
							onCancel();
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={(e) => {
							putProject().then(() => {
								onFinish();
							});
						}}
					>
						Create
					</Button>
				</div>
			</div>
		</Modal>
	);
}
