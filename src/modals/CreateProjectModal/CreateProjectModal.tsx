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

interface ExtendedProps {
	visible: boolean;
	onCancel: () => void;
	onFinish: () => void;
}

export default function CreateProjectModal(props: ExtendedProps) {
	const { visible, onCancel, onFinish } = props;

	const [form, setForm] = useState<ProjectFormModel>({
		startDate: dayjs(new Date()).format("DD/MM/YYYY"),
	} as ProjectFormModel);

	const putProject = () => {
		const url = basePath + "/projects/add";

		return fetchPlus(url, {
			method: "PUT",
			body: JSON.stringify(form),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("FetchPlus failed.");
			})
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.error(err);
			})
			.then((res) => {
				return res;
			});
	};

	useEffect(() => {
		console.log(form);
	}, [form]);

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
								old_form.name = e.target.value;
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
										old_form.startDate =
											dayjs(value).format("DD/MM/YYYY");
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
										old_form.deadLine = new Date(
											value
										).toLocaleDateString();
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
