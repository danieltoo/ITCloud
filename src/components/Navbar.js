import React from 'react'
import { NavLink  } from 'react-router-dom'

import Side from './Side.js'
import NavMovil from './NavMovil.js'
import FloatButton from './FloatButton.js'

class Navbar extends React.Component {
  renderUserData () {
    return (
      <header >
          <nav className="nav-extended green darken-4 z-depth-3">
            <div className="nav-wrapper container">
              <NavLink id="logo-container" to="/home" className="brand-logo">
                <img  alt="" src="/assets/img/logoITCLOUDB.png" width={40} height={60} style={{paddingTop : "10px",paddingBottom:"10px"}} />
              </NavLink>
              <ul className="right hide-on-med-and-down "> 
                <li>
                  <NavLink to="/archivos"><i className="material-icons left">cloud</i> Archivos</NavLink>
                </li>
                <li>
                  <NavLink to="/mensajes"> <i className="material-icons left">question_answer</i>Mensajes</NavLink>
                </li>
                <li>
                  <NavLink to="/posts">
                   <i className="material-icons left">supervisor_account</i> Foros
                  </NavLink>
                </li>
                <li className="text-center hidden-sm">
                  <img  alt="" className="circle rigth" width={40} height={60} src={this.props.user.photoURL} style={{paddingTop : "10px",paddingBottom:"10px"}} />
                </li>
                <li className="text-center">
                    <Side user={this.props.user} onLogout={this.props.onLogout}/>
                </li>
                
              </ul>
              <NavMovil user={this.props.user} onLogout={this.props.onLogout}/>
            </div>
            <div className="nav-content hide-on-large-only black">
              <ul className="tabs">
                <li className="tab">
                  <NavLink to="/archivos" className="green-text text-darken-4 active">
                    <i className="material-icons">cloud</i>
                  </NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/mensajes" className="green-text text-darken-4">
                   <i className="material-icons">question_answer</i>
                  </NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/posts" className="green-text text-darken-4">
                   <i className="material-icons">supervisor_account</i>
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