import "./ProjectListItem.style.css";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { Link } from "react-router-dom";

export default function ProjectListItem({
	project,
}: {
	project: ProjectModel;
}) {
	return (
		<li className="project-list-item">
			<Link to={`/projects/${project.title}`}>
				<h5>{project.title}</h5>
			</Link>
		</li>
	);
}
