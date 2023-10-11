import { createTheme } from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: blue,
		secondary: green,
	},
	typography: {
		fontFamily: "Inter",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

export default theme;
