import React, { useState } from "react";
import {ShowEye,HideEye} from "../../assets/images/index";
import '../../assets/style/components/PasswordField/style.scss';
import { PasswordFieldProps } from '../../utils/types';

export const PasswordField = ({
	label,
	id,
	name,
	value,
	size,
	onChange,
	required,
	autocomplate,
	placeholder,
	className,
	error,
	disable,
	startIcon,
	endIcon
}: PasswordFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={className || size ? (className +' '+ size + " password_input_wrapper_column" + `${error && error!==""?" error":""}`) :"password_input_wrapper_column" +`${error && error!==""?" error":""}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<span className='starticon'>{startIcon}</span>
			<div className="password_input">
				<input
					className={startIcon?"input_starticon":"" || endIcon?"input_endicon":""}
					required={required}
					autoComplete={autocomplate}
					placeholder={placeholder}
					type={showPassword ? "text" : "password"}
					name={name}
					value={value}
					id={id}
					onChange={onChange}
					disabled={disable}
				/>
				<button className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <HideEye/> : <ShowEye/>}</button>
			</div>
			<span className='endicon'>{endIcon}</span>
			{error && <span className="error">{error}</span>}
		</div>
	);
};