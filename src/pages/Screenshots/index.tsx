import React from 'react';
import {ScreenshotsProps, activityobj} from "../../utils/types";
import { ActivityCard } from '../../components';
import "../../assets/style/pages/Screenshots/style.scss";
import { Select } from '../../assets/images';

const Screenshots = ({activities}:ScreenshotsProps) => {
	const res = new Map();
	activities.forEach(element => {
		const startHour=element.start_time.substring(0,2);
		const startMinute = parseInt(element.start_time.substring(3,4));
		if(res.has(startHour)){
			const oldArr = res.get(startHour);
			oldArr[startMinute] = element;
			res.set(startHour,oldArr);
		}else{
			const arr = Array(6).fill(false);
			arr[startMinute] = element;
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
		<div className='screenshots_container'>
			{arrOfHours.map((currentHour,index)=>{
				const currentHourData = currentHour>9?res.get(currentHour.toString()):res.get(`0${currentHour.toString()}`);
				return(
					<div className='wrapper' key={index}>
						<p className='time_heading'><Select/>{`${currentHour}:00`} - {`${currentHour+1}:00`} total time worked:1:00:00</p>
						<div className="cards_container">
							{currentHourData?.map((item:activityobj,index:number) => {
								if (item){
									return <ActivityCard key={index} screenshotsUrls={item.screenshots} project={item.project} task={item.todo} time={item.duration} accuracy={item.activity_percentage} startTime={item.start_time} endTime={item.end_time}/>;
								}else{
									return <div key={index} className='empty_data'><div>No Activity</div></div>;
								}
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Screenshots;