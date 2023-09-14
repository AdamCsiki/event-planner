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
			<Link to={`/projects/${project.creator}/${project.title}`}>
				<h5>{project.title}</h5>
				<h6>{project.creator}</h6>
				<h5>
					{project.blackList.map((user) => (
						<h5>{user.name}</h5>
					))}
				</h5>
			</Link>
		</li>
	);
}
