import "./Navbar.style.css";
import Link from "../Link/Link";
import Projects from "../../pages/Projects/Projects";

export default function Navbar() {
	return (
		<nav id="Navbar">
			<ul className="link-list">
				<li>
					<Link to={"/"}>Home</Link>
				</li>
				<li>
					<Link to={"/projects"}>Projects</Link>
				</li>
				<li></li>
			</ul>
		</nav>
	);
}
