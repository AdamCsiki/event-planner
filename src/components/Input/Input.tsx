import "./Input.style.css";
import { InputHTMLAttributes, useEffect, useState } from "react";

interface ExtendedProps extends InputHTMLAttributes<HTMLInputElement> {
	info_enabled?: boolean;
	info_text?: string;
}

export default function Input({
	info_enabled = false,
	info_text,
	...props
}: ExtendedProps) {
	const [popActive, setPopActive] = useState<boolean>(false);
	const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

	return (
		<div className="input-wrapper">
			<div className="input-container">
				<input
					className="input-element"
					{...props}
				/>
				<hr className="input-line" />
			</div>
			{info_enabled && (
				<>
					<button
						className="info-button"
						onClick={() => {
							setPopActive(!popActive);

							if (popActive === false) {
								setTimeoutId(
									setTimeout(() => {
										setPopActive(false);
									}, 5000)
								);
							} else {
								clearTimeout(timeoutId);
							}
						}}
					>
						?
					</button>
					<div
						className="info-popover"
						style={{
							visibility: +popActive ? "visible" : "hidden",
						}}
					>
						{info_text}
					</div>
				</>
			)}
		</div>
	);
}
