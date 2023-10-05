import "./ProjectListItem.style.css";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Link from "../Link/Link";
import IconButton from "../IconButton/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
				<Link to={`/projects/${auth.name}/${project.title}`}>
					<Typography variant="h5">{project.title}</Typography>
				</Link>
			</ListItemText>
		</ListItem>
	);
}
