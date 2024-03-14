import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { SidebarmenuProps, expandmenu } from "../../utils/types";
import "../../assets/style/components/Sidebarmenu/style.scss";
import { LeftArrow,DownArrow } from "../../assets/images";

export const SidebarMenu = ({buttonName,list,selectedMenu,setSelectedMenu}: SidebarmenuProps) => {
	const [toggle, setToggle] = useState(false);
	const [hover, setHover] = useState(-1);
	const navigate = useNavigate();

	const onSelectChange = (item:expandmenu) => {
		setSelectedMenu(item.link);
		navigate(item.link);
	};

	const handleHoverOpen = (index: number) => {
		setHover(index);
	};

	const handleHoverClose = () => {
		setHover(-1);
	};

	const handleClick = () => {
		setSelectedMenu(list[0].link);
		setToggle(true);
	};

	return (
		<div className="menu_wrapper">
			<div className="menu_select_button">
				<div onClick={handleClick} className="list_button">
					<div className="top_listitem">
						<input
							value={buttonName}
							readOnly
							className={`menutopinput ${
								hover === list.length && selectedMenu !== list[0].link ? "list_item_hover" : ""
							}`}
							onMouseEnter={() => {
								handleHoverOpen(list.length);
							}}
							onMouseLeave={handleHoverClose}
							style={{
								color: list.find((e) => e.link === selectedMenu) || (selectedMenu === buttonName) ? "#2aa7ff": "inherit",
							}}
						/>
					</div>
				</div>
				{toggle ? (
					<span onClick={()=>setToggle(!toggle)} className="toggle_arrow_button"><DownArrow/></span>
				) : (
					<span onClick={()=>setToggle(!toggle)} className="toggle_arrow_button"><LeftArrow/></span>
				)}
			</div>
			{toggle && list.map((item, index) => {return (
				<div
					className={`menulist_item ${
						hover === index && selectedMenu !== item.link ? "list_item_hover" : ""
					}`}
					onMouseEnter={() => {
						handleHoverOpen(index);
					}}
					onMouseLeave={handleHoverClose}
					key={index}
					style={{
						color: selectedMenu === item.link ? "#2aa7ff" : "inherit",
						background: selectedMenu === item.link ? "#dbdde3" : "inherit",
						borderRadius: "15px",
					}}
				>
					<input
						type="radio"
						value={item.menuName}
						id={item.menuName}
						onChange={()=>onSelectChange(item)}
						checked={selectedMenu === item.menuName}
					/>
					<div className="item_name">{item.menuName}</div>
				</div>
			);})}
		</div>
	);
};