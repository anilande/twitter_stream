import React, {Component} from 'react';
import ReactDom from 'react-dom';
import io from 'socket.io-client'

import ScrollList from './components/list';
import data from './data/data';

class Twit extends Component {

	constructor () {
		super(...arguments);
		// dummy data
		this.data = data.objects;

		this.state = {
			itemsList: data.objects
		};
	}

	componentWillMount() {
		const self = this;

		if(io !== undefined) {
			var socket = io.connect('/');
			socket.on('twitter-stream', function (data) {
				if ('text' in data)
					self.setState({itemsList: [data]});
			});
			socket.on("connected", function(r) {
				socket.emit("start tweets");
			});
		}
	}

	render () {
		const data = this.state.itemsList;

		return (
			<div className="app-page">
				<div className="lists-wrapper">
					<ScrollList itemsList={data} />
				</div>
			</div>
		);
	}
}

// ReactDom.render(<Twit />, document.getElementById('appContainer'));

export default (Twit);
