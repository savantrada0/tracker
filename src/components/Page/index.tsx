import React from 'react';
import { PageProps } from '../../utils/types';

export const Page = ({ className, children }: PageProps) => {
	return (
		<div className={className ? `${className + ' page'}` : 'page'}>
			{children}
		</div>
	);
};