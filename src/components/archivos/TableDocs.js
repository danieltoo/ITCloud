import React, { Component } from 'react'
import firebase from '../../firebase'
import ItemDocsTable from './ItemDocsTable.js'

class TableDocs extends Component {
	constructor(props) {
		super(props);
		this.state={
			docs : []
		}
	}

	componentDidMount() {
		let t = this
		var DocumensRef = firebase.database().ref('Documentos/' + this.props.user.displayName);
		DocumensRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.props.getContFiles(temp.length)
			t.setState({docs : temp})
		});
	}
	render() {
		return(
		<table className=" highlight" >
	        <tbody>
	          {this.state.docs.map((doc) => (
	          	<ItemDocsTable key={doc.downloadURL} doc={doc} chageCurrentFile={this.props.chageCurrentFile} />
	          ))}
	        </tbody>
      	</table>

		    )
	}	

}

export default TableDocs;