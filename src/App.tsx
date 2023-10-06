import React, { useContext } from "react";
import "./_reset.css";
import "./global.css";
import Routing from "./routes/Routing";
import NotificationProvider from "./context/NotificationContext";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import NotificationModel from "./interfaces/NotificationModel";
import ThemeProvider from "./context/ThemeContext";
import FetchProvider, { FetchContext } from "./context/FetchContext";

function App() {
	const fetchContext = useContext(FetchContext);

	const [notification, setNotification] = React.useState<NotificationModel>(
		{} as NotificationModel
	);

	return (
		<ThemeProvider>
			<FetchProvider value={fetchContext}>
				<NotificationProvider value={{ notification, setNotification }}>
					<div className="App">
						<Routing />
					</div>
				</NotificationProvider>
			</FetchProvider>
		</ThemeProvider>
	);
}

export default App;
