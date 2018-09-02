import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import App from './App'

class Root extends Component {
	render() {
		return (
			<Router >
    <Route path="/" component={App}>
        
    </Route>
 </Router>

			)
	}

 }


 export default Root;
