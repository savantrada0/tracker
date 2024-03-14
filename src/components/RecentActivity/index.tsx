import React,{useState} from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { RecentActivityProps } from "../../utils/types";
import { Button } from "../Button";
import { ImageViewer } from "../index";
import { RightArrow,Error, NoActivity } from "../../assets/images";
import "../../assets/style/components/RecentActivity/style.scss";

export const RecentActivity = ({recentActivityData,title,link}: RecentActivityProps) => {
	const [toggle,setToggle] = useState(false);
	return (
		<div className="recentactivity_container">
			<div className="recentactivity_heading">
				<h2 className="heading_3">{title}</h2>
			</div>
			<div className="recentactivity_data">
				{recentActivityData?.length?<>
					<div className="card_container">
						{recentActivityData?.map((item,index) => {
							const date = dayjs(item.date).format('ddd, MMM D, YYYY');
							const time = item.start_time.substring(0,5);
							return (
								<div key={index}>
									<ImageViewer screenshotsUrls={item.screenshots} toggle={toggle} setToggle={setToggle}/>
									<div className="recentactivity_card_wrapper" key={index}>
										<div className="accuracy_data" style={{background:parseInt(item.activity_percentage)>50?"#6CCB9C":(parseInt(item.activity_percentage)>30?"#FF9B29":"#D1293D")}}>{item.activity_percentage}%</div>
										<div className="recentactivity_card">
											{item?.screenshots?.length>0 ? 
												<img crossOrigin="anonymous" src={`${process.env.REACT_APP_API_ENDPOINT}/${item.screenshots[0].substring(7)}`} alt="screenshot"/>:<img src={NoActivity} alt="noactivity" />
											}
											<div className='activity_data'>
												{item?.screenshots?.length>0 && <Button type="button" onClick={()=>setToggle(true)} className="viewscreen_button">View screen</Button>}
												<span className="time_data">{`${date} ${time}`}</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="recentactivity_link">
						<Link to={link}>
                            View Activity
							<RightArrow/>
						</Link>
					</div></>:<div className="nodata_wrapper"><Error/></div>}
			</div>
		</div>
	);
};