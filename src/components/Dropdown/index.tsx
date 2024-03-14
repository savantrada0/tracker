import React, { useState } from "react";
import {DropdownProps, menuitemtype, multiplelistobj} from "../../utils/types";
import "../../assets/style/components/Dropdown/style.scss";

export const Dropdown = ({ dropdownList,dropdownValue,setDropdownValue,classname,multiple,index,values,name,id,label,error,disable}: DropdownProps) => {
	const [toggle, setToggle] = useState(false);
	const [hover, setHover] = useState(-1);

	const onSelectMultipleChange = (e: React.ChangeEvent<HTMLInputElement>,item:multiplelistobj) => {
		const list:any = item.values && [...item.values];
		list[item.index || 0][item.feildName || ""] = e.target.value;
		list[item.index || 0][item.selectId || ""] = item.id;
		setDropdownValue&&setDropdownValue(list);
		setToggle(false);
	};

	const onSelectChange = (e: React.ChangeEvent<HTMLInputElement>,item:menuitemtype) => {
		setDropdownValue && setDropdownValue({name:e.target.value,id:item.id});
		setToggle(false);
	};

	const handleHoverOpen = (index: number) => {
		setHover(index);
	};

	const handleHoverClose = () => {
		setHover(-1);
	};

	const multipleList = dropdownList && dropdownList.map(object => {
		return {...object, feildName: name,index:index,values:values,selectId:id};
	});

	return (
		<>
			<div
				style={{ display: toggle ? "block" : "none" }}
				className={`${toggle ? "selected_overlay":"dropdown_overlay"}`}
				onClick={() => setToggle(false)}
			></div>
			<div className="dropdown_container">
				<label>{label}</label>
				<div className={`dropdown ${classname?classname:""} ${disable && "dropdown_disable"}`}>
					<div className={`${toggle ? "selected_wrapper":"dropdown_wrapper"}`}>
						<button onClick={() => !disable && setToggle(!toggle)} className="list_button">
							<div className="top_listitem">
								<input value={dropdownValue?.name ? dropdownValue?.name : dropdownValue} readOnly />
							</div>
						</button>
						{toggle && !disable && multiple && multipleList?.map((item:any, index:any) => {
							return(
								<div className={`list_item ${hover === index && dropdownValue !== item.name? "list_item_hover": ""}`} onMouseOver={() => {handleHoverOpen(index);}} onMouseOut={handleHoverClose} key={index} style={{background: dropdownValue === item.name ? "#2aa7ff" : "inherit",color: dropdownValue === item.name ? "#ffffff" : "inherit",}}>
									<input
										type="radio"
										value={item.name}
										id={item.name}
										onChange={(e)=>onSelectMultipleChange(e,item)}
										checked={dropdownValue === item.name}
										onClick={() => setToggle(false)}
									/>
									<div className="list_name">{item.name}</div>
								</div>
							);
						})}
						{toggle && !disable && !multiple && dropdownList?.map((item, index) => {
							return(
								<div className={`list_item ${hover === index && dropdownValue.id !== item.id? "list_item_hover": ""}`} onMouseOver={() => {handleHoverOpen(index);}} onMouseOut={handleHoverClose} key={index} style={{background: dropdownValue.id === item.id ? "#2aa7ff" : "inherit",color: dropdownValue.id === item.id ? "#ffffff" : "inherit",}}>
									<input
										type="radio"
										value={item.name}
										id={item.name}
										onChange={(e)=>onSelectChange(e,item)}
										checked={dropdownValue?.name === item.name}
										onClick={() => setToggle(false)}
									/>
									<div className="list_name"><span className="list_data">{item.name}</span>{item.email && <span className="list_data">{item.email}</span>}</div>
								</div>
							);
						})}
					</div>
				</div>
				{error && <span className="error_message">{error}</span>}
			</div>
		</>
	);
};