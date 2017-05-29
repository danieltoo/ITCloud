import React, { Component } from 'react'

import TableDocs from '../components/archivos/TableDocs.js'
import DescriptionFile from '../components/archivos/DescriptionFile.js'

class Archivos extends Component {
	constructor(props) {
		super(props);
		this.chageCurrentFile = this.chageCurrentFile.bind(this)
		this.withFile = this.withFile.bind(this)
		this.withoutFile = this.withoutFile.bind(this)
		this.getContFiles  = this.getContFiles.bind(this)
		this.state = {
			currentFile : null,
			contFile : 0,
			copyFile : null
		}
	}
	chageCurrentFile (newFile){
		this.setState({currentFile : newFile})
	}
	getContFiles (cont) {
		this.setState({contFile : cont})

	}
	
	withFile(){
		return (
			<DescriptionFile doc={this.state.currentFile} user={this.props.user} />
			)
	}
	
	withoutFile(){
		if(this.state.contFile > 0){
			return (
			<div>
				Seleciona algun Archivo
			</div>
			)
		}else {
			return (
			<div>
				No tienes archivos almacenados
			</div>
			)
		}

		
	}
	
	render() {
		return (
			<div className='content'>
				<div className="row">
					<div className="col s12 l9">
						<table className="highlight">
							<thead>
					          <tr>
					              <th width={"40%"}>Titulo</th>
					              <th width={"30%"}>Tipo</th>
					              <th width={"30%"}>Fecha de Subida</th>
					          </tr>
					        </thead>
						</table>
						<div className="card z-depth-3"  style={{overflow: "scroll" ,  height : "450px"}}>
							<TableDocs user={this.props.user} chageCurrentFile={this.chageCurrentFile.bind(this)} getContFiles={this.getContFiles.bind(this)}/>
						</div>
					</div>

					<div className="col s12 l3">
						<table className="highlight">
							<thead>
					          <tr>
					              <th>Descripción</th>
					          </tr>
					        </thead>
						</table>
						{this.state.currentFile ? this.withFile() : this.withoutFile() }
					</div>
				</div>
			</div>
		)
	}
}

export default Archivos;