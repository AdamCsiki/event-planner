import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";

let theme = createTheme({
	palette: {
		common: {
			white: "#f1f1f1",
			black: "#050b14",
		},
		primary: blue,
		secondary: green,
		text: {
			primary: "#050b14",
			secondary: "#c1c1c1",
		},
		divider: "#050b14",
		background: {
			paper: "#f1f1f1",
			default: "#050b14",
		},
	},
	typography: {
		fontFamily: "Inter",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});
theme = responsiveFontSizes(theme);

export { theme };
