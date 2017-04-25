import React, { Component } from 'react'

class Archivos extends Component {
	render() {
		return (
			<div>Te encuentras en los archivos 
				{this.props.user.displayName}
			</div>
			)
	}
}

export default Archivos;