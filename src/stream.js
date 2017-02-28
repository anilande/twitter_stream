import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import request from 'request';
import NotFoundPage from './components/NotFoundPage';

const
	app = new Express(),
	server = new Server(app),
	twitter = require('twitter'),
	io = require('socket.io').listen(server);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'static'));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('*', (req, res) => {
  match(
		{ routes, location: req.url },
		(error, redirectLocation, renderProps) => {
			if (error) {
				res.status(500).send(error.message)
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search)
			} else if (renderProps) {
				res.status(200).send(renderToString(<RouterContext {...renderProps} />))
			} else {
				res.status(404).send('Not found')
			}
		}
	);
});

//Setup twitter stream api
const
	twit = new twitter({
		consumer_key: 'nDfmD0DkR3OxxzzmNgLjMSO8i',
    consumer_secret: 'o5VQaWeFH9kfcbBpcfG1qSnSoR3QAoxaBTGyRssEm3rRvT6dKn',
    access_token_key: '836400207147327488-Z97YHxOhCDB3UmeQ6L0DEWaI0tRaKRE',
    access_token_secret: 'dHHtAidF697C5XAl7SxQ0Du1imi7SJdbYqJyLApesnXxD'
	}),
	stream = null;

app.use(Express.static(__dirname + '/src/static'));

io.sockets.on('connection', function (socket) {

	socket.on("start tweets", function() {
		if(stream === null) {
		  	twit.stream('statuses/filter', {'track':'beauty', 'language': 'en'}, function(stream) {
				stream.on('data', function(data) {
					socket.emit('twitter-stream', data);
					stream.on('limit', function(limitMessage) {
						return console.log(limitMessage);
					});

					stream.on('warning', function(warning) {
						return console.log(warning);
					});

					stream.on('disconnect', function(disconnectMessage) {
						return console.log(disconnectMessage);
					});
				});
			});
		}
	});
	socket.emit("connected");
});

//Use the default port (for beanstalk) or default to 8080 locally
server.listen(8080);
