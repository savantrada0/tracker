import React from "react";
import { Link } from "react-router-dom";
import {TableProps} from "../../utils/types";
import { RightArrow,Error } from "../../assets/images";
import "../../assets/style/components/Table/style.scss";

export const Table = ({ tableHeadings, tableData,title,link,linkName }: TableProps) => {
	return (
		<div className="table_container">
			{title && 	<div className="table_heading">
				<h2>{title}</h2>
			</div>}
			{tableData.length>0?<>
				<div className="table_scroller">
					<table>
						<thead>
							<tr>
								{tableHeadings.map((item, index) => (
									<th key={index}>{item}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{tableData.map((itemObj:any,index) => {
								const obj:any = {};
								tableHeadings.map((item)=>{
									obj[item] = itemObj[item];
								});
								const value = Object.values(obj);
								return(
									<tr key={index}>
										{value.map((item:any,index)=>{
											return(<td key={index}>{item}</td>);
										})
										}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{link && <div className="progress_link">
					<Link to={link}>
						{linkName}
						<RightArrow/>
					</Link>
				</div>}</>:<div className="nodata_container"><Error/></div>}
		</div>
	);
};