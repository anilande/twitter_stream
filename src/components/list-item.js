import React, {Component} from 'react';
import ReactDom from 'react-dom';

class ListItem extends Component {
	constructor () {
		super(...arguments);
	}

	render () {
		const
			tweet = this.props.tweet;

		return (
			<div className="tweet">
				<img src={tweet.user.profile_image_url} alt={tweet.user.name} className="avatar"/>
				<blockquote>
					<cite>
						<a href={"http://www.twitter.com/" + tweet.user.screenname}>{tweet.user.name}</a> 
						<span className="screen-name">@{tweet.screenname}</span> 
					</cite>
					<span className="content">{tweet.text}</span>
				</blockquote>
			</div>
		);
	}
}

export default (ListItem);
