import React from 'react';
import { EmailFieldProps } from '../../utils/types';
import "../../assets/style/components/EmailField/style.scss";

export const EmailField = ({
	name,
	label,
	id,
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
}: EmailFieldProps) => {
	return (
		<div className={className || size ? (className +' '+ size + " email_input_wrapper_column" + `${error && error!==""?" error":""}`) :"email_input_wrapper_column" +`${error && error!==""?" error":""}`}>
			{label && <label htmlFor={id || 'email'}>{label}</label>}
			<span className='starticon'>{startIcon}</span>
			<input
				className={startIcon?"input_starticon":"" || endIcon?"input_endicon":""}
				required={required}
				autoComplete={autocomplate}
				placeholder={placeholder}
				type="email"
				name={name}
				value={value}
				id={id || 'email'}
				onChange={onChange}
				disabled={disable}
			/>
			<span className='endicon'>{endIcon}</span>
			{error && <span className="error">{error}</span>}
		</div>
	);
};