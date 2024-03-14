import React from "react";
import "../../assets/style/components/Spinner/style.scss";

export const Spinner = () => {
	return (
		<div className="spinner-container">
			<div className="loading-spinner">
				<span className='loader-span'></span>
			</div>
		</div>
	);
};