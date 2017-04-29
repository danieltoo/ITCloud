import React, { Component } from 'react'
import firebase from '../firebase'


class ItemDocsTable extends Component {
	render() {
		return (	
			<tr>
				<td><i className="material-icons left">description</i>{this.props.doc.titulo}</td>
				<td>{this.props.doc.nombre} </td>
				<td>{this.props.doc.contentType}</td>
				<td><i className="material-icons">more_vert</i></td>
			</tr>
			)
	}
}


class TableDocs extends Component {
	constructor(props) {
		super(props);
		this.state={
			docs : []
		}
	}

	componentDidMount() {
		let t = this
		var starCountRef = firebase.database().ref('Documentos/' + this.props.user.displayName);
		starCountRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.setState({docs : temp})
		});
	}
	render() {
		return(
		<table className="responsive-table highlight">
	        <thead>
	          <tr>
	              <th>Titulo</th>
	              <th>Nombre</th>
	              <th>Tipo</th>
	          </tr>
	        </thead>

	        <tbody>
	          {this.state.docs.map((doc) => (
	          	<ItemDocsTable key={doc.downloadURL} doc={doc} />
	          ))}
	          
	        </tbody>
      </table>

		    )
	}	

}



class Archivos extends Component {
	

	render() {
		return (
			<div className='content'>
			<div className="row">
				<div className="col l2">
				Mnu
				</div>
				<div className="col l10">
					<div className="card z-depth-3" >
						<TableDocs user={this.props.user} />
					</div>
				</div>
			</div>
			</div>
		)
	}
}

export default Archivos;