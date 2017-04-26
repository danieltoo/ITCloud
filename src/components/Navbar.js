import React from 'react'
import { NavLink  } from 'react-router-dom'

import Side from './Side.js'
import NavMovil from './NavMovil.js'
import FloatButton from './FloatButton.js'

class Navbar extends React.Component {
  renderUserData () {
    return (
      <header >
          <nav className="nav-extended green darken-4">
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
            <div className="nav-content">
              <ul className="tabs">
                <li className="tab">
                  <NavLink to="/home" activeClassName="active" className="green-text text-darken-4"><i className="material-icons ">cloud</i> </NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/recientes" activeClassName="active" className="green-text text-darken-4"> <i className="material-icons ">schedule</i></NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/sugeridos" activeClassName="active" className="green-text text-darken-4">
                   <i className="material-icons ">thumb_up</i> 
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <FloatButton user={this.props.user}/>
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