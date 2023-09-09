import "./Input.style.css";
import { InputHTMLAttributes } from "react";

interface ExtendedProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: ExtendedProps) {
	return (
		<div className="input-wrapper">
			<input
				className="Input"
				{...props}
			/>
			<hr className="input-line" />
		</div>
	);
}
