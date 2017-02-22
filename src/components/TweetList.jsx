import React from 'react';

import Tweet from './Tweet';

export default class TweetList extends React.Component {
	static propTypes = {
		tweets: React.PropTypes.array.isRequired,
	};

	render() {
		const list = this.props.tweets.map(tweet => (
			<Tweet key={tweet.id} tweet={tweet} />
		));

		return (
			<div style={style} >
				{list}
			</div>
		);
	}
}

const style = {
	display: 'flex',
	flexFlow: 'row wrap',
};
