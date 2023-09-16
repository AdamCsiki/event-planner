import "./Button.style.css";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface ExtendedProps extends HTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ExtendedProps) {
	return (
		<button
			{...props}
			className="Button"
		>
			{props.children}
		</button>
	);
}
