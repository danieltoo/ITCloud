import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from '../firebase'
import {Collapsible,CollapsibleItem, Row, Icon} from 'react-materialize'
import toastr from 'toastr'


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

class DescriptionFile extends Component {
	constructor(props) {
		super(props);
		this.compartir = this.compartir.bind(this)
		this.state = {
			temas : []
		}
		
	}
	componentWillReceiveProps(nextProps) {
		try{
			if (nextProps.doc.temas.length < 1){
			this.setState({temas : ["Sin temas"]})

			}else{
				this.setState({temas : nextProps.doc.temas})
			}
		}catch (err) {
			this.setState({temas : ["Sin temas"]})
		  }
		
	}

	componentDidMount() {
		if (this.props.doc.temas.length < 1){
			this.setState({temas : ["Sin temas"]})

		}else{
			this.setState({temas : this.props.doc.temas})
		}
	}
	compartir () {
	 	let copyTextarea = ReactDOM.findDOMNode(this.refs.textarea)
	  	copyTextarea.select()
	  	try {
		    document.execCommand('copy');

		    toastr.success('Se agrego a portapapeles ')
		    
		  } catch (err) {
		  	console.error(err)
		  }
		    
	}

	render() {
		return (
			<Collapsible  style={{overflow: "scroll" ,  height :"450px"}}>
					<li>
				      <div className="collapsible-header"><h6>{this.props.doc.titulo} </h6></div>
				    </li>
				  <CollapsibleItem header='Temas' icon='class' className="active"  >
				    {
				    	this.state.temas.map(
				    		(tema) => (
				    				<div className="chip" key={tema}>{tema}</div>
				    			) 
				    	)
				    }
				  </CollapsibleItem>
				  <CollapsibleItem header='Link' icon='share' >
				    <textarea  defaultValue={this.props.doc.downloadURL} ref="textarea" >
					 </textarea>
					 <Row><br/>
						<div className="col s12 ">
						 	<a  onClick={this.compartir} className="btn blue"><Icon left>content_copy</Icon>Copiar</a>
						</div>
					</Row>
				  </CollapsibleItem>
				  <CollapsibleItem header='Descargar' icon='file_download'  >
						 	<a className="btn red " href={this.props.doc.downloadURL} download={this.props.doc.nombre} ><Icon left>file_download</Icon>Descargar</a>
				     
				  </CollapsibleItem>
				  
				  
			</Collapsible>
						)
	}
}
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