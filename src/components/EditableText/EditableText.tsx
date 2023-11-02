import {
	Box,
	TextField,
	Typography,
	TypographyProps,
	TypographyVariant,
	InputProps,
	SxProps,
	TextFieldVariants,
} from "@mui/material";
import { useState } from "react";

interface ExtendedProps {
	children: string;
	onFinish: (value: string) => void;
	sx?: SxProps;
	variant?: TypographyVariant;
	textFieldVariant?: TextFieldVariants;
	inputProps?: InputProps;
}

export function EditableText(props: ExtendedProps) {
	const { children, onFinish, sx, variant, inputProps, textFieldVariant } =
		props;

	const [active, setActive] = useState(false);
	const [value, setValue] = useState(children);

	return (
		<Box
			onClick={() => {
				setActive(true);
			}}
			onBlur={() => {
				if (value !== children) {
					onFinish(value);
				}
				setActive(false);
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					setActive(false);
				}
			}}
			sx={{
				":hover": {
					cursor: "pointer",
				},
				...sx,
			}}
		>
			{active ? (
				<TextField
					variant={textFieldVariant ?? "standard"}
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					sx={{
						padding: 0,
						margin: 0,
						...sx,
					}}
					inputProps={{
						style: {
							padding: "0 0.5rem",
							...inputProps?.style,
						},
					}}
					onFocus={(e) => {
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length
						);
					}}
					autoFocus
					multiline
				/>
			) : (
				<Typography
					sx={{
						pl: 1,
						pr: 1,
						overflowWrap: "break-word",

						...sx,
					}}
					variant={variant}
				>
					{children ?? " "}
				</Typography>
			)}
		</Box>
	);
}
