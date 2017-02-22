const path		= require('path');
const express 	= require('express');
const Redis 	= require('ioredis');

const app 		= express();
const redis 	= new Redis();

const server 	= require('http').createServer(app);
const io 		= require('socket.io')(server);

const port = 8080;
server.listen(port);
console.log(`server started on port ${port}`);

const updateInterval = 1000;

redis.on('error', (error) => {
	console.log('Redis error: ', error);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'static/')));

// Show room select/create screen
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

function updateTweetList(socket) {
	redis.lrange('data:tweets:filtered', 0, -1).then((result) => {
		const tweets = result.map(JSON.parse);
		socket.emit('tweetList', tweets);
	});
}

// Communicate with clients
io.on('connect', (socket) => {
	updateTweetList(socket);
	setInterval(() => updateTweetList(socket), updateInterval);
});
