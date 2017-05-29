import React, { Component } from 'react'

class ItemDocsTable extends Component {
	constructor(props) { 
		super(props);
		this.currentFile = this.currentFile.bind(this)
		
	}
	currentFile(){
		this.props.chageCurrentFile(this.props.doc)
	}
	

	
	render() {
		return (	
			<tr onClick={this.currentFile}>
				<td width={"40%"}><input type="checkbox" id={this.props.doc.downloadURL}  />
      				<label htmlFor={this.props.doc.downloadURL} className="black-text">
      					<i className="material-icons left">description</i>
      					{this.props.doc.titulo}
      				</label>
      			</td>
				<td width={"30%"}>{this.props.doc.contentType}</td>
				<td width={"30%"}>{this.props.doc.fecha}</td>
				
			</tr>
			)
	}
}
export default ItemDocsTable;