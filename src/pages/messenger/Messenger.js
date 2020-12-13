import React from 'react';
import './Messenger.css';
import Message from '../../components/messenger/message/Message'
import Room from '../../components/messenger/room/Room'

export default class Messenger extends React.Component {
	render() {
		return (
		<>
			<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'></link>
			<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
			<div id="frame">
				<div id="sidepanel">
					<div id="bottom-bar">
						<button><i class="far fa-newspaper"></i> <span>Ver productos</span></button>
					</div>
					<div id="contacts">
						<ul>
							<Room></Room>
						</ul>
					</div>
				</div>
				<div class="content">
					<div class="contact-profile">
						<img src="https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png" alt="" />
						<p>Jesús Monda</p>
					</div>
					<div class="messages">
						<ul>
							<Message></Message>
						</ul>
					</div>
					<div class="message-input">
						<div class="wrap">
						<input type="text" placeholder="Write your message..." />
						<button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
						</div>
					</div>
				</div>
			</div>
		</>);
	}
}