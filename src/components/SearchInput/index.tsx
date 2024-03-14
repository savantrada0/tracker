import React from 'react';
import { SearchInputProps } from '../../utils/types';
import { Search } from '../../assets/images';
import "../../assets/style/components/SearchInput/style.scss";

export const SearchInput = ({placeholder,classname,onChange,name,value}:SearchInputProps) => {
	return (
		<div className={`inputbox ${classname}`}>
			<Search/>
			<input name={name} value={value} type="text"  onChange={onChange} placeholder={placeholder || "Enter text here"} />
		</div>
	);
};