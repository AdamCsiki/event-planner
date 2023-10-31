import "./RegisterPage.style.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { RegisterFormModel } from "../../interfaces/RegisterFormModel";
import { FormControl, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { register } from "../../requests/authRequests";

export default function RegisterPage() {
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const [errorMsg, setErrorMsg] = useState<string>("");

	const [registerForm, setRegisterForm] = useState<RegisterFormModel>(
		{} as RegisterFormModel
	);

	const navigate = useNavigate();

	const submit = () => {
		console.log(registerForm);
		if (registerForm.email !== registerForm.confirmEmail) {
			setErrorMsg("Email does not match.");
			return;
		}

		if (registerForm.password !== registerForm.confirmPassword) {
			setErrorMsg("Password does not match.");
			return;
		}

		register(registerForm);
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate(-1);
		}
	}, []);

	return (
		<div className="RegisterPage">
			<FormControl
				className="register-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="register-header">
					<Typography
						variant="h2"
						sx={{ color: "primary.light" }}
					>
						Register
					</Typography>
				</div>
				<TextField
					required
					label="Name"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.name = e.target.value;
							return { ...form };
						})
					}
				/>
				<TextField
					required
					label="Email"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.email = e.target.value;
							return { ...form };
						})
					}
				/>
				<TextField
					required
					label="Confirm email"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.confirmEmail = e.target.value;
							return { ...form };
						})
					}
				/>
				<TextField
					required
					type="password"
					label="Password"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.password = e.target.value;
							return { ...form };
						})
					}
				/>
				<TextField
					required
					type="password"
					label="Confirm password"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.confirmPassword = e.target.value;
							return { ...form };
						})
					}
				/>
				<div className="register-form-button-container">
					<Button
						type="submit"
						size="large"
						onClick={() => {
							submit();
						}}
					>
						Register
					</Button>
				</div>
				<Typography color={"error"}>{errorMsg}</Typography>
			</FormControl>
		</div>
	);
}
