import React,{useRef,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { SelectmenuProps, selectmenutype } from '../../utils/types';
import { Button } from '../Button';
import '../../assets/style/components/Togglemenu/style.scss';

export const ToggleMenu = ({selectMenuList,button_content,classname,onclick}: SelectmenuProps) => {
	const [toggle,setToggle] = useState(false);
	const ref = useRef<any>(null);

	const handleClick = (e:React.MouseEvent<HTMLLIElement, MouseEvent>,item:selectmenutype) =>{
		item.handleclick&&item.handleclick();
		setToggle(false);
	};

	useEffect(() => {
		const checkIfClickedOutSide = (e: MouseEvent) => {
			if (toggle && ref.current && !ref.current.contains(e.target)) {
				setToggle(false);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutSide);
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutSide);
		};
	}, [toggle,setToggle]);

	const handleToggle = () =>{
		setToggle(!toggle);
		onclick && onclick();
	};

	return (
		<div className={`togglemenu ${classname?classname:""}`}  ref={ref}>
			<Button type='button' onClick={handleToggle}>
				{button_content}
			</Button>
			<ul className='togglemenu_list' style={{display:toggle?"block":"none"}}>
				{selectMenuList.map((item,index)=>{ 
					return(
						<li className='toggle_list_item' key={index} onClick={(e)=>handleClick(e,item)}>
							{item.link ? <Link to={item.link}>{item.text}{item.icon}</Link>:<>{item.text}{item.icon}</>}
						</li>
					);
				})}
			</ul>
		</div>
	);
};