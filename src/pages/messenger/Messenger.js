import React from 'react';
import {
	Link
} from "react-router-dom";
import './Messenger.css';
import { io } from 'socket.io-client';
import Message from '../../components/messenger/message/Message'
import Room from '../../components/messenger/room/Room'
import * as MessengerServices from '../../services/messenger'
import * as ClientService from "../../services/client";

export default class Messenger extends React.Component {
	constructor(props) {
		super(props)
		this.state = {content: undefined, rooms: undefined, message: undefined, selectedRoom: undefined}

		this.websocket();
		this.getRooms();

		this.websocket = this.websocket.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.getMessage = this.getMessage.bind(this);
		this.selectedRoom = this.selectedRoom.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	websocket() {
		this.socket = io(process.env.REACT_APP_ENDPOINT_MESSENGER + '/chat', {
			forceNew: false,
			transports: ['websocket'],
			query: {
				token: ClientService.getJWT().token,
			}
		});

		this.socket.on('message', (data) => {
			let message = this.state.message
			if (message.roomId === data.roomId) {
				message.messages.push({
					content: data.content,
					userId: data.userId,
					image: data.image
				})
				this.setState({message: message})
			}
		});
	}

	async getRooms() {
		try {
			let rooms = await MessengerServices.getRooms();
			this.setState({rooms: rooms, selectedRoom: rooms[0].roomId});

			this.getMessage(rooms[0].roomId);
		} catch (error) {
			console.log("Error", error)
		}
	}

	async getMessage(roomId) {
		try {
			let message = await MessengerServices.getMessages(roomId)
			this.setState({message: message, selectedRoom: roomId});
		} catch (error) {
			console.log(error)
		}
	}

	selectedRoom(roomId) {
		this.setState({selectedRoom: roomId})
	}

	handleChange(event) {
		this.setState({content: event.target.value});
	}
	sendMessage() {
		this.socket.emit('message', {
			userId: this.state.message.user.userId,
			content: this.state.content
		})
	}

	render() {
		return (
		<>
			<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'></link>
			<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>
			<div id="frame">
				<div id="sidepanel">
					<div id="bottom-bar">
						<button><i class="far fa-newspaper"></i> <span><Link class="link" to="/">Ver productos</Link></span></button>
					</div>
					<div id="contacts">
						<ul>
							{this.state.rooms !== undefined &&
								this.state.rooms.map((data, i) => <Room selectedRoom={data.roomId === this.state.selectedRoom ? 'selected ' : ''} data={data} key={i} getMessage={this.getMessage} />)
							}
						</ul>
					</div>
				</div>
				<div class="content">
					<div class="contact-profile">
						{this.state.message !== undefined &&
						<>
							<img src={this.state.message.user.image} alt="" />
							<p>{this.state.message.user.name}</p>
						</>
						}
					</div>
					<div class="messages">
						<ul>
							{this.state.message !== undefined &&
								this.state.message.messages.map((data, i) => <Message data={data} key={i} />)
							}
						</ul>
					</div>
					<div class="message-input">
						<div class="wrap">
						<input type="text" placeholder="Write your message..." value={this.state.value} onChange={this.handleChange} />
						<button class="submit" onClick={() => this.sendMessage()}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
						</div>
					</div>
				</div>
			</div>
		</>);
	}
}