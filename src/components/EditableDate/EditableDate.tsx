import {
	Box,
	TextField,
	Typography,
	TypographyProps,
	TypographyVariant,
	InputProps,
	SxProps,
	TextFieldVariants,
	InputBaseComponentProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../Theme";
import { DatePicker } from "@mui/x-date-pickers";
import { editProjectRequest } from "../../requests/projectRequests";
import dayjs from "dayjs";

interface ExtendedProps {
	children: string;
	onFinish: (value: string) => void;
	onFinal?: () => void;
	containerSx?: SxProps;
	datePickerSx?: InputBaseComponentProps;
	typographySx?: SxProps;
	variant?: TypographyVariant;
	isActive?: boolean;
}

export function EditableDate(props: ExtendedProps) {
	const {
		children,
		onFinish,
		onFinal,
		containerSx,
		datePickerSx,
		typographySx,
		variant,
		isActive,
	} = props;

	const [active, setActive] = useState(isActive || false);
	const [value, setValue] = useState(children);

	useEffect(() => {
		setValue(children);
	}, [children]);

	return (
		<Box
			onClick={() => {
				setActive(true);
			}}
			onBlur={() => {
				// if (value !== children) {
				// 	onFinish(value);
				// }
				// setActive(false);
				// onFinal?.();
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					setActive(false);
				}
			}}
			sx={{
				minWidth: "3rem",
				minHeight: "1rem",

				display: "flex",
				justifyContent: "center",
				alignItems: "center",

				":hover": {
					borderRadius: 1,
					backgroundColor: "rgba(0, 0, 0, 0.05)",
					cursor: "pointer",
				},
				...containerSx,
			}}
		>
			{active ? (
				<DatePicker
					format="DD/MM/YYYY"
					sx={{
						...datePickerSx,
						input: { color: datePickerSx?.color },
						label: { color: datePickerSx?.color },
					}} // @ts-ignore
					value={dayjs(children)}
					onChange={(value: string | null) => {
						if (!value) {
							return;
						}
						setValue(value);
					}}
				/>
			) : (
				<Typography
					sx={{
						width: "100%",
						p: 2,
						overflowWrap: "break-word",

						...typographySx,
					}}
					variant={variant}
				>
					{children && children.length > 0 ? children : "Edit..."}
				</Typography>
			)}
		</Box>
	);
}
