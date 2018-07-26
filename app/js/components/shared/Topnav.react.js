import React, { Component } from 'react';
import { Link } from 'react-router';

class Topnav extends Component {
    render() {
	return (
		<nav className="top-bar row" data-topbar="">
		<ul className="col-md-12">
		<li className="row nav-li">
	    <h4 className="">
	      <a className="navTitle" href={process.env.URL_ENV}>Kielan Lemons</a>
		</h4>
		</li>
		</ul>
	  </nav>
	)
    }
}

export default Topnav;
