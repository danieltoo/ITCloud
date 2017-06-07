import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route,NavLink, Redirect} from 'react-router-dom'
import firebase from '../firebase.js'
import PostsCreados from '../components/foros/PostsCreados.js'
import PostsArchivos from '../components/foros/PostsArchivos.js'
import NormalTargetPost from '../components/foros/NormalTargetPost.js'
import DocTargetPost from '../components/foros/DocTargetPost.js'


class PostBusqueda extends Component {
	

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
		this.showPosts =this.showPosts.bind(this)
		this.showDocs =this.showDocs.bind(this)
		this.state = {
			text : '',
			documentos : [],
			posts : []
		}
	}

	componentDidMount() {
		let t =this
   		let search=""
    	let artRel = firebase.database().ref('Foros/');
		artRel.on('value', function(snapshot) {
			let tempDocs = []
			let tempPosts = []
			for (let art in snapshot.val()){
				let artRelin = firebase.database().ref(`${snapshot.val()[art].tipo}/${snapshot.val()[art].usuario}/${art}`);
				artRelin.on('value', function(snap) {
					 if (snap.val().titulo.toLowerCase().includes(search.toLowerCase()) ){

					 	if (snapshot.val()[art].tipo === "Documentos"){
					 		let datos = {
								descripcion: snap.val().descripcion,
								fecha: snap.val().fecha,
								img: snap.val().img,
								titulo: snap.val().titulo,
								temas: snap.val().temas,
								usuario: snap.val().usuario,
								nombre: snap.val().nombre,
								downloadURL: snap.val().downloadURL,
								key : art
							}
							tempDocs.push(datos)
					 	}else {
					 		let datos = {
								descripcion: snap.val().descripcion,
								fecha: snap.val().fecha,
								img: snap.val().img,
								titulo: snap.val().titulo,
								temas: snap.val().temas,
								usuario: snap.val().usuario,
								key : art
							}
							tempPosts.push(datos)
					 	}
					 	
					 }
				});
			}
			t.setState({
				documentos : tempDocs,
				posts : tempPosts
			})
			
		});
	}
	handleChange(e) {
    	//this.setState({text: e.target.value});
   		let t =this
   		let search=ReactDOM.findDOMNode(this.refs.search).value
   		console.log(ReactDOM.findDOMNode(this.refs.search).value)
    	let artRel = firebase.database().ref('Foros/');
		artRel.on('value', function(snapshot) {
			let tempDocs = []
			let tempPosts = []
			for (let art in snapshot.val()){
				let artRelin = firebase.database().ref(`${snapshot.val()[art].tipo}/${snapshot.val()[art].usuario}/${art}`);
				artRelin.on('value', function(snap) {
					 if (snap.val().titulo.includes(search) ){

					 	if (snapshot.val()[art].tipo === "Documentos"){
					 		let datos = {
								descripcion: snap.val().descripcion,
								fecha: snap.val().fecha,
								img: snap.val().img,
								titulo: snap.val().titulo,
								temas: snap.val().temas,
								usuario: snap.val().usuario,
								nombre: snap.val().nombre,
								downloadURL: snap.val().downloadURL,
								key : art
							}
							tempDocs.push(datos)
					 	}else {
					 		let datos = {
								descripcion: snap.val().descripcion,
								fecha: snap.val().fecha,
								img: snap.val().img,
								titulo: snap.val().titulo,
								temas: snap.val().temas,
								usuario: snap.val().usuario,
								key : art
							}
							tempPosts.push(datos)
					 	}
					 	
					 }
				});
			}
			t.setState({
				documentos : tempDocs,
				posts : tempPosts
			})
			
		});
  	}
  	showPosts(){
  		return (
  			<div>
  			{
	            this.state.posts.map( (post) => (
	            	<NormalTargetPost key={post.key} post={post}/>
	            ))
	        }
	        </div>
  		)
  	}
  	showDocs(){
  		return (
  			<div>
  			{
	           	this.state.documentos.map( (doc) => (
	           		<DocTargetPost key={doc.key} doc={doc}/>
	          	))
	        }
	        </div>
  		)
  	}
	render() {
		
		return (
				<div className="container">
					<div className="nav-wrapper card ">
				      <form >
				        <div className="input-field">
				          <input ref="search" type="search" onChange={this.handleChange} required />
				          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
				          <i className="material-icons">close</i>
				        </div>
				      </form>
				    </div>
				    <div className="row">
				    	{this.showDocs()}
				    	{this.showPosts()}
				    </div>
				    


				    
				    

				</div>
			)
	}

}
class FormComentarios extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			foro :null,
			user:null
		}
	}
	componentDidMount() {
	    firebase.auth().onAuthStateChanged(user => {
	      this.setState({ user })
	    })
	  }

	componentWillMount() {
	 	this.setState({foro:this.props.foro})
	}
  	componentWillReceiveProps(nextProps) {
  		this.setState({foro:nextProps.foro})
  	}
	handleSubmit(e) {
        e.preventDefault();
        let id = Date.now()
        let mesajesDB = firebase.database().ref().child("Comentarios/"+this.state.foro+"/"+id)
        let t = this
        var fecha=new Date()
        var newItem = {
        	id: id,
          text: ReactDOM.findDOMNode(t.refs.mensajeInput).value,
          date : fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"+ fecha.getMinutes(),
          photoURL : this.state.user.photoURL,
          user : this.state.user.displayName
        };
        ReactDOM.findDOMNode(t.refs.mensajeInput).value=""
        mesajesDB.set(newItem)
    }
	render() {
		return(
			<div ><br/>
				<h4 className="flow-text green-text text-darken-4">Comentarios</h4>
				<form onSubmit={this.handleSubmit} className="row">
                <div className="col l9">
                  <input ref="mensajeInput" className="white" />
                </div>
                <div className="col l2 right-align">
                  <button className="btn red white-text"><i className="material-icons">send</i></button>
                </div>
              </form>
			</div>
			)
	}
}

class ListaItems extends Component {
	constructor(props) {
        super(props);
         this.state={
          foro: null,
          item : null,
          favorite : false,
          likes:0
        }
      }
     componentWillMount() {
	 	this.setState({foro : this.props.foro,item:this.props.item})
	 	
	}
  	componentWillReceiveProps(nextProps) {
  		this.setState({foro : nextProps.foro,item:nextProps.item})
  	}
	render() {
        return (
            <li className="collection-item avatar right-align"> 
                <img  src={this.state.item.photoURL} style={{width:40, height:40 }}  alt="" className="circle"/>
                <strong className="title green-text text-darken-4">{this.state.item.user}</strong>
                <p>{this.state.item.text}<br/><span className="blue-text">{this.state.item.date}</span></p> 
            </li>
        )
    } 
}

class Lista extends Component {
	constructor(props) {
        super(props);
        this.state={
          items: []
        }
      }

      componentWillMount() {
		let mDB = firebase.database().ref().child("Comentarios/"+this.props.foro)
         mDB.on('value', snap => {
          let temp = []
        	for ( let i in snap.val()){
        		temp.push(snap.val()[i])
        	}
          this.setState({items: temp})
        })
	}
	componentDidMount() {
		let mDB = firebase.database().ref().child("Comentarios/"+this.props.foro)
         mDB.on('value', snap => {
          let temp = []
        	for ( let i in snap.val()){
        		temp.push(snap.val()[i])
        	}
          this.setState({items: temp})
        })
	}

  	componentWillReceiveProps(nextProps) {
		let mDB = firebase.database().ref().child("Comentarios/"+nextProps.foro)
        mDB.on('value', snap => {
        	let temp = []
        	for ( let i in snap.val()){
        		temp.push(snap.val()[i])
        	}
          this.setState({items: temp})
        })
  	}

	

	render() {
        return (
          <ul className="collection"  >
            {this.state.items.reverse().map(item => (
              <ListaItems key={item.id} foro={this.state.foro} item={item} />
            ))}
          </ul>
        );
      }
}

class ForosArticulosArchivo extends Component {
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
		  	let documento= firebase.database().ref('Documentos/'+snapshot.val().usuario+"/"+t.props.match.params.key);
		  	documento.on('value', function(snap) {
		  		let foto= firebase.database().ref('Usuarios/'+snap.val().usuario+"/");
		  		foto.on('value', function(snapfoto) {
		  			t.setState({foto : snapfoto.val().foto,email : snapfoto.val().email,})
		  		});
		  		let newState ={
		  			key:t.props.match.params.key,
			      	contentType: snap.val().contentType,
					descripcion:snap.val().descripcion,
					downloadURL:snap.val().downloadURL, 
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
      		let documento= firebase.database().ref('Documentos/'+snapshot.val().usuario+"/"+t.props.match.params.key);
      		documento.on('value', function(snap) {
      			let foto= firebase.database().ref('Usuarios/'+snap.val().usuario+"/");
		  		foto.on('value', function(snapfoto) {
		  			t.setState({foto : snapfoto.val().foto,email : snapfoto.val().email,})
		  		});
      			let newState ={
      				key :t.props.match.params.key,
		      		contentType: snap.val().contentType,
					descripcion:snap.val().descripcion,
					downloadURL:snap.val().downloadURL, 
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
	      			<img  alt="" src={this.state.img} className="responsive-img"/>
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
	        		<a href={this.state.downloadURL} download={this.state.nombre}  className=" hide-on-large-only btn red activator"><i className="material-icons left">file_download</i>Descargar</a>
			    	<iframe className="hide-on-small-only" style={{width:"100%",height:"200%"}} src={this.state.downloadURL} frameBorder="0" allowFullScreen></iframe>
	      			
	      			<FormComentarios foro={this.state.key} />
	      			<Lista foro={this.state.key}/>
	      		</div>
	      		
			</div>	

      </div>
      )
  }
}

class ForosArticulos extends Component {
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
class Posts extends Component {
	

	render() {
		return (
			<Router>
				<div className="center">
				
				<div className="hide-on-large-only">
					<br/><br/>
					<br/>
				</div>
					<ul className="tabs">
				        <li className="tab col s6">
				        	<NavLink className="green-text text-lighten-3" activeClassName="active green-text text-darken-4" to={`/posts/${this.props.user.displayName}/archivos`} >Archivos</NavLink>
				        </li>
				        <li className="tab col s6">
				        	<NavLink className="green-text text-lighten-3" activeClassName="active green-text text-darken-4" to={`/posts/${this.props.user.displayName}/creados`} >Articulos</NavLink>
				        </li>
				        <li className="tab"><NavLink className="green-text text-lighten-3" activeClassName="active green-text text-darken-4" to={`/posts/busqueda`} >Buscar</NavLink></li>
				    	
				    </ul>
				    
				     <Redirect push to={`/posts/busqueda`}/>
				     <Route exact path='/posts/:user/archivos' component={PostsArchivos} />
				     <Route path='/posts/:user/creados' component={PostsCreados} />
				     <Route path='/posts/busqueda' component={PostBusqueda} />	
				     <Route path='/foro/archivo/:key' component={ForosArticulosArchivo} />
				     <Route path='/foro/articulo/:key' component={ForosArticulos} />
					     
				</div>

			</Router>
		)
	}




}


export default Posts ;