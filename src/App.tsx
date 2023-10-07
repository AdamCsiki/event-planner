import React, { useContext, useEffect } from "react";
import "./_reset.css";
import "./global.css";
import Routing from "./routes/Routing";
import NotificationProvider from "./context/NotificationContext";
import NotificationModel from "./interfaces/NotificationModel";
import ThemeProvider from "./context/ThemeContext";
import FetchProvider, { FetchContext } from "./context/FetchContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { SET_TOKENS } from "./redux/types/States";
import { useState } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

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
			dispatch({
				type: SET_TOKENS,
				payload: {
					token: token,
				},
			});
		}

		setLoading(false);
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

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
