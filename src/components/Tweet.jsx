import React from 'react';

function getTweetDisplayRange(tweet) {
	return tweet.truncated ? tweet.extended_tweet.displayTextRange : tweet.displayTextRange;
}

function getTweetEntities(tweet) {
	return tweet.truncated ? tweet.extended_tweet.entities : tweet.entities;
}

function getTweetText(tweet) {
	return tweet.truncated ? tweet.extended_tweet.full_text : tweet.text;
}

function getTweetDisplayText(tweet) {
	let text = getTweetText(tweet);
	const entities = getTweetEntities(tweet);
	const displayTextRange = getTweetDisplayRange(tweet);
	// remove excess text from the string
	if (displayTextRange) {
		text = text.slice(...displayTextRange);
	}
	// replace t.co urls with their 'readable' version
	entities.urls.forEach((entity) => {
		if (!entity.url) return;
		text = text.replace(entity.url, entity.display_url);
	});
	// remove media urls from the text
	if (entities.media) {
		entities.media.forEach((entity) => {
			text = text.replace(entity.url, '');
		});
	}
	// replace html entities (TODO: check if &lt; <  or &gt; > are required)
	text = text.replace(/&amp;/g, '&');
	return text;
}

function Tweet({ tweet }) {
	if (tweet.retweeted_status) {
		return (
			<div style={styles.tweet}>
				<p style={styles.title}>@{tweet.user.screen_name} retweeted</p>
				<Tweet tweet={tweet.retweeted_status} />
			</div>
		);
	}
	const text = getTweetDisplayText(tweet);
	// const media = getTweetEntities(tweet).media;
	return (
		<div style={styles.tweet}>
			<p style={styles.title}>@{tweet.user.screen_name}</p>
			{text}
		</div>
	);
}

const styles = {
	tweet: {
		border: '1px solid grey',
		borderRadius: 4,
		margin: 5,
		padding: 10,
		flex: '1 0 30%',
		display: 'flex',
		flexFlow: 'column wrap',
		justifyContent: 'center',
	},
	title: {
		fontWeight: 900,
		margin: 0,
	},
};

Tweet.propTypes = {
	tweet: React.PropTypes.object.isRequired,
};

export default Tweet;
