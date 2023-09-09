import "./Header.style.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="Header">
			<h5 className="Logo">EPlan</h5>
			<Navbar />
		</header>
	);
}
