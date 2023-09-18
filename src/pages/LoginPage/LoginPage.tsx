import "./LoginPage.style.css";
import { useState } from "react";
import { basePath } from "../../api/api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import login from "../../redux/actions/authActions";

export default function LoginPage() {
	const dispatch = useDispatch();

	const [loginForm, setLoginForm] = useState<LoginFormModel>(
		{} as LoginFormModel
	);

	const submit = () => {
		login(loginForm).then((action) => {
			dispatch(action);
		});
	};

	return (
		<div className="LoginPage">
			<form
				className="login-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="login-header">
					<h4>Login</h4>
				</div>
				<Input
					placeholder="email"
					onChange={(e) => {
						setLoginForm((form) => {
							form.email = e.target.value;
							return { ...form };
						});
					}}
				/>
				<Input
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
						onClick={() => {
							submit();
						}}
					>
						Login
					</Button>
				</div>
			</form>
		</div>
	);
}
