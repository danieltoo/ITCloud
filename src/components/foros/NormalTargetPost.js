import React,{Component} from 'react';
import firebase from '../../firebase.js'
import { NavLink } from 'react-router-dom'

export default class NormalTargetPost extends Component {
	constructor(props) {
    super(props);
    this.tieneTemas = this.tieneTemas.bind(this)
    this.state = {
      foto : null
    }
  }
 componentDidMount() {
    let t = this
    let usuario = firebase.database().ref('Usuarios/' + this.props.post.usuario+'/' );
    usuario.on('value', function(snapshot) {
        t.setState({foto : snapshot.val().foto })
    });
    

  }

  tieneTemas (){
  	return(
  		<div>
  			{
  				this.props.post.temas.map(tema =>
  					(<div key={tema} className="chip">{tema}</div>)
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
		 <div className="card col l4 m6 s12">
	        <div className="card-image " style={{width:"100%", height:200}} >
	          	<img alt="" className="activator" src={this.props.post.img} style={{height:"100%"}}/>
	        	<span className="btn-floating halfway-fab waves-effect waves-light green activator"><i className="material-icons">keyboard_arrow_up</i></span>
	        </div>
	        <br/>
	        <span className="card-title red-text green-text text-darken-4 bold">{this.props.post.titulo}</span>
	        <div className="card-reveal">
	        	<div className="row">
	        		<div className="col s2">
	        			<img alt="" src={this.state.foto} className="circle" style={{width: 50, height:50}}/>
	        		</div>
	        		<div className="col s8">
	        			<br/>
	        			<span className="green-text">{this.props.post.usuario}</span>
	        		</div>
	        		<div className="col s1">
	        			<span className="card-title grey-text btn-floating green text-darken-4"><i className="material-icons right">keyboard_arrow_down</i></span>
	        		</div>
	        	</div>
		    	<p>{this.props.post.descripcion}</p>
		    	{this.props.post.temas ? this.tieneTemas():this.noTieneTemas()}
		    	{this.props.post.fecha}
		    </div>
		    <div className="card-action">
	          <NavLink to={`/foro/articulo/${this.props.post.key}`}  className="btn green"><i className="material-icons right">keyboard_arrow_right</i>Ver foro </NavLink>
	        </div>
	      </div>
		)
	}
}