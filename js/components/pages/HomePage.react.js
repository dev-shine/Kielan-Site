/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class About extends Component {
    render() {
	return (
		<div className="about">

		<img className="profilePic" src="img/kielan.jpg" alt="Kielan Lemons"></img>

		<h1>Kielan Lemons</h1>
		<div className="bio"></div>
		<div className="bio-quote">
		<p>"Imagination is its own form of ourage"</p>
		<p>-Frank Underwood</p>
		</div>
		<div className="about-links">
		<a href="https://www.instagram.com/kielan_lemons/"><span>Instagram</span></a>
		<a href="https://twitter.com/KielanLemons"><span>Twitter</span></a>
		<a href="https://github.com/Kielan"><span>Github</span></a>
		</div>
	    </div>
	)
    }
}

class Post extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    url: '',
	    date: '',
	    content: ''
	}

    }
    generateUrl() {
	var preUrl = this.props.title,
	    postUrl = preUrl.replace(/\s+/g, '-').toLowerCase(),
	    post = 'post/',
	    completeUrl = post.concat(postUrl);
	
	this.setState({url: completeUrl})	
    }
    generateDate() {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    preDate = this.props.date,
	    postDate = preDate.split(/\s*\-\s*/g),
	    monthNumber = parseInt(postDate[1]) -1,
	    monthName = months[monthNumber],
	    day = postDate[2].split('T'),
	    day = day[0];
	
	var postDate = monthName + ' ' + day + ', ' + postDate[0]; 
	console.log('finish  ', postDate);
	this.setState({date: postDate})
    }
    generateContent() {
	console.log("this is the content" + this.props.content)
	var preContent = this.props.content,
	    postContent = preContent.slice(0,450),
	    dots = '... ';

	//check if the last character is a space
	function testPostContent(string) {
	    if(/\s+$/.test(string)) {
		postContent = postContent.substring(0, postContent.length -1);    
	    }
	    return postContent
	}
	testPostContent(postContent);
	
	var completeContent = postContent.concat(dots);
	
	this.setState({content: completeContent});
    }
    componentDidMount() {
	this.generateUrl();
	this.generateDate();
	this.generateContent();
    }
    render() {
	return (
	    	<div className="main">
		<div className="posts">
		<ul className="blogsList">
		<li className="menuItem col-md-2">
		<Link className="title" to={this.state.url}>
		<h2>{this.props.title}</h2>
		</Link>
		<h3>{this.props.subtitle}</h3>
		<span>{this.state.date}</span><br />
		<span>comments</span><br />
		<span className="mainpage-post-content">{this.state.content}</span>
		<a href={this.state.url}>
		<span>[read more]</span>
		</a>
	    </li>
	        </ul>
		</div>
		</div>
	)
    }
}


class PostList extends Component {
    render() {
	console.log('render')
	 var blogPosts = this.props.data.map(function(post, index){
	 return (
		 <Post title={post.title} subtitle={post.subtitle} date={post.date} content={post.content} key="post.key"/>
	     );
	 });
	
	return (
		<div className="post-list">
		{blogPosts}
	        </div>
	)
    }
}

class HomePage extends Component {
    constructor(props) {
	super(props)
	    this.state = {
		data: []
	    }
    }
    
    loadPostsFromServer() {
	$.ajax({
	    url: 'http://localhost:3005/blogapi/posts',
	    dataType: 'json',
	    cash: false,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString())
	    }.bind(this)
	});
    }

    componentDidMount() {
	this.loadPostsFromServer();
    }
    render() {
    const dispatch = this.props.dispatch;
    const { projectName, ownerName } = this.props.data;
    return (
      <div className="hz">
	    <div>
	    <PostList data={this.state.data} />
	    </div>
	    <div>
	    <About />
	    </div>
	    </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
