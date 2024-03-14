import React from "react";
import { ToggleSwitchProps } from "../../utils/types";
import "../../assets/style/components/ToggleSwitch/style.scss";

export const ToggleSwitch = ({id,name,checked,onChange,optionLabels,small,disabled}:ToggleSwitchProps) => {
	function handleKeyPress(e:React. MouseEvent<HTMLLabelElement, MouseEvent>) {
		e.preventDefault();
		const updatedStatus = [...checked];
		if (updatedStatus.includes(name)) {
			updatedStatus.splice(updatedStatus.indexOf(name), 1);
		} else {
			updatedStatus.push(name);
		}
		onChange(updatedStatus);
	}

	const handleChange = () =>{
		const updatedStatus = [...checked];
		if (updatedStatus.includes(name)) {
			updatedStatus.splice(updatedStatus.indexOf(name), 1);
		} else {
			updatedStatus.push(name);
		}
		onChange(updatedStatus);
	};

	return (
		<div className={"toggle-switch" + (small ? " small-switch" : "")}>
			<input
				type="checkbox"
				className="toggle-switch-checkbox"
				name={name}
				id={name}
				checked={checked.includes(name)?true:false}
				onChange={handleChange}
				disabled={disabled}
			/>
			{id ? (<label className="toggle-switch-label"   tabIndex={disabled ? -1 : 1}
				onClick={(e) => handleKeyPress(e)} htmlFor={id}>
				<span className={
					disabled
						? "toggle-switch-inner toggle-switch-disabled"
						: "toggle-switch-inner"
				}
				data-yes={optionLabels[0]}
				data-no={optionLabels[1]}
				tabIndex={-1}/>
				<span
					className={
						disabled
							? "toggle-switch-switch toggle-switch-disabled"
							: "toggle-switch-switch"
					}
					tabIndex={-1}
				/>
			</label>):null}
		</div>
	);
};