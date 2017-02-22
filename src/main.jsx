import React from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';
import TweetList from './components/TweetList';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.socket = io.connect(window.location.origin);
		this.socket.on('tweetList', (data) => {
			if (this.state.sync) this.setState({ tweetList: data });
		});
	}

	state = {
		tweetList: [],
		sync: true,
	};

	toggleSync = () => {
		this.setState({ sync: !this.state.sync });
	};

	render() {
		//<button onClick={this.toggleSync}>{this.state.sync ? 'stop' : 'start'} syncing tweets</button>
		return (
			<div>
				<TweetList tweets={this.state.tweetList} />
			</div>
		);
	}
}

ReactDOM.render(
	<Main />,
	document.getElementById('app')
);
