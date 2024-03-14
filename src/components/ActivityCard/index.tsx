import React, { useState } from 'react';
import { Button, ImageViewer } from '../index';
import { ActivityCardProps } from '../../utils/types';
import { EditIcon, NoActivity } from '../../assets/images';
import "../../assets/style/components/ActivityCard/style.scss";

export const ActivityCard = ({project,task,screenshotsUrls,startTime,endTime,accuracy,time}:ActivityCardProps) => {
	const [toggle,setToggle] = useState(false);
	return (
		<>
			<ImageViewer screenshotsUrls={screenshotsUrls} toggle={toggle} setToggle={setToggle}/>
			<div className="activity_container">
				<span className='project_name'>{project}</span>
				<span className='task_name'>{task}</span>
				<div className="activity_card">
					<div className='screenshot_wrapper'>
						<div className="screenshot_overlay">
							{screenshotsUrls?.length>0 && <Button type='button' onClick={()=>setToggle(true)} className='view_screen_button'>View screens</Button>}
						</div>
						{screenshotsUrls?.length>0 ? 
							<img crossOrigin="anonymous" src={`${process.env.REACT_APP_API_ENDPOINT}/${screenshotsUrls[0].substring(7)}`} alt='screeshot'/>:<img src={NoActivity} alt='noactivity'/>
						}
					</div>
					{endTime && <Button className='screen_button' type='button'>{`${screenshotsUrls?.length || 0} screens`}</Button>}
					<div className='row'>
						{endTime?<><span className='time'>{startTime} - {endTime}</span><Button className='edit_button' type='button'><EditIcon/></Button></>:<span className='time'>{startTime}</span>}
					</div>
					{accuracy&&
					<>
						<div className="accuracy_chart"><span className='accuracy_groth' style={{width:`${accuracy}%`,background:parseInt(accuracy)>50?"#318A5E":(parseInt(accuracy)>30?"#FF9B29":"#D1293D")}}></span></div>
						<span className='accuracy_percent'>{accuracy}% of {time}</span>
					</>
					}
				</div>
			</div>
		</>
	);
};