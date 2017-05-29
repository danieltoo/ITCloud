import React,{Component} from 'react';
import logo from '../logo.svg'
import firebase from '../firebase.js'

class NormalPost extends Component {
	render() {
		return (
	    <div className="card col s12 m3 l4 z-depth-3">
		    <div className="card-image waves-effect waves-block waves-light">
		      <img className="activator" src={this.props.doc.img}/>
		    </div>
		    <div className="card-content">
		      <span className="card-title activator grey-text text-darken-4">{this.props.doc.titulo}<i className="material-icons right">more_vert</i></span>
		      <p><a href="#">Ver archivo</a></p>
		    </div>
		    <div className="card-reveal ">
		      <span className="card-title grey-text text-darken-4">{this.props.doc.titulo}<i className="material-icons right">close</i></span>
		      <p>{this.props.doc.descripcion} {this.props.doc.usuario}</p>
		    </div>
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
		          		<h5>Foros creados</h5>
		            	{
		            		this.state.posts.map( (doc) => (
		            			<NormalPost key={doc.img} doc={doc}/>
		            			)
 		            		)
		            	}
		          	</div>
		          	 {//<div className="row">
		          	// 	<h6>Foros de tus Archivos</h6>
		           //  	{
		           //  		this.state.docs.map( (doc) => (
		           //  			<NormalPost key={doc.downloadURL}/>
		           //  			)
 		          //   		)
		           //  	}
		          	// </div>
		          }

			</div>
		)
	}




}


export default Posts ;