import React from 'react';
import fire from '../fire'

const UserLogout = () => { 
	const onLogout = (e) => {
  		fire.auth().signOut();
  	}
  	return (
  	 <div>
  		<h2>Logged Out!</h2>
	 </div>
	);
}

export default UserLogout;