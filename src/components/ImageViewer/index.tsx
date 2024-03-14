import React, { useState } from 'react';
import {ImageViewerProps} from "../../utils/types";
import { Button } from '../Button';
import { Close,LeftArrow,RightArrow } from '../../assets/images';
import "../../assets/style/components/ImageViewer/style.scss";

export const ImageViewer = ({screenshotsUrls,toggle,setToggle}:ImageViewerProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const updateIndex = (newIndex:number) => {
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= screenshotsUrls?.length) {
			newIndex = screenshotsUrls?.length - 1;
		}
		setActiveIndex(newIndex);
	};
	return(
		<>
			{toggle && <div className="viewer_container">
				<Button className='viewer_close_button' type='button' onClick={()=>setToggle(false)}><Close/></Button>
				<div className="carousel">
					<Button
						type='button'
						className="button-arrow"
						onClick={() => {
							updateIndex(activeIndex - 1);
						}}
					>
						<LeftArrow />
					</Button>
					<div
						className="inner"
					>
						{screenshotsUrls?.map((item,index) => {
							return <img crossOrigin="anonymous" style={{display:index===activeIndex?"block":"none"}} key={index} src={`${process.env.REACT_APP_API_ENDPOINT}/${item.substring(7)}`} alt='imagescreen'/>;
						})}
					</div>
					<Button
						type='button'
						className="button-arrow"
						onClick={() => {
							updateIndex(activeIndex + 1);
						}}
					>
						<RightArrow/>
					</Button>
				</div>
			</div>}
		</>
	);
};