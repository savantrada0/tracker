import React, { useState } from "react";
import { UrlsTableProps, urlsobj} from "../../utils/types";
import { Link } from "react-router-dom";
import { Minus, Plus } from "../../assets/images";
import '../../assets/style/components/UrlsTable/style.scss';

export const UrlsTable = ({ tableHeadings, tableData }: UrlsTableProps) => {
	const [toggle,setToggle] = useState(Array(tableData.length));
	
	const handleToggle = (index:number) =>{
		const updatedStatus = [...toggle];
		if (updatedStatus.includes(index)) {
			updatedStatus.splice(updatedStatus.indexOf(index), 1);
		} else {
			updatedStatus.push(index);
		}
		setToggle(updatedStatus);
	};

	return (
		<div className="table_container">
			<table>
				<thead>
					<tr>
						{tableHeadings.map((item, index:number) => (
							<th key={index}>{item}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableData.map((itemObj:urlsobj,index:number) => {
						return(
							<>
								<tr key={index} onClick={() => handleToggle(index)} style={{cursor:"pointer"}}>
									<td><div className="table_toggle">{toggle.includes(index)?<Minus/>:<Plus/>}<span>{itemObj.domain}</span></div></td>
									<td>{itemObj.duration}</td>
									<td>{itemObj.date}</td>
								</tr>
								{toggle.includes(index)&&
								<tr key={index}>
									<td colSpan={3} style={{padding: "0px"}}>
										<table style={{background:"#F8F9FA"}}>
											<thead>
												<tr>
													<th><span className="url_title">Title</span></th>
													<th><span className="url_title">Url</span></th>
													<th><span className="url_title">Time spent(hours)</span></th>
												</tr>
											</thead>
											<tbody>
												{itemObj.urls.map((item,index) => {
													return(
														<tr key={index}>
															<td><span className="url_wrapper">{item.title}</span></td>
															<td><span className="url_wrapper"><Link to={item.url}>{item.url}</Link></span></td>
															<td><span className="url_wrapper">{item.duration}</span></td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</td>
								</tr>
								}
							</>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};