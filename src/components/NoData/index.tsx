import React from 'react';
import {NodataProps} from "../../utils/types";
import { NoFound } from '../../assets/images';
import "../../assets/style/components/NoData/style.scss";

export const NoData = ({classname,content}:NodataProps) => {
	return (
		<div className={`${classname?classname:""} no_data_container`}>   
			<img src={NoFound} alt='error_img'/>
			<h3>{content?content:"No Data Available"}</h3>
		</div>
	);
};