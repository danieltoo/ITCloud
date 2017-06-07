import React,{Component} from 'react';
import firebase from '../../firebase.js'
import { NavLink } from 'react-router-dom'

export default class DocTargetPost extends Component {
	constructor(props) {
    super(props);
    this.tieneTemas = this.tieneTemas.bind(this)
    this.state = {
      foto : null
    }
  }
 componentDidMount() {
    let t = this
    let usuario = firebase.database().ref('Usuarios/' + this.props.doc.usuario+'/' );
    usuario.on('value', function(snapshot) {
        t.setState({foto : snapshot.val().foto })
    });
    return;

  }

  tieneTemas (){
  	return(
  		<div>
  			{
  				this.props.doc.temas.map(tema =>(
  						<div key={tema} className="chip">{tema}</div>
  					)
  				)
  			}
  		</div>
  		)
  }
  noTieneTemas (){
  	return(
  		<div>No tiene temas</div>
  		)
  }
	render() {
		return (
		 <div className="card col l4">

	        <div className="card-image" style={{width:"100%", height:200}} >
	          	<img alt="" className="activator" src={this.props.doc.img} style={{height:"100%"}}/>
	        	<a href={this.props.doc.downloadURL} download={this.props.doc.nombre}  className="btn-floating halfway-fab waves-effect waves-light green activator"><i className="material-icons">file_download</i></a>

	        </div>
	        <br/>
	        
	        <span className="card-title red-text green-text text-darken-4 bold">{this.props.doc.titulo}</span>
	        
	        <div className="card-reveal">
	        	<div className="row">
	        		<div className="col s2">
	        			<img alt="" src={this.state.foto} className="circle" style={{width: 50, height:50}}/>
	        		</div>
	        		<div className="col s8">
	        			<br/>
	        			<span className="green-text">{this.props.doc.usuario}</span>
	        		</div>
	        		<div className="col s1">
	        			<span className="card-title grey-text btn-floating green text-darken-4"><i className="material-icons right">close</i></span>
	        		</div>
	        	</div>
		    	<p>{this.props.doc.descripcion}</p>
		    	
		    	{this.props.doc.temas ? this.tieneTemas():this.noTieneTemas()}
		    	
        		<div >
	    			<a  href={this.props.doc.downloadURL} download={this.props.doc.nombre} className="blue-text">{this.props.doc.contentType}</a>
        		</div>
        		{this.props.doc.fecha}
		    </div>
		    <div className="card-action">
	          <NavLink to={`/foro/archivo/${this.props.doc.key}`}  className="btn green"><i className="material-icons right">keyboard_arrow_right</i>Ver foro </NavLink>
	        </div>
	      </div>
		)
	}
}