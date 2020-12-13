import React from 'react';
import './Message.css';

export default class Message extends React.Component {
	render() {
		return (<>
			<li class="sent">
				<img src="https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png" alt="" />
				<p>Hola</p>
			</li>
			<li class="replies">
				<img src="https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png" alt="" />
				<p>Hola, que tal?</p>
			</li>
		</>);
	}
}