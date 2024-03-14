import React from 'react';
import {TabsProps} from "../../utils/types";
import "../../assets/style/components/Tabs/style.scss";

export const Tabs = ({tabsData,classname,setSelectedTab,selectedTab,selectedClass}:TabsProps) => {
	return (
		<div className={`tabs ${classname}`}>
			{tabsData.map((item,index)=>{
				return(
					<button className={`tabs_button ${item===selectedTab?selectedClass:""}`} key={index} onClick={() => setSelectedTab(item)}>{item}</button>
				);
			})}
		</div>
	);
};