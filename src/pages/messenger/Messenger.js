import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Messenger.css";
import { io } from "socket.io-client";
import Message from "../../components/messenger/message/Message";
import Room from "../../components/messenger/room/Room";
import * as MessengerServices from "../../services/messenger";
import * as ClientService from "../../services/client";

class Messenger extends React.Component {
  constructor(props) {
    super(props);

    this.roomId = window.location.pathname.replace('/chat', '').replace('/', '') || undefined
    // forbidden if is not your user
    if (this.roomId !== undefined && 
      (
        (this.roomId.split('-')[0] !== ClientService.getJWT().data.user.username && this.roomId.split('-')[1] !== ClientService.getJWT().data.user.username) 
        || 
        this.roomId.split('-')[0] === this.roomId.split('-')[1]
        )
      ) {
      alert('El destinatario no existe');
      this.props.history.push("/chat");
    }
    
    this.state = { selectedRoomId: this.roomId, rooms: undefined, message: undefined };
    this.content = undefined

    this.websocket = this.websocket.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.modifyRoomName = this.modifyRoomName.bind(this);
  }

  async componentDidMount() {
    if (this.roomId !== undefined) {
      try {
        await MessengerServices.getMessages(this.roomId);
      } catch(error) {
        if(error.response.data.error === 'Invalid data user'){
          alert('El destinatario no existe');
          this.props.history.push("/chat");
        }
        if(error.response.data.error === 'Invalid data product'){
          alert('El producto no existe');
          this.props.history.push("/chat");
        }
      }
    }

    if (this.roomId !== undefined) {
      this.setState({ userInfo: await this.getUserInfo(this.getUserDifferent(this.roomId))}) // not work on constructor
    } else {
      this.setState({ userInfo: undefined})
    }
      
 
    await this.getRooms();
    this.websocket();

    // scroll bottom
  }

  async getUserInfo(userId){
    return await MessengerServices.getUserInfo(userId)
  }

  websocket() {
    this.socket = io(
      process.env.REACT_APP_ENDPOINT_API_MESSENGER + "/chat",
      {
        forceNew: false,
        transports: ["websocket"],
        query: {
          token: ClientService.getJWT().token,
        },
      }
    );

    this.socket.on("private_message", async (data) => {
      if (this.state.selectedRoomId === data.roomId) {
        // add message and room
        let room = this.state.rooms.find((x) => x.roomId === data.roomId);
        if (room === undefined && this.state.message === undefined) {
          await this.getRooms();
        } else {
          let message = this.state.message;
          message.messages.push({
            content: data.content,
            userId: data.userId,
          });

          // new message to false
          room.newMessage = false;

          this.setState({ message: message, rooms: this.state.rooms });
        }
      } else {
        // new message to true
        let room = this.state.rooms.find((x) => x.roomId === data.roomId);
        if (room !== undefined) {
          room.newMessage = true;
          this.setState({ rooms: this.state.rooms });
        }
      }
    });
  }

  async getRooms() {
    try {
      let rooms = await MessengerServices.getRooms();
      rooms.map((x) => (x.newMessage = false));
      this.setState({ rooms: rooms });

      // if exist room, get the once
      if (rooms.length > 0 && this.state.selectedRoomId === undefined) {
        await this.getMessage(rooms[0].roomId);

        // select once room if I access by /chat url
        this.setState({selectedRoomId: rooms[0].roomId, userInfo: await this.getUserInfo(this.getUserDifferent(rooms[0].roomId))})
      } else if(rooms.length > 0 && this.state.selectedRoomId !== undefined) {
        await this.getMessage(this.state.selectedRoomId);
      } else if(rooms.length === 0) {
        this.setState({message: undefined, rooms: undefined})
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getMessage(roomId) {
    try {
      let message = await MessengerServices.getMessages(roomId);
      console.log(message)
      this.setState({ message: message });
    } catch (error) {
      console.log(error.response.data.error)
      if(error.response.data.error === 'Invalid data user'){
        alert('El destinatario no existe');
        this.props.history.push("/chat");
      }
      if(error.response.data.error === 'Invalid data product'){
        alert('El producto no existe');
        this.props.history.push("/chat");
      }
    }
  }

  handleChange(event) {
    this.content = event.target.value;
  }

  getUserDifferent(roomId) {
    if (roomId.split('-')[0] === ClientService.getJWT().data.user.username) {
      return roomId.split('-')[1]
    } else {
      return roomId.split('-')[0]
    }
  }
  async sendMessage() {
    // not undefined content
    if(this.content === undefined || this.content === "") return;

    this.socket.emit("send_message", {
      userId: this.getUserDifferent(this.state.selectedRoomId),
      content: this.content,
      roomId: this.state.selectedRoomId,
    });
    
    // print message
    if (this.state.message !== undefined) {
      this.state.message.messages.push({
        content: this.content,
        userId: this.getUserDifferent(this.state.selectedRoomId),
      })
      this.setState({message: this.state.message})
    }
    // new conversation
    if (this.state.message === undefined || this.state.message.messages === []) await this.getRooms();

    // update last message
    let room = this.state.rooms.find((x) => x.roomId === this.state.selectedRoomId);
    room.lastMessage = this.content;
    this.setState({ rooms: this.state.rooms });

    // scroll bottom
    document.getElementById("messages").scrollTop = 10000000000;
  }

  async changeRoom(roomId) {
    await this.getMessage(roomId);

    // new message to false
    let room = this.state.rooms.find((x) => x.roomId === roomId);
    room.newMessage = false;

    this.setState({selectedRoomId: roomId, userInfo: await this.getUserInfo(this.getUserDifferent(roomId)), rooms: this.state.rooms})

    // scroll bottom
    document.getElementById("messages").scrollTop = 10000000000;
  }

  async deleteRoom(roomId) {
    try {
      await MessengerServices.removeRoom(roomId);
      this.setState({selectedRoomId: undefined, userInfo: undefined})
      await this.getRooms();
    } catch (error) {
      console.log(error)
    }
  }

  async modifyRoomName(roomId) {
    let message = this.state.message
    let roomName = prompt("Please enter your name", message.roomName);

    try {
      await MessengerServices.modifyRoomName(roomId, {roomName: roomName});
      let rooms = await MessengerServices.getRooms(roomId);

      message.roomName = roomName
      this.setState({rooms: rooms, message: message})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet prefetch"
          href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      />
        <div id="frame">
          <div id="sidepanel">
            <div id="bottom-bar">
              <button>
                <i class="far fa-newspaper"></i>{" "}
                <span>
                  <Link class="link" to="/">
                    Ver productos
                  </Link>
                </span>
              </button>
            </div>
            <div id="contacts">
              <ul>
                {this.state.rooms !== undefined &&
                  this.state.rooms.map((data, i) => (
                    <Room
                      selectedRoomId={
                        data.roomId === this.state.selectedRoomId
                          ? "selected "
                          : ""
                      }
                      data={data}
                      key={i}
                      changeRoom={this.changeRoom}
                      deleteRoom={this.deleteRoom}
                      modifyRoomName={this.modifyRoomName}
                    />
                  ))}
              </ul>
            </div>
          </div>
          <div class="content">
            <div class="contact-profile">
              {this.state.userInfo !== undefined && (
                <>
                  <img src={this.state.userInfo.image} alt="" />
                  <p>{this.state.userInfo.userName}</p>
                </>
              )}
            </div>
            <div class="messages" id="messages">
              <ul>
                {this.state.message !== undefined &&
                  this.state.message.messages.map((data, i) => (
                    <Message data={data} key={i} />
                  ))}
              </ul>
            </div>
            <div class="message-input">
              <div class="wrap">
                {this.state.selectedRoomId !== undefined ?
                  <>
                    <input
                      type="text"
                      placeholder="Write your message..."
                      onChange={this.handleChange}
                    />
                    <button class="submit" onClick={() => this.sendMessage()}>
                      <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </>
                : ''}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Messenger)