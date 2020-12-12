import React from 'react';
import './Messenger.css';
import Message from '../../components/messenger/message/Message'
import Room from '../../components/messenger/room/Room'

export default class Messenger extends React.Component {
	render() {
		return (
		<>
			<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'></link>
			<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css'></link>
			<div id="frame">
				<div id="sidepanel">
					<div id="profile">
					</div>
					<div id="contacts">
						<ul>
							<Room></Room>
						</ul>
					</div>
				</div>
				<div class="content">
					<div class="contact-profile">
						<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
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