import {
	Theme,
	ThemeOptions,
	createTheme,
	responsiveFontSizes,
} from "@mui/material";
import { blue, green, purple } from "@mui/material/colors";

let theme: Theme = createTheme({
	palette: {
		background: {
			default: "#f9f9f9",
			paper: "#ffffff",
		},
		primary: {
			main: "#117ee4",
			light: "rgb(64, 151, 233)",
			dark: "rgb(11, 88, 159)",
			contrastText: "#fff",
		},
		secondary: {
			main: "#ff9800",
			light: "rgb(255, 172, 51)",
			dark: "rgb(178, 106, 0)",
			contrastText: "rgba(0, 0, 0, 0.87)",
		},
		text: {
			primary: "rgba(0,0,0,0.87)",
			secondary: "rgba(0, 0, 0, 0.54)",
			disabled: "rgba(0, 0, 0, 0.38)",
		},
		error: {
			main: "#e23d31",
			light: "rgb(231, 99, 90)",
			dark: "rgb(158, 42, 34)",
			contrastText: "#fff",
		},
		warning: {
			main: "#ef6c00",
			light: "rgb(242, 137, 51)",
			dark: "rgb(167, 75, 0)",
			contrastText: "#fff",
		},
		info: {
			main: "#42a5f5",
			light: "rgb(103, 183, 247)",
			dark: "rgb(46, 115, 171)",
			contrastText: "rgba(0, 0, 0, 0.87)",
		},
		success: {
			main: "#00c853",
			light: "rgb(51, 211, 117)",
			dark: "rgb(0, 140, 58)",
			contrastText: "rgba(0, 0, 0, 0.87)",
		},
		divider: "#515151",
	},
	typography: {
		fontFamily: "Inter",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
		fontSize: 14,
		h1: {
			fontSize: "5.535rem",
			letterSpacing: "-0.01em",
			lineHeight: 1.18,
			fontWeight: 600,
		},
		h2: {
			fontSize: "4.162rem",
			letterSpacing: "-0.02em",
			lineHeight: 1.27,
			fontWeight: 600,
		},
		h3: {
			fontSize: "3.129rem",
			letterSpacing: "-0.02em",
			lineHeight: 1,
			fontWeight: 600,
		},
		h4: {
			fontSize: "2.353rem",
			letterSpacing: "-0.03em",
			lineHeight: 1,
			fontWeight: 600,
		},
		h5: {
			fontSize: "1.769rem",
			letterSpacing: "-0.04em",
			lineHeight: 1,
			fontWeight: 600,
		},
		h6: {
			fontSize: "1.33rem",
			letterSpacing: "-0.03em",
			lineHeight: 1.9,
			fontWeight: 600,
		},
		subtitle1: {
			fontSize: "0.752rem",
		},
		subtitle2: {
			fontSize: "0.565rem",
		},
		body1: {
			fontSize: "1rem",
			fontWeight: 200,
		},
		body2: {
			fontSize: "0.8rem",
			fontWeight: 400,
			lineHeight: 1.6,
			letterSpacing: "0.1em",
		},
		button: {
			fontSize: "0.9rem",
			fontWeight: 500,
			lineHeight: 1.5,
			letterSpacing: "0.05em",
		},
		caption: {
			fontSize: "0.7rem",
			fontWeight: 400,
			lineHeight: 1.31,
			letterSpacing: "0.09em",
		},
		overline: {
			fontSize: "0.8rem",
			fontWeight: 500,
			lineHeight: 3,
			letterSpacing: "0.1em",
		},
	},
});

theme = responsiveFontSizes(theme);

export { theme };
