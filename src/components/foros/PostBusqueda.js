import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import NormalTargetPost from './NormalTargetPost.js'
import DocTargetPost from './DocTargetPost.js'
import firebase from '../../firebase.js'

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
    	let artRel = firebase.database().ref('Foros/');
		artRel.on('value', function(snapshot) {
			let tempDocs = []
			let tempPosts = []
			for (let art in snapshot.val()){
				let artRelin = firebase.database().ref(`${snapshot.val()[art].tipo}/${snapshot.val()[art].usuario}/${art}`);
				artRelin.on('value', function(snap) {
					let coincide = false
					let temas = snap.val().temas
					if (temas){
						for (let cnt = 0 ; cnt < temas.length ; cnt++){
							if (temas[cnt].includes(search))
								coincide= true
						}
							
					}
						
					 if (
					 	snap.val().titulo.includes(search) ||
					 	snap.val().descripcion.includes(search) ||
					 	coincide 
					 	 ){

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

export default PostBusqueda;