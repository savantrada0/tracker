import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';
import { Login } from '../../../redux/services/login';
import { Card, Page, PasswordField, EmailField,Button } from "../../../components";
import "../../../assets/style/pages/Auth/SignIn/style.scss";
import API from "../../../redux/api";

const SignIn = () => {
	const [value, setValue] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		email: "",
		password: "",
	});
	const dispatch = useAppDispatch();

	const response = useAppSelector((state:RootState)=>state.userData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		const regexForPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/i;
		const regexForEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		let valid = true;
		setError({email: "",password: ""});

		if(value.email.length === 0){
			setError((prev) => ({...prev,email: "Email can not be empty."}));	
			valid = false;
		}else if(!value.email.match(regexForEmail)){
			setError((prev) => ({...prev,email: "Please enter valid email."}));
			valid = false;
		}

		if(value.password.length < 8){
			setError((prev) => ({...prev,password: "Password must be of minimum length 8."}));
			valid = false;
		}else if(!value.password.match(regexForPassword)){
			setError((prev) => ({...prev,password: "Password enter valid password."}));
			valid = false;
		}
		
		if(valid){
			const {email,password} = value;
			const data = {
				email: email,
				password: password,
				strategy: "local"
			};
			dispatch(Login(data));
		}
	};

	useEffect(()=>{
		if(response.status == 0){
			toast.error("Please Enter valid credentials");
		}
	},[response.status]);

	if(response.token){
		API.defaults.headers.common['Authorization'] = response.token;
		localStorage.setItem("token", JSON.stringify(response.token));
		return <Navigate replace to="/" />;
	}

	return (
		<Page className="signin_page">
			<Card>
				<div className="signin_container">
					<h1 className="heading_1">Sign in to TimeTracker</h1>
					<EmailField
						label="Work email"
						name="email"
						value={value.email}
						onChange={handleChange}
						required={true}
						autocomplate="false"
						placeholder="Enter your work email"
						error={error.email}
					/>
					<PasswordField
						label="Password"
						name="password"
						value={value.password}
						onChange={handleChange}
						required={true}
						autocomplate="false"
						placeholder="Enter 6 or more characters"
						error={error.password}
					/>
					<Button
						className="login_button"
						type="submit"
						onClick={handleSubmit}
					>
						Log in
					</Button>
				</div>
			</Card>
		</Page>
	);
};

export default SignIn;