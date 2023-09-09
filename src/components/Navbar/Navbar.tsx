import "./Navbar.style.css";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav id="Navbar">
			<ul className="link-list">
				<li className="link-item">
					<Link
						to={"/"}
						className="link"
					>
						<h6 className="link-text">Home</h6>
					</Link>
				</li>
				<li className="link-item">
					<Link
						to={"/events"}
						className="link"
					>
						<h6 className="link-text">Events</h6>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
