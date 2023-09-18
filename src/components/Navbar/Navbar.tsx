import "./Navbar.style.css";
import Link from "../Link/Link";

export default function Navbar() {
	return (
		<nav id="Navbar">
			<ul className="link-list">
				<li>
					<Link to={"/projects"}>Projects</Link>
				</li>
				<li>
					<Link to={"/login"}>User</Link>
					<ul>
						<li>
							<Link to={"/login"}>Login</Link>
						</li>
						<li>
							<Link to={"/register"}>Register</Link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
}
