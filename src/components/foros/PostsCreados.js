import React,{Component} from 'react';
import firebase from '../../firebase.js'

import NormalTargetPost from './NormalTargetPost.js'

export default class PostsCreados extends Component{
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
				let datos = {
					descripcion: snapshot.val()[doc].descripcion,
					fecha: snapshot.val()[doc].fecha,
					img: snapshot.val()[doc].img,
					titulo: snapshot.val()[doc].titulo,
					temas: snapshot.val()[doc].temas,
					usuario: snapshot.val()[doc].usuario,
					key : doc
				}
				temp.push(datos)
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
				let datos = {
					descripcion: snapshot.val()[doc].descripcion,
					fecha: snapshot.val()[doc].fecha,
					img: snapshot.val()[doc].img,
					titulo: snapshot.val()[doc].titulo,
					temas: snapshot.val()[doc].temas,
					usuario: snapshot.val()[doc].usuario,
					key : doc
				}
				temp.push(datos)
			}
			t.setState({posts : temp})
		});

	}

	render() {
		return(
			<div className="container">
				<div className="row">
	            	{
	            		this.state.posts.map( (post) => (
	            			<NormalTargetPost key={post.key} post={post}/>
	            		))
	            	}
	          	</div>
	        </div>
			)
	}
}