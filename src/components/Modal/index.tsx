import React from 'react';
import { ModalProps } from '../../utils/types';
import { Button } from '../Button';
import { Close } from '../../assets/images';
import "../../assets/style/components/Modal/style.scss";

export const Modal = ({ onClick,title,content,actionName,isDisabled,handleAction,handleClose}: ModalProps) => {
	return (
		<div className="main_modal">
			<div
				className="modal_overlay"
				onClick={onClick}
			>
			</div>
			<div className="modal" >
				<Button type='button' onClick={onClick} className="close_button"><Close/></Button>
				<div className="modal_content_wrapper">
					<Button type='button' className="title">{title}</Button>
					{content}
					<div className="bottom_buttons">
						<Button type='button' className='cancel_button' onClick={handleClose}>Cancel</Button>
						<Button type='button' isDisabled={isDisabled} className='action_button' onClick={handleAction}>{actionName}</Button>
					</div>
				</div>
			</div>
		</div>
	);
};