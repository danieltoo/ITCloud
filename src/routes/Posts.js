import React,{Component} from 'react';
import logo from '../logo.svg'
import firebase from '../firebase.js'
import { BrowserRouter as Router, Route,NavLink , Redirect} from 'react-router-dom'

class NormalPost extends Component {
	render() {
		return (
	    <div className="card col s12 m4 l4 z-depth-3">
	    	<br/>
		    <div className="card-image waves-effect waves-block waves-light">
		      <img  className="activator" src={this.props.post.img}/>
		    </div>
		    <div className="card-content">
		      <span className="card-title activator grey-text text-darken-4">{this.props.post.titulo}<i className="material-icons right">more_vert</i></span>
		      <p><a href="#">Ver Foro</a></p>
		    </div>
		    <div className="card-reveal ">
		      <span className="card-title grey-text text-darken-4">{this.props.post.titulo}<i className="material-icons right">close</i></span>
		      <p>{this.props.post.descripcion} {this.props.post.usuario}</p>
		    </div>
		 </div>
			)
	}
}

class DocPost extends Component {
	render() {
		return (
	    <div className=" col s12 m4 l4 z-depth-3">
	    	<br/>
		    <div className="card-image waves-effect waves-block waves-light">
		      <img style={{width:"100%" , height: "100%"}} className="activator" src={this.props.doc.img}/>
		    </div>
		    <div className="card-content">
		      <span className="card-title activator grey-text text-darken-4">{this.props.doc.titulo}<i className="material-icons right">more_vert</i></span>
		      <p><a href="#">Ver archivo</a></p>
		    </div>
		    <div className="card-reveal ">
		      <span className="card-title grey-text text-darken-4">{this.props.doc.titulo}<i className="material-icons right">close</i></span>
		      <p>{this.props.doc.descripcion}</p> {this.props.doc.usuario}
		    </div>
		 </div>
			)
	}
}

class PostsCreados extends Component{
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		}
	}
	componentDidMount() {
		let t = this
		var PostsRef = firebase.database().ref('Posts/' + this.props.match.params.user);
		PostsRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.setState({posts : temp})
		});

	}
	componentWillReceiveProps(nextProps) {
		let t = this

		var PostsRef = firebase.database().ref('Posts/' + nextProps.match.params.user);
		PostsRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.setState({posts : temp})
		});

	}

	render() {
		return(
			<div className="row">
          		<h5><i className="material-icons left">question_answer</i>Foros creados</h5>
            	{
            		this.state.posts.map( (post) => (
            			<NormalPost key={post.img} post={post}/>
            		))
            	}
          	</div>
			)
	}
}

class PostsArchivos extends Component{
	constructor(props) {
		super(props);
		this.state = {
			docs : []
		}
	}
	componentDidMount() {
		let t = this
		var DocumentsRef = firebase.database().ref('Documentos/' + this.props.match.params.user);
		
		DocumentsRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.setState({docs : temp})
		});

	}
	componentWillReceiveProps(nextProps) {
		let t = this

		var DocumentsRef = firebase.database().ref('Documentos/' + nextProps.match.params.user);
		
		DocumentsRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
				console.log(snapshot.val()[doc])
			}
			t.setState({docs : temp})
		});

	}
	render() {
		return(
			<div className="row">
          		<h5>Foros de tus Archivos</h5>
           		{
           			this.state.docs.map( (doc) => (
           				<DocPost key={doc.downloadURL} doc={doc}/>
          			))
           		}
          	</div>
			)
	}
}

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts : [],
			docs : []
		}
	}
	componentDidMount() {
		let t = this
		

		var PostsRef = firebase.database().ref('Posts/' + this.props.user.displayName);
		PostsRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.setState({posts : temp})
		});

		
	}

	render() {
		return (
			<Router>
			<div className="container center">
				<br/>
				<ul className="tabs">
			        <li className="tab col s3 white-text active">
			        	<NavLink to={`/posts/${this.props.user.displayName}/archivos`} >Archivos</NavLink>
			        </li>
			        <li className="tab col s3 white-text">
			        	<NavLink to={`/posts/${this.props.user.displayName}/creados`} >Articulos</NavLink>
			        </li>
			        <li className="tab col s3 white-text"><a href="#test4">Busqueda</a></li>
			      </ul>
			      <Redirect push to={`posts/${this.props.user.displayName}/archivos`}/>
			     <Route path='/posts/:user/archivos' component={PostsArchivos} />
			     <Route path='/posts/:user/creados' component={PostsCreados} />

		          	
		          

			</div>

			</Router>
		)
	}




}


export default Posts ;