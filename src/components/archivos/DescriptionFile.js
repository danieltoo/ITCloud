import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Collapsible,CollapsibleItem, Row, Icon} from 'react-materialize'
import toastr from 'toastr'



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
			<Collapsible  style={{overflow: "scroll" ,  height :"660px"}}>
					<li>
				      <div className="collapsible-header "><h6><strong className="green-text text-darken-4">Descripción :</strong>{this.props.doc.descripcion} </h6></div>
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
				  <CollapsibleItem header='Link' icon='share ' className="green-text text-darken-4" >
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
export default DescriptionFile;