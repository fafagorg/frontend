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
		this.state = {content: undefined, rooms: undefined, message: undefined}

		this.websocket = this.websocket.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.getMessage = this.getMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	componentDidMount() {
		this.getRooms()
		this.websocket();
	}

	websocket() {
		this.socket = io(process.env.REACT_APP_ENDPOINT_SOCKET_MESSENGER + '/chat', {
			forceNew: false,
			transports: ['websocket'],
			query: {
				token: ClientService.getJWT().token,
			}
		});

		this.socket.on('private_message', (data) => {
			let message = this.state.message
			if (message.roomId === data.roomId) {
				// add message
				message.messages.push({
					content: data.content,
					userId: data.userId,
					image: data.image
				})

				// new message to false
				let room = this.state.rooms.find(x => x.roomId === data.roomId);
				room.newMessage = false

				this.setState({message: message, rooms: this.state.rooms})
			} else {
				// new message to true
				let room = this.state.rooms.find(x => x.roomId === data.roomId);
				room.newMessage = true

				this.setState({rooms: this.state.rooms})
			}
		});
	}

	async getRooms() {
		try {
			let rooms = await MessengerServices.getRooms();
			rooms.map(x => x.newMessage = false);
			this.setState({rooms: rooms});

			this.getMessage(rooms[0].roomId);
		} catch (error) {
			console.log("Error", error)
		}
	}

	async getMessage(roomId) {
		try {
			let message = await MessengerServices.getMessages(roomId)
			this.setState({message: message});
		} catch (error) {
			console.log(error)
		}
	}

	handleChange(event) {
		this.setState({content: event.target.value});
	}
	sendMessage() {
		this.socket.emit('send_message', {
			userId: this.state.message.user.userId,
			content: this.state.content,
			roomId: this.state.message.roomId
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
							{this.state.rooms !== undefined && this.state.message !== undefined &&
								this.state.rooms.map((data, i) => <Room selectedRoom={data.roomId === this.state.message.roomId ? 'selected ' : ''} data={data} key={i} getMessage={this.getMessage} />)
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