import React from 'react';
import './Message.css';

export default class Message extends React.Component {
	render() {
		return (<>
			<li class="sent">
				<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
				<p>Oh yeah, did Michael Jordan tell you that?</p>
			</li>
			<li class="replies">
				<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
				<p>No, I told him that.</p>
			</li>
		</>);
	}
}