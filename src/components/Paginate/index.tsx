import React, { useEffect, useState } from 'react';
import { PaginateProps } from '../../utils/types';
import { Dropdown } from '../Dropdown';
import { LeftArrow, RightArrow } from '../../assets/images';
import "../../assets/style/components/Paginate/style.scss";

export const Paginate = ({postsPerPage,totalDatas,paginate,previousPage,currentPage,nextPage,setPostPerPage}:PaginateProps) => {
	const [currentLimit,setCurrentLimit] = useState({name:"5/page",id:'5'});

	useEffect(()=>{
		setPostPerPage(parseInt(currentLimit.id));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[currentLimit.id]);

	const list = [{name:"5/page",id:"5"},{name:"10/page",id:"10"},{name:"20/page",id:"20"},{name:"50/page",id:"50"},{name:"100/page",id:"100"}];
	
	const pageNumbers:number[] = [];

	for (let i = 1; i <= Math.ceil(totalDatas / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="pagination_container">
			<ul className="pagination">
				<li onClick={() => previousPage()} className="page_number">
					<LeftArrow/>
				</li>
				{pageNumbers.map((number) => (
					<li key={number} style={{border:number==currentPage?"1px solid black":""}} onClick={() => paginate(number)} className="page_number">
						{number}
					</li>
				))}
				<li onClick={() => nextPage()} className="page_number">
					<RightArrow/>
				</li>
			</ul>
			<Dropdown dropdownList={list} dropdownValue={currentLimit} setDropdownValue={setCurrentLimit}/>
		</div>
	);
};