import { ReactNode, createContext, useEffect, useState } from "react";
import NotificationModel from "../interfaces/NotificationModel";
import Notification from "../components/Notification/Notification";

const NotificationContext = createContext({});

interface ExtendedProps {
	children: ReactNode;
	value: {
		notification: NotificationModel;
		setNotification: (notification: NotificationModel) => void;
	};
}

export default function NotificationProvider(props: ExtendedProps) {
	const { notification, setNotification } = props.value;

	const [active, setActive] = useState(false);

	return (
		<NotificationContext.Provider {...props}>
			<Notification
				active={active}
				notification={notification}
				onClose={() => {
					setActive(false);
				}}
			/>
			{props.children}
		</NotificationContext.Provider>
	);
}
