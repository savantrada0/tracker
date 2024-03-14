import React from "react";
import { CheckboxProps } from '../../utils/types';
import '../../assets/style/components/Checkbox/style.scss';

export const Checkbox = ({ 
	id,
	name,
	className,
	required,
	autocomplate,
	onChange,
	error,
	label,
	checked
}: CheckboxProps) => {
	return (
		<div className="checkbox_input_wrapper">
			<div className={className ? `${className} + ' input_group_checkbox'` : 'input_group_checkbox'}>
				<input
					id={id}
					autoComplete={autocomplate}
					type="checkbox"
					name={name}
					onChange={onChange}
					required={required}
					checked={checked}
				/>
				<label htmlFor={id}>
					{label}
				</label>
			</div>
			{error && <span className="error">{error}</span>}
		</div>
	);
};