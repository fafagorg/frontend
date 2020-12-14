import React from 'react';
import './Room.css';

export default class Room extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
		<li class={this.props.selectedRoom+ "contact"} onClick={() => this.props.getMessage(this.props.data.roomId)}>
			<div class="wrap">
				<span class="contact-status away"></span>
				<div class="meta">
					<p class="name">{this.props.data.roomId}</p>
					<p class="preview">{this.props.data.lastMessage}</p>
				</div>
			</div>
		</li>);
	}
}
