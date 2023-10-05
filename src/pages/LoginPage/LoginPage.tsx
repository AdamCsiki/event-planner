import "./LoginPage.style.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { useDispatch } from "react-redux";
import { getUserByToken, login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Typography } from "@mui/material";

export default function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [loginForm, setLoginForm] = useState<LoginFormModel>(
		{} as LoginFormModel
	);

	const submit = () => {
		login(loginForm)
			.then((action: any) => {
				dispatch(action);
			})
			.finally(() => {
				navigate(-1);
			});
	};

	return (
		<div className="LoginPage">
			<FormControl
				className="login-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Typography
					variant="h2"
					mb={3}
					sx={{ color: "primary.light" }}
				>
					Login
				</Typography>
				<TextField
					placeholder="email"
					onChange={(e) => {
						setLoginForm((form) => {
							form.email = e.target.value;
							return { ...form };
						});
					}}
				/>
				<TextField
					type="password"
					placeholder="password"
					onChange={(e) => {
						setLoginForm((form) => {
							form.password = e.target.value;
							return { ...form };
						});
					}}
				/>
				<div className="login-form-button-container">
					<Button
						size="large"
						onClick={() => {
							submit();
						}}
					>
						Login
					</Button>
				</div>
			</FormControl>
		</div>
	);
}
