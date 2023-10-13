import React, { useContext, useEffect } from "react";
import "./_reset.css";
import "./global.css";
import Routing from "./routes/Routing";
import NotificationProvider from "./context/NotificationContext";
import NotificationModel from "./interfaces/NotificationModel";
import FetchProvider, { FetchContext } from "./context/FetchContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { SET_TOKENS } from "./redux/types/States";
import { useState } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme";
import { basePath } from "./api/api";
import { refreshTokens } from "./redux/actions/authActions";

function App() {
	const fetchContext = useContext(FetchContext);

	const [loading, setLoading] = useState(true);

	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const [notification, setNotification] = React.useState<NotificationModel>(
		{} as NotificationModel
	);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			refreshTokens(token).then((action) => {
				dispatch(action);
			});
		}

		setLoading(false);
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<FetchProvider value={fetchContext}>
					<NotificationProvider
						value={{ notification, setNotification }}
					>
						<div className="App">
							<Routing />
						</div>
					</NotificationProvider>
				</FetchProvider>
			</LocalizationProvider>
		</ThemeProvider>
	);
}

export default App;
