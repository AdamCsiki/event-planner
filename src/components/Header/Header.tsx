import "./Header.style.css";
import Navbar from "../Navbar/Navbar";

export default function Header() {
	return (
		<header className="Header">
			<h5 className="Logo">EPlan</h5>

			<Navbar />
		</header>
	);
}
