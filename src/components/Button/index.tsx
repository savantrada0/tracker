import React from 'react';
import { ButtonProps } from '../../utils/types';
import '../../assets/style/components/Button/style.scss';

export const Button = ({ children, className, sx, type ,id, onClick, onSubmit, variant,size,isDisabled }: ButtonProps) => {
	return (
		<div className={(className || (variant) || size) ? (className + ' ' + variant + ' '+ size+' ' + 'button_wrapper') : ('button_wrapper')} id={id}>
			<button
				type={type}
				style={sx}
				onClick={onClick}
				onSubmit={onSubmit}
				disabled={isDisabled}>
				{children}
			</button>
		</div>
	);
};