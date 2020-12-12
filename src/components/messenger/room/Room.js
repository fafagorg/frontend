import React from 'react';
import './Room.css';

export default class Room extends React.Component {
	render() {
		return (
		<li class="contact">
			<div class="wrap">
				<span class="contact-status away"></span>
				<div class="meta">
					<p class="name">Playstation 5</p>
					<p class="preview">Buenas, está disponible?</p>
				</div>
			</div>
		</li>);
	}
}
