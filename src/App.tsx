import React, { useContext, useEffect } from "react";
import "./_reset.css";
import "./global.css";
import Routing from "./routes/Routing";
import NotificationProvider from "./context/NotificationContext";
import NotificationModel from "./interfaces/NotificationModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useState } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { refreshTokens } from "./redux/actions/authActions";
import { ConfirmProvider } from "./context/ConfirmContext";
import { isOnline } from "./requests/generalRequests";

function App() {
	const [loading, setLoading] = useState(true);
	const [online, setOnline] = useState(false);

	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const [notification, setNotification] = React.useState<NotificationModel>(
		{} as NotificationModel
	);

	if (!theme) {
		return <LoadingPage />;
	}

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ConfirmProvider>
					<div className="App">
						<Routing />
					</div>
				</ConfirmProvider>
			</LocalizationProvider>
		</ThemeProvider>
	);
}

export default App;
