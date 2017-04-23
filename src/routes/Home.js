import React from 'react';

class Home extends React.Component {
	render() {
		
		return (
			<div >

				<main>
					<div>{this.props.user.displayName}</div>
					<div>{this.props.user.email}</div>
					<div>{this.props.user.photoURL}</div>
					<div>{this.props.user.uid}</div>
				</main>
			</div>
			)
	}
}




export default Home;