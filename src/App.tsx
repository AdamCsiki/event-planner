import "./_reset.css";
import "./global.css";
import Routing from "./routes/Routing";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import { ConfirmProvider } from "./context/ConfirmContext";

function App() {
	const auth = useSelector((state: RootState) => state.auth);

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
