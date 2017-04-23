import React from 'react'
import { NavLink  } from 'react-router-dom'

import NewMensaje from './mensajes/NewMensaje.js'
import Side from './Side.js'
import NavMovil from './NavMovil.js'

class Navbar extends React.Component {
  
  renderUserData () {
    return (
      <header >
          <nav className="top-nav green darken-4">
            <div className="nav-wrapper ">
              <a id="logo-container" href="#" className="brand-logo">
                <img  alt="" src="/assets/img/logoITCLOUDB.png" width={50} height={50}  />
              </a>
              <ul className="right hide-on-med-and-down "> 
                <li>
                  <NavLink to="/"><i className="material-icons left">cloud</i> Mi Espacio</NavLink>
                </li>
                <li>
                  <NavLink to="/recientes"> <i className="material-icons left">schedule</i>Recientes</NavLink>
                </li>
                <li>
                  <NavLink to="/sugeridos">
                   <i className="material-icons left">thumb_up</i> Sugeridos
                  </NavLink>
                </li>
                <li className="text-center hidden-sm">
                  <img  alt="" className="circle rigth" width={50} height={50} src={this.props.user.photoURL}  />
                </li>
                <li className="text-center">
                    <Side user={this.props.user} onLogout={this.props.onLogout}/>
                </li>
                
              </ul>
              <NavMovil user={this.props.user} onLogout={this.props.onLogout}/>         
            </div>
          </nav>

          <div className="fixed-action-btn horizontal click-to-toggle">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">mode_edit</i>
            </a>
            <ul>
              <li>
                <NewMensaje user={this.props.user}/>
                
              </li>
              <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
              <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
              <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
            </ul>
          </div>
        </header>
    )
  }

  renderLoginButton () {
    
    return (
       <header >
          <nav className="top-nav green darken-4">
            <div className="nav-wrapper container">
              <a id="logo-container" href="#" className="brand-logo">
                <img  alt="" src="/assets/img/logoITCLOUDB.png" width="50" height="50"  />
              </a>
              <a href="#" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down ">
                <li>
                  <a href="#">
                    <i className="material-icons left">
                      home
                    </i>
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" > 
                    <i className="material-icons left">
                      file_download
                    </i>
                    Descargar App
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.props.onAuth} >
                    <i className="material-icons left">
                      account_circle
                    </i>
                    Ingresar
                  </a>
                </li>
              </ul>
              
            </div>

            <ul className="side-nav" id="mobile-demo">
            <li> 
              <div className="userView">
                  <div className="background blue">
                    <img  alt="" src='/assets/img/default_cover_photo_3_google_plus.jpg' 
                      style={{width:300, height:100}}
                    />
                  </div>
                </div>
            </li>
              <li>
                  <a href="#" >
                    <i className="material-icons left">
                      home
                    </i>
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" > 
                    <i className="material-icons left">
                      file_download
                    </i>
                    Descargar App
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.props.onAuth} >
                    <i className="material-icons left">
                      account_circle
                    </i>
                    Ingresar
                  </a>
                </li>
            </ul>
          </nav>
        </header>
    )
  }

  render(){
    return (
      <div>
        {this.props.user ? this.renderUserData() : this.renderLoginButton()}      
      </div>
    )
  }
}



export default Navbar;