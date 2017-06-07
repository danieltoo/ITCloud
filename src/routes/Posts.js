import React,{Component} from 'react';
import { BrowserRouter as Router, Route,NavLink, Redirect} from 'react-router-dom'
import PostsCreados from '../components/foros/PostsCreados.js'
import PostsArchivos from '../components/foros/PostsArchivos.js'
import PostBusqueda from '../components/foros/PostBusqueda.js'
import ForosArticulos from '../components/foros/ForosArticulos.js'
import ForosArticulosArchivo from '../components/foros/ForosArticulosArchivo.js'

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