import React from 'react'
import { SideNav , SideNavItem, Icon} from 'react-materialize'
import { NavLink  } from 'react-router-dom'

class Side extends React.Component{
  render() {
    return(
        <SideNav 
	          trigger={<a><i className="material-icons">more_vert</i></a>}
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
		          	<NavLink to="/" onClick={this.props.onLogout} >
		          		<Icon>not_interested</Icon> Cerrar Sesión
		      		</NavLink>
	      		</li>
	      </SideNav>
      )
  }


}

export default Side;