import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Link to="/chat">Ir a chat</Link>
		);
	}
}