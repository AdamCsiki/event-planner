import "./Navbar.style.css";
import Link from "../Link/Link";

export default function Navbar() {
	return (
		<nav id="Navbar">
			<ul className="link-list">
				<li className="link-item">
					<Link to={"/"}>Home</Link>
				</li>
				<li className="link-item">
					<Link to={"/events"}>Events</Link>
				</li>
			</ul>
		</nav>
	);
}
