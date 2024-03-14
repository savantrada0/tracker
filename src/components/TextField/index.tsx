import React from 'react';
import { TextFieldProps } from '../../utils/types';
import '../../assets/style/components/TextField/style.scss';

export const TextField = ({
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
}: TextFieldProps) => {
	return (
		<div className={className || size ? (className +' '+ size + " input_wrapper_column" + `${error && error!==""?" error":""}`) :"input_wrapper_column" +`${error && error!==""?" error":""}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<span className='starticon'>{startIcon}</span>
			<input
				className={startIcon?"input_starticon":"" || endIcon?"input_endicon":""}
				required={required}
				autoComplete={autocomplate}
				placeholder={placeholder}
				type="text"
				name={name} 
				value={value} 
				id={id} 
				onChange={onChange}
				disabled={disable}
			/>
			<span className='endicon'>{endIcon}</span>
			{error && <span>{error}</span>}
		</div>
	);
};