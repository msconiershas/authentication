import React, { Component } from 'react'
import fire from '../fire'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, firestoreConnect, withFirestore, isLoaded, isEmpty } from 'react-redux-firebase'


class UserLogin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '', 
			password: ''
		};

		this.onSubmitSignup = this.onSubmitSignup.bind(this)
		this.onSubmitLogin = this.onSubmitLogin.bind(this)
		this.onInputChange = this.onInputChange.bind(this)
	}

	onInputChange(e) {
    this.setState({[e.target.type]: e.target.value})
  	}

  	onSubmitLogin(e) {
  		console.log('submit login')
  		const auth = fire.auth()

  		const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password)
  		
  		promise.catch(e => console.log(e.message))
  		console.log(this.props.firebase)
  	
  	}

  	onSubmitSignup(e) {
  		console.log('submit signup')
  		const auth = fire.auth()
  		//TODO check for real email
  		const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
  		promise.catch(e => console.log(e.message))


  	}

	render() {
	return (
		<div>
			<div>
				<input  id="txtEmail" value={this.state.email} type="email" placeholder="Email" onChange={this.onInputChange} />
			</div>
			<div>
				<input  id="txtPassword" value={this.state.password} type="password" placeholder="Password" onChange={this.onInputChange}/>
			</div>
				<button id="btnLogin" className="btn btn-action" onClick={this.onSubmitLogin}>
				Log in 
				</button>

			<button id="btnSignUp" className="btn btn-secondary" onClick={this.onSubmitSignup}>
			Sign Up
			</button>

			
		</div>

	);
	}
		
}

const MapStateToProps = state => ({
	firebase: state.firebase
})


export default connect(MapStateToProps) (UserLogin);