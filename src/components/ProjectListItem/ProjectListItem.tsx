import "./ProjectListItem.style.css";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Link from "../Link/Link";
import IconButton from "../IconButton/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

export default function ProjectListItem({
	project,
}: {
	project: ProjectModel;
}) {
	const auth = useSelector((state: RootState) => state.auth);

	return (
		<ListItem
			sx={{ color: "primary.main" }}
			secondaryAction={
				<IconButton sx={{ color: "error.main" }}>
					<Delete />
				</IconButton>
			}
		>
			<ListItemText>
				<Link to={`/projects/${auth.name}/${project.name}`}>
					<Typography variant="h5">{project.name}</Typography>
				</Link>
			</ListItemText>
			<ListItemText>
				<Typography>{project.deadLine}</Typography>
			</ListItemText>
		</ListItem>
	);
}
