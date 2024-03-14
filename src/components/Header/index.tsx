import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderProps } from '../../utils/types';
import { ToggleMenu } from '../index';
import { useAppDispatch } from '../../redux/store';
import { LogoutReducer } from '../../redux/slice/userSlice';
import { SolguruzLogo,User } from '../../assets/images';
import "../../assets/style/components/Header/style.scss";
import { GetUser } from '../../redux/services/login';

export const Header = ({ hamburgerToggle, setHamburgerToggle }: HeaderProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(()=>{
		dispatch(GetUser());
	},[dispatch]);

	const Logout = () =>{
		dispatch(LogoutReducer());
		localStorage.clear();
		navigate("/signin");
	};

	const list = location.pathname==="/profile"?[{
		handleclick: Logout,
		text: "Logout",
	},
	]:[
		{
			link:"/profile",
			text: "My account",
		},
		{
			handleclick: Logout,
			text: "Logout",
		},
	];

	return (
		<div className="header">
			{location.pathname === "/profile" ? <Link to="/" className="brand_logo_profile">
				<img src={SolguruzLogo} alt="logo" />
			</Link> : <>
				<Link to="/" className="brand_logo">
					<img src={SolguruzLogo} alt="logo" />
				</Link>
				<div
					className="hamburger"
					onClick={() => setHamburgerToggle(!hamburgerToggle)}
				>
					<div className="burger burger1"></div>
					<div className="burger burger2"></div>
					<div className="burger burger3"></div>
				</div>
			</>
			}
			<ul className="menubar">
				<ul className='menubar2'>
					<li className='menu2'>		
						<ToggleMenu button_content={<User/>} selectMenuList={list}/>
					</li>
				</ul>
			</ul>
		</div>
	);
};