import { useState } from "react";
import "./Home.style.css";
import Input from "../../components/Input/Input";

export default function Home() {
	return (
		<div className="Home">
			<Input info_enabled={true} />
			<div className="home-background"></div>
		</div>
	);
}
