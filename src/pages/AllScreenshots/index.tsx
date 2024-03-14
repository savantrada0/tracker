import React from 'react';
import { ActivityCard } from '../../components';
import {AllscreenshotsProps, activityobj} from "../../utils/types";
import { Select } from '../../assets/images';
import "../../assets/style/pages/Allscreenshots/style.scss";

const AllScreenshots = ({activities}:AllscreenshotsProps) => {
	const res = new Map();
	activities.forEach(element => {
		const startHour=element.start_time.substring(0,2);
		if(res.has(startHour)){
			const oldArr = res.get(startHour);
			oldArr.push(element);
			res.set(startHour,oldArr);
		}else{
			const arr = [];
			arr.push(element);
			res.set(startHour,arr);
		}
	});
	const arrOfHours: number[] = [];
	function logMapElements(value:[],key:string) {
		arrOfHours.push(parseInt(key));
	}
	res.forEach(logMapElements);
	arrOfHours.sort();
	return (
		<div className='allscreenshots_container'>
			{arrOfHours?.map((currentHour,index)=>{
				const currentHourData = currentHour>9?res.get(currentHour.toString()):res.get(`0${currentHour.toString()}`);
				return(
					<div className='wrapper' key={index}>
						<p className='time_heading'><Select/>{`${currentHour}:00`} - {`${currentHour+1}:00`} total time worked:1:00:00</p>
						<div className="allcards_container">
							{currentHourData?.map((item:activityobj,index:number) => {
								return <ActivityCard key={index} screenshotsUrls={item.screenshots} project={item.project} task={item.todo} startTime={item.start_time}/>;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AllScreenshots;
