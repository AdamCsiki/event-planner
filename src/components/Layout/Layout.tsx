import "./Layout.style.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
	return (
		<>
			<Header />

			<main id="MainPage">
				<Outlet />
			</main>

			<Footer />
		</>
	);
}
