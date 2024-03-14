import React from "react";
import { ReportCardProps } from "../../utils/types";
import "../../assets/style/components/ReportCard/style.scss";

export const ReportCard = ({name,description}:ReportCardProps) => {
	return (
		<div className="report_card">
			<div className="card_heading">
				<h3 className="card_name">{name}</h3>
			</div>
			<p className="card_description">{description}</p>
		</div>
	);
};