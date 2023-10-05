import "./Notification.style.css";
import NotificationModel from "../../interfaces/NotificationModel";
import { ReactNode, createContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { BsX } from "react-icons/bs";

interface ExtendedProps {
	active: boolean;
	notification: NotificationModel;
	onClose: () => void;
}

export default function Notification(props: ExtendedProps) {
	const { active, notification, onClose } = props;

	const [timeLeft, setTimeLeft] = useState<number>(7);

	useEffect(() => {
		if (timeLeft <= 0) {
			onClose();
		}

		const intervalId = setInterval(() => {
			setTimeLeft((timeLeft) => timeLeft - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft]);

	return (
		<div
			style={{ display: active ? "flex" : "none" }}
			className="Notification"
		>
			<header className="notification-header">
				<h6>Notification!</h6>
				<Button onClick={onClose}>
					<BsX />
				</Button>
			</header>
			{notification.message}
			<footer className="notification-footer">
				<h6>{timeLeft}</h6>
			</footer>
		</div>
	);
}
