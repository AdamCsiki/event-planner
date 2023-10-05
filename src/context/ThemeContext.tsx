import { ThemeProvider as Provider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";

const themeOptions = {
	palette: {
		primary: {
			light: "#4570d3",
			main: "#174dc9",
			dark: "#10358c",
			contrastText: "#fff",
		},
		text: {
			secondary: "#fbfbfb",
			primary: "#050b14",
		},
	},
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const theme = createTheme(themeOptions);

	return <Provider theme={theme}>{children}</Provider>;
}
