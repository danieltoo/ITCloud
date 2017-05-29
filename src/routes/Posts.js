import React,{Component} from 'react';
import logo from '../logo.svg'
import firebase from '../firebase.js'

class NormalPost extends Component {
	render() {
		return (
		<div className="col s12 m3 l3 card small">
        	<h6 className="center">Bases de datos móviles en sistemas distribuido</h6>
        	<p className="light"></p>
        	<div className="card-image waves-effect waves-block waves-light">
		      <img className="activator" src={logo}/>
		    </div>
        	<div className="card-reveal">
		    	<span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i></span>
		    	By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users.
			</div>
			<span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
		 	<p><a href="#">Ver Archivo</a></p>
		 	by Daniel Torres
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
		var DocumentsRef = firebase.database().ref('Documentos/' + this.props.user.displayName);
		DocumentsRef.on('value', function(snapshot) {
			let temp = []
			for (let doc in snapshot.val()){
				temp.push(snapshot.val()[doc])
			}
			t.setState({docs : temp})
		});
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
			<div className="container">

				<div className="row">
		          		<h6>Foros creados</h6>
		            	{
		            		this.state.posts.map( (doc) => (
		            			<NormalPost key={doc.downloadURL}/>
		            			)
 		            		)
		            	}
		          	</div>
		          	<div className="row">
		          		<h6>Foros de tus Archivos</h6>
		            	{
		            		this.state.docs.map( (doc) => (
		            			<NormalPost key={doc.downloadURL}/>
		            			)
 		            		)
		            	}
		          	</div>

			</div>
		)
	}




}


export default Posts ;