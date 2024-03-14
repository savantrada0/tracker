import React from 'react';
import { CardProps } from '../../utils/types';
import '../../assets/style/components/Card/style.scss';

export const Card = ({ children }: CardProps) => {
	return (
		<div className="card_container">
			<div className="card">
				{children}
			</div>
		</div>
	);
};