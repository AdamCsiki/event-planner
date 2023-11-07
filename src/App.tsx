import "./_reset.css";
import "./global.css";
import Routing from "./routes/Routing";
import { RootState, store } from "./redux/store";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { ConfirmProvider } from "./context/ConfirmContext";
import { auth } from "./config/firebase";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "./redux/types/States";

function App() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			store.dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					user: user,
				},
			});
		} else {
			store.dispatch({
				type: LOGIN_FAIL,
				payload: {},
			});
		}
	});

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
