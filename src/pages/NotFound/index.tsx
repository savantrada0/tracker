import React from 'react';
import { Page } from '../../components';
import {NoFound} from "../../assets/images";
import "../../assets/style/pages/NotFound/style.scss";
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<Page className='notfound_page'>
			<div className='main notfound_container'>   
				<img src={NoFound} alt='error_img'/>
				<h3>Oops! You seem to be lost.</h3>
				<p>Go to home page: <Link to='/'>Home</Link></p>
			</div>
		</Page>
	);
};

export default NotFound;