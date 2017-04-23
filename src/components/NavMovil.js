import React from 'react'
import { SideNav , SideNavItem ,Icon} from 'react-materialize' 
import { NavLink  } from 'react-router-dom'

class NavMovil extends React.Component{
  render() {
    return(
        <SideNav
	          trigger={<a className="hide-on-large-only"><i className="material-icons">menu</i></a>}
	          options={{ closeOnClick: true }}
	          >
	          <SideNavItem userView 
	            user={{
	    		  background: '/assets/img/default_cover_photo_3_google_plus.jpg' ,
	              image: this.props.user.photoURL,
	              name: this.props.user.displayName,
	              email: this.props.user.email
	            }}
	          />
	          	<li>
			        <NavLink to="/recientes"> 
		          		<Icon>schedule</Icon> Recientes
		          	</NavLink>
	          	</li>
	          	<li>
		          	<NavLink to="/sugeridos">
		          		<Icon>thumb_up</Icon>
		                Sugeridos
		            </NavLink>
	            </li>
	          	<SideNavItem divider />
					<SideNavItem subheader>Mi Cuenta</SideNavItem>
				<li>
			        <NavLink to="/archivos" >
			          	<Icon>cloud</Icon>Mis Archivos
			        </NavLink>
		        </li>
		        <li>
			        <NavLink to="/mensajes" >
			          	<Icon>question_answer</Icon>Mensajes
			        </NavLink>
		        </li>
		        <li>
			        <NavLink to="/foros" >
			          	<Icon>supervisor_account</Icon>Foros
			        </NavLink>
		        </li>
		        <li>
			        <NavLink to="/" onClick={this.props.onLogout}>
			          	<Icon>not_interested</Icon>Cerrar Sesión
			      	</NavLink>
		      	</li>
	      </SideNav>
      )
  }
}

export default NavMovil;