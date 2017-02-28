import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { List } from 'react-virtualized/dist/commonjs/List'

import ListItem from './list-item';

class ScrollList extends Component {
	constructor () {
		super(...arguments);
		this.state = {
			'itemsList': []
		};

		this.renderItem = this.renderItem.bind(this);
		this.updateFeed = this.updateFeed.bind(this);

		this.timeout = false;
	}

	componentDidMount () {
		this.interval = setInterval(this.updateFeed, 15000);
	}

	componentWillUnmount () {
		clearInterval(this.interval);
	}

	componentWillReceiveProps(nextProps) {
		this.state.itemsList.unshift(nextProps.itemsList[0]);
	}

	updateFeed () {
		this.setState({itemsList: this.state.itemsList});
	}

	renderItem({index, key}) {
		 return (<ListItem key={key} tweet={this.state.itemsList[index]} />);
	}

	render () {
		const list = this.state.itemsList;

		return (
			<List
				ref='List'
				width={950}
				height={700}
				rowHeight={80}
				rowCount={list.length}
				rowRenderer={this.renderItem}
			/>
		);
	}
}

export default (ScrollList);
