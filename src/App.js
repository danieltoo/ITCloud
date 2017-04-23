/*
Import modules
*/
import React, { Component } from 'react'
import { BrowserRouter as Router, Route ,browerhHistory,Switch,Redirect} from 'react-router-dom'
import firebase from './firebase'
 
/*
Import Files
*/
 // Componentes globales
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//Rutas
import Landing from './routes/Landing'
import Home from './routes/Home'
import Mensajes from './routes/Mensajes'
import Recientes from './routes/Recientes'
import NotFound from './routes/404'


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: null
    }
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }
  
  handleAuth(){

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) =>{
        console.log(`${result.user.email} ha iniciado sesion`)
        console.log(`${result.user.displayName} ha iniciado sesion`)
        firebase.database().ref('Usuarios/' + result.user.displayName).update({
          username: result.user.displayName,
          email: result.user.email,
          foto: result.user.photoURL
        })
      })
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))
  }

  handleAuthMovil(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))

  }

  
  handleLogout(){
    firebase.auth().signOut()
      .then(() =>{
       console.log('te has deslogeado')
       location.reload();
    })
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))
  }
 

  render() {
    return (
    <Router history={browerhHistory} >
      <div>
        <Navbar
          user={this.state.user}
          onAuth={this.handleAuth.bind(this)}
          onLogout={this.handleLogout.bind(this)}
          handleAuthMovil={this.handleAuthMovil.bind(this)}
         /> 
        <div>
          <Switch>
              <Route exact path="/" render={() => (
                this.state.user ? (
                  <Redirect to="/home"/>
                ) : (
                  <Landing />
                )
              )}/>

              <Route exact path="/home" data={this.state.user} render={() => (
                this.state.user ? (
                  <Home user={this.state.user} />
                ) : (
                  <Redirect to="/"/>
                )
              )}/>

              <Route exact path="/recientes" render={() => (
                this.state.user ? (
                  <Recientes />
                ) : (
                  <Redirect to="/"/>
                )
              )}/>
              <Route exact path="/mensajes" render={() => (
                this.state.user ? (
                  <Mensajes user={this.state.user}/>
                ) : (
                  <Redirect to="/"/>
                )
              )}/>
              

              <Route component={NotFound}/>
           </Switch>
        </div>
        
        <Footer />
     </div>
    </Router>
    );
  }
}

export default App;