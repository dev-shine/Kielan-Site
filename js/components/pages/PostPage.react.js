/*
Posts Page
*/
import React, { Component } from 'react';


class PostPage extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    params: ''
	}
    }
    /*
    fetchPost() {
	var post = this.props.params
	$.ajax({
	    url: 'http://localhost:3005/blogapi/{post}',
	    dataType: 'json',
	    cash: false,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString())
	    }.bind(this)
	})
    }
    */
    render() {
	//var post = this.props.posts[this.props.params.id]
	console.log('props ' + this.props);
	return (	    
	    	<div className="main">
		<div className="posts">
		<ul className="blogsList">
		<li className="menuItem col-md-2">
		/*<a className="title" href={this.state.url}>
		<h2>{this.props.title}</h2>
		</a>
		<h3>{this.props.subtitle}</h3>
		<span>{this.state.date}</span><br />*/
		<span>comments</span><br />
		<span className="mainpage-post-content">{this.state.content}</span>
		</li>
	        </ul>
		</div>
		</div>

	)
    }

}

export default PostPage;
