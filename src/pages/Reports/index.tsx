import React from "react";
import { Page, ReportCard } from "../../components";
import { Timesheets } from "../../assets/images";
import "../../assets/style/pages/Report/style.scss";

const Reports = () => {
	return (
		<Page>
			<div className="main">
				<div className="reports">
					<div className="heading">
						<h1 className="heading_2">heading</h1>
						<button className="heading_button">
							<Timesheets/>
							<span>Scheduled reports</span>
						</button>
					</div>
					<div className="report">
						<h2 className="report_heading">
							<span>Payment</span>
						</h2>
						<div className="report_card_wrapper">
							<ReportCard name="Time & activity" description="See team members time worked, activity levels, and amounts earned per project or to-do"/>
							<ReportCard name="Time & activity" description="See team members time worked, activity levels, and amounts earned per project or to-do"/>
							<ReportCard name="Time & activity" description="See team members time worked, activity levels, and amounts earned per project or to-do"/>
							<ReportCard name="Time & activity" description="See team members time worked, activity levels, and amounts earned per project or to-do"/>
							<ReportCard name="Time & activity" description="See team members time worked, activity levels, and amounts earned per project or to-do"/>
							<ReportCard name="Time & activity" description="See team members time worked, activity levels, and amounts earned per project or to-do"/>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Reports;
