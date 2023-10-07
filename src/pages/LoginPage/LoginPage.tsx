import "./LoginPage.style.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Typography } from "@mui/material";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../../redux/types/States";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export default function LoginPage() {
	const auth = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [errorMsg, setErrorMsg] = useState<string>("");

	const [loginForm, setLoginForm] = useState<LoginFormModel>(
		{} as LoginFormModel
	);

	const submit = () => {
		login(loginForm)
			.then((action) => {
				dispatch(action);
				if (action.type === LOGIN_FAIL) {
					setErrorMsg("Email or password are incorrect");
				}
				if (action.type === LOGIN_SUCCESS) {
					navigate("/");
				}
			})
			.catch((err) => {
				setErrorMsg(err);
			});
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate(-1);
		}
	}, []);

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
					label="Email"
					onChange={(e) => {
						setLoginForm((form) => {
							form.email = e.target.value;
							return { ...form };
						});
					}}
					sx={{
						label: { color: "var(--grey)" },
					}}
				/>
				<TextField
					type="password"
					label="Password"
					onChange={(e) => {
						setLoginForm((form) => {
							form.password = e.target.value;
							return { ...form };
						});
					}}
					sx={{
						label: { color: "var(--grey)" },
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
				<Typography
					color="error"
					sx={{ fontWeight: 500 }}
				>
					{errorMsg}
				</Typography>
			</FormControl>
		</div>
	);
}
