/*
Posts Page
*/
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';


class TagsComponent extends Component {
	render() {
	    var tagsComponent = this.props.data.map(function(tag, index){
		return (
			<a className="tag" href={process.env.URL_ENV}>
			{tag}
		    </a>
		)
	    });
		return  (
			<div>
			{tagsComponent}
			</div>
		)
	}
}

class PostPage extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    data: [],
	    date: '',
	    content: '',
	    tags: []
	}
    }
    generateDate() {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    preDate = this.state.date;
	    var postDate = preDate.split(/\s*\-\s*/g),
	    monthNumber = parseInt(postDate[1]) -1,
	    monthName = months[monthNumber],
	    day = postDate[2].split('T'),
	    day = day[0];
	
	var postDate = monthName + ' ' + day + ', ' + postDate[0]; 
	this.setState({date: postDate})
    }
    generateTags() {
	var tagsString = this.state.data.tags,
	    tagsArray = tagsString.split(',');
	this.setState({tags: tagsArray})	
    }
    fetchPost() {
	var postUrl = this.props.params.urlParam,
	    fetchUrl = process.env.API_URL + 'post/' + postUrl;
	$.ajax({
	    url: fetchUrl,
	    dataType: 'json',
	    cash: false,
	    success: function(doc) {
		console.log(doc)
		this.setState({data: doc});
		this.setState({date: doc.data});
		this.setState({content: doc.content});
		this.generateDate();
		this.generateTags();
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString())
	    }.bind(this)
	})
    }
    
    componentDidMount() {
	this.fetchPost();
    }
    
    render() {

	return (	    
	    	<div className="main row">
		<div className="posts col-xs-12 col-sm-8 col-md-6 col-xs-offset-0 col-sm-offset-2 col-md-offset-3">
		<ul className="blogsList">
		<li className="menuItem">

		<h1>{this.state.data.title}</h1>

		<h3>{this.state.data.subtitle}</h3>
		<p>{this.state.date}</p><br />
		<div className="post-content">
		<ReactMarkdown source={this.state.data.content} />
		</div>
		<TagsComponent data={this.state.tags}/>
		<div className="spot-im-frame-inpage" data-post-id={this.state.url}></div>
		</li>
	        </ul>
		</div>
		</div>

	)
    }
}

export default PostPage;
