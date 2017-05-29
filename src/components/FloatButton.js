import React, {Component} from 'react'

import NewMensaje from './mensajes/NewMensaje'
import NewFile from './archivos/NewFile'
import NewForo from './foros/NewForo'

class FloatButton extends Component {

	render() {
		return(
			<div className="fixed-action-btn horizontal click-to-toggle ">
	            <a className="btn-floating btn-large red">
	              <i className="large material-icons">mode_edit</i>
	            </a>
	            <ul>
	              	<li>
	                	<NewMensaje user={this.props.user}/>
	              	</li>
	              	<li>
	                	<NewForo user={this.props.user}/>
	              	</li>
	            	<li>
	              		<NewFile user={this.props.user} />
	              	</li>
	            </ul>
          	</div>
		)
	}
}
export default FloatButton;