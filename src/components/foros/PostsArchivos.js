import React,{Component} from 'react';
import firebase from '../../firebase.js'

import DocTargetPost from './DocTargetPost.js'

export default class PostsArchivos extends Component{
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
				let datos = {
					descripcion: snapshot.val()[doc].descripcion,
					fecha: snapshot.val()[doc].fecha,
					img: snapshot.val()[doc].img,
					titulo: snapshot.val()[doc].titulo,
					temas: snapshot.val()[doc].temas,
					usuario: snapshot.val()[doc].usuario,
					contentType: snapshot.val()[doc].contentType,
					nombre: snapshot.val()[doc].nombre,
					downloadURL: snapshot.val()[doc].downloadURL,
					key : doc
				}
				temp.push(datos)
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
				let datos = {
					descripcion: snapshot.val()[doc].descripcion,
					fecha: snapshot.val()[doc].fecha,
					img: snapshot.val()[doc].img,
					titulo: snapshot.val()[doc].titulo,
					temas: snapshot.val()[doc].temas,
					usuario: snapshot.val()[doc].usuario,
					nombre: snapshot.val()[doc].nombre,
					downloadURL: snapshot.val()[doc].downloadURL,
					key : doc
				}
				temp.push(datos)
			}
			t.setState({docs : temp})
		});

	}
	render() {
		return(
			<div className="container">
				<div className="row ">
	           		{
	           			this.state.docs.map( (doc) => (
	           				<DocTargetPost key={doc.key} doc={doc}/>
	          			))
	           		}
	          	</div>
	        </div>
			)
	}
}