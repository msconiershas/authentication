import React from 'react';

const Toolbar = props => (
	<header className="toolbar">
	  <nav className="toolbar_nav">
	    <div className="toolbar_logo"><a href="/">Logo</a></div>
	  	<div className="spacer" />
	  	<div className="toolbar_nav_items">
	  		<ul>
	  		   <li><a href='/'>SignIn</a></li>
	  		   <li><a href='/'>Map</a></li>
	  		</ul>
	  	</div>
	   </nav>
	 </header>

);

export default Toolbar;