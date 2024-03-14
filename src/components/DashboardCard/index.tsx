import React from 'react';
import { DashboardcardProps } from '../../utils/types';
import "../../assets/style/components/DashboardCard/style.scss";

export const DashboardCard = ({ title, timer, status,showCaseImg }: DashboardcardProps) => {
	return (
		<div className="activity_box">
			<div className="card_topbar">
				<p className="dashboardcard_title">{title}</p>
			</div>
			<p className="main_text">{timer}</p>
			{showCaseImg}
			<div className="card_bottombar">
				<span className="recent_groth">{status}</span>
			</div>
		</div>
	);
};