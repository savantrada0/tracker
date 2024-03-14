import React,{useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SidebarProps,menulistobj } from '../../utils/types';
import { SidebarMenu } from "../index";
import { Left,Right,SolguruzLogo } from '../../assets/images';
import '../../assets/style/components/Sidebar/style.scss';

export const Sidebar = ({hamburgerToggle,toggle,setToggle,menuList}: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialeState = menuList.find(e=>e.link===location.pathname);
	const [selectedMenu, setSelectedMenu] = useState(initialeState?.link || menuList[0].link);
	const [hover, setHover] = useState(-1);
	const handleToggle = () => {
		setToggle(!toggle);
	};
	const handleClick = (item:menulistobj) =>{
		setSelectedMenu(item.link);
		navigate(item.link);
	};
	const handleHoverOpen = (index: number) => {
		setHover(index);
	};
	const handleHoverClose = () => {
		setHover(-1);
	};
	useEffect(()=>{
		setSelectedMenu(location.pathname);
	},[location]);
	return (
		<>
			<div style={{ width: toggle ? "244px" : "80px" }} className="sidebar">
				<button
					onClick={handleToggle}
					className="toggle_button"
					style={{ left: toggle ? "220px" : "56px" }}
				>
					{toggle ? (
						<Left/>
					) : (
						<Right/>
					)}
				</button>
				<ul className="sidebar_wrapper">
					{menuList.map((item, index) => (
						<li
							key={index}
							style={{
								color: selectedMenu === item.link ? "#2aa7ff" : "inherit",
								height: toggle ? "" : "26px",
							}}
						>
							<div
								className="border"
								style={{
									display: item.menus?.find((e) => e.link === selectedMenu) || (item.link === selectedMenu)
										? "block"
										: "none",
								}}
							></div>
							{item.menus ? (
								<button
									onClick={()=>handleClick(item)}
									className="sidebar_button"
									style={{
										margin: toggle ? "0px 30px" : "0px 0px",
										padding: toggle ? "5px 0px" : "5px 30px",
									}}
								>
									{item.icon}
									{toggle && (
										<SidebarMenu
											buttonName={item.name}
											list={item.menus}
											selectedMenu={selectedMenu}
											setSelectedMenu={setSelectedMenu}
										/>
									)}
								</button>
							) : (
								<button
									onClick={()=>handleClick(item)}
									className="sidebar_button"
									style={{
										margin: toggle ? "0px 30px" : "0px 0px",
										padding: toggle ? "5px 0px" : "5px 30px",
									}}
									onMouseEnter={() => {
										handleHoverOpen(index);
									}}
									onMouseLeave={handleHoverClose}
								>
									{item.icon}
									<span className={`${hover === index && selectedMenu !== item.link ?"menu_name" : ""}`} style={{ display: toggle ? "block" : "none" ,color:selectedMenu==item.link?"#01B8FE":"inherit"}}>
										{item.name}
									</span>
								</button>
							)}
						</li>
					))}
				</ul>
			</div>
			{hamburgerToggle && (
				<div className="sidebar_drawer">
					<Link to="/" className="sidebar_brand_logo">
						<img src={SolguruzLogo} alt="logo" />
					</Link>
					<ul className="sidebar_wrapper">
						{menuList.map((item, index) => (
							<li
								key={index}
								style={{
									color: selectedMenu === item.link ? "#2aa7ff" : "inherit",
								}}
							>
								<div
									className="border"
									style={{
										display: item.menus?.find((e) => e.link === selectedMenu)
											? "block"
											: "none",
									}}
								></div>
								{item.menus ? (
									<button
										className="sidebar_button"
										style={{
											margin: toggle ? "0px 30px" : "0px 0px",
											padding: toggle ? "5px 0px" : "5px 30px",
										}}
										onClick={()=>handleClick(item)}
									>
										{item.icon}
										{toggle && (
											<SidebarMenu
												buttonName={item.name}
												list={item.menus}
												selectedMenu={selectedMenu}
												setSelectedMenu={setSelectedMenu}
											/>
										)}
									</button>
								) : (
									<button
										onClick={() => handleClick(item)}
										className="sidebar_drawer_button"
										style={{
											color: selectedMenu === item.link ? "#2aa7ff" : "inherit",
											margin: toggle ? "0px 30px" : "0px 0px",
											padding: toggle ? "5px 0px" : "5px 30px",
										}}
									>
										{item.icon}
										<span className='menu_name' style={{ display: toggle ? "block" : "none" }}>
											{item.name}
										</span>
									</button>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};