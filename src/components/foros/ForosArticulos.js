import React,{Component} from 'react';
import firebase from '../../firebase.js'
import Lista from './Lista'
import FormComentarios from './FormComentarios.js'

export default class ForosArticulos extends Component {
  	constructor(props) {
    	super(props);
    	this.tieneTemas = this.tieneTemas.bind(this)
    	this.state = {
    		key:null,
      		contentType: "",
			descripcion:"",
			downloadURL:"", 
			fecha: "",
			img: "",
			nombre:"", 
			temas:[],
			titulo: "",
			usuario: "",foto:"",email:""
    	}
  	}

  	componentWillMount() {

	    let t = this

	  	let foros= firebase.database().ref('Foros/'+this.props.match.params.key);
		foros.on('value', function(snapshot) {
		  	let documento= firebase.database().ref('Posts/'+snapshot.val().usuario+"/"+t.props.match.params.key);
		  	documento.on('value', function(snap) {
		  		let foto= firebase.database().ref('Usuarios/'+snap.val().usuario+"/");
		  		foto.on('value', function(snapfoto) {
		  			t.setState({foto : snapfoto.val().foto,email : snapfoto.val().email,})
		  		});
		  		let newState ={
		  			key:t.props.match.params.key,
					descripcion:snap.val().descripcion,
					fecha: snap.val().fecha,
					img: snap.val().img,
					nombre:snap.val().nombre, 
					temas:snap.val().temas,
					titulo: snap.val().titulo,
					usuario: snap.val().usuario
			    }
			    t.setState(newState)
		  	 });	
	    });
	}
  	componentWillReceiveProps(nextProps) {

    	let t = this

      	let foros= firebase.database().ref('Foros/'+nextProps.match.params.key);

      	foros.on('value', function(snapshot) {
      		let documento= firebase.database().ref('Posts/'+snapshot.val().usuario+"/"+t.props.match.params.key);
      		documento.on('value', function(snap) {
      			let foto= firebase.database().ref('Usuarios/'+snap.val().usuario+"/");
		  		foto.on('value', function(snapfoto) {
		  			t.setState({foto : snapfoto.val().foto,email : snapfoto.val().email,})
		  		});
      			let newState ={
      				key :t.props.match.params.key,
					descripcion:snap.val().descripcion,
					fecha: snap.val().fecha,
					img: snap.val().img,
					nombre:snap.val().nombre, 
					temas:snap.val().temas,
					titulo: snap.val().titulo,
					usuario: snap.val().usuario
		    	}
		    	t.setState(newState)
      	 	});
        });
  	}
  	tieneTemas (){
	  	return(
	  		<div>
	  			{
	  				this.state.temas.map(tema =>
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
    	return(
      	<div className="row">
      	<br/>
      		<div className="container">
	        	
	      		<div className="col l12 center" style={{height:450}}>
	      			<h4 className="flow-text green-text text-darken-4">{this.state.titulo}</h4>
	      			<h5 className="flow-text">{this.state.descripcion}</h5><br/>
	      			
	      			{this.state.temas ? this.tieneTemas():this.noTieneTemas()}
		        	<div className="row">
		        		<div className="col s12 l12">
		        			<img alt="" src={this.state.foto} className="circle" style={{width: 60, height:60}}/>
		        		</div>
		        		<div className="col s12 l12 ">
		        			<h6 ><strong className="green-text text-darken-4">{this.state.usuario}</strong><br/>
		        			{this.state.email}</h6>
		        		</div>
		        	</div>
		        	<img  alt="" src={this.state.img} className="responsive-img"/>
	      			<FormComentarios foro={this.state.key} />
	      			<Lista foro={this.state.key}/>
	      		</div>
	      		
			</div>	

      </div>
      )
  }
}
