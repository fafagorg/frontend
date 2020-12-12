import React from 'react';
import './Room.css';

export default class Room extends React.Component {
	render() {
		return (
		<li class="contact">
			<div class="wrap">
				<span class="contact-status away"></span>
				<div class="meta">
					<p class="name">Rachel Zane</p>
					<p class="preview">I was thinking that we could have chicken tonight, sounds good?</p>
				</div>
			</div>
		</li>);
	}
}
