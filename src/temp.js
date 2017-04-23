import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route ,browserHistory,Switch,Redirect } from 'react-router-dom'
import firebase from './firebase'
import Navbar from './components/Navbar'

import Home from './routes/Home'
import Landing from './routes/Landing'
import Footer from './components/Footer.js'

class Recientes extends Component {
  render() {
    return(<h3><br/><br/>Estos son los archivos mas recientes</h3>)
    
  }
}

class NotFound extends Component{
  render() {
    return(<h3><br/><br/><br/>Lo siento no se encontro esa pagina</h3>)
  }
}

class NewMensajes extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.state = {
      destino:"",
      icon :"clear"
    }
  }
  
  handleChange(e) {
    var temp = this;
    firebase.database().ref('/Usuarios/' + e.target.value).once('value').then(function(snapshot) {
      if(snapshot.val().username)
        temp.setState({icon: "done"});
    }).catch((error) => {
      temp.setState({icon: "clear"});
    })
    this.setState({destino: e.target.value});

  }
  handleSubmit(e) {
        e.preventDefault();
        console.log(ReactDOM.findDOMNode(this.refs.destino).value)
        console.log(ReactDOM.findDOMNode(this.refs.tema).value)
        console.log(ReactDOM.findDOMNode(this.refs.contenido).value)

        var key = firebase.database().ref('Conversaciones/' ).push({
          tema : ReactDOM.findDOMNode(this.refs.tema).value,
          destino : ReactDOM.findDOMNode(this.refs.destino).value, 
          remitente : this.props.user.displayName
        }).key

        var fecha=new Date()
        firebase.database().ref('Conversaciones/' + key + '/mensajes/' ).push({
          usuario : this.props.user.displayName,
          contenido : ReactDOM.findDOMNode(this.refs.contenido).value,
          fecha : fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"+ fecha.getMinutes()
        })

        firebase.database().ref('Usuarios/' + this.props.user.displayName + '/conversaciones/' + key + '/').set({
         tema:ReactDOM.findDOMNode(this.refs.tema).value
        })

        firebase.database().ref('Usuarios/' + ReactDOM.findDOMNode(this.refs.destino).value + '/conversaciones/' + key + '/').set({
         tema:ReactDOM.findDOMNode(this.refs.tema).value
        })
  }
  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Usuario destino</label>
            <input onChange={this.handleChange} value={this.state.destino} ref="destino"/>
            <i className="material-icons">{this.state.icon}</i>
            <label>Tema</label>
            <input ref="tema"/>
            <label>Mensaje</label>
            <textarea cols={30} rows={30} ref="contenido"></textarea>
            <button>Nuevo mensaje</button>
          </form>
        </div>
      )
  }
}

class ImgItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto : ""
    }
  }
  componentDidMount() {
    //console.log(this.props.id)
    let t = this
    var usuario = firebase.database().ref('Usuarios/' + this.props.id +'/' );
    usuario.on('value', function(snapshot) {
      t.setState({foto : snapshot.val().foto })
    });

  }

  render() {
    return(
        <div>
          <img  alt="" className="circle rigth" width={50} height={50} src={this.state.foto} />
          <i>{this.props.id}</i>
        </div>

      )

  }
}

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destino: "",
      tema : "",
      ultimo : "",
      fecha : ""
    }
  }
  componentDidMount() {
    let t = this
    var datosConversacion = firebase.database().ref('Conversaciones/' + t.props.item.key +'/' );
    datosConversacion.on('value', function(snapshot) {
      let temp = {
        destino: "",
        tema : "",
        ultimo : "",
        fecha : "",
        foto : ""
      }
      temp.tema = snapshot.val().tema
      var cont = 0
      for (var msn in snapshot.val().mensajes){
        if (cont === 0){
          temp.ultimo = snapshot.val().mensajes[msn].contenido
          temp.fecha = snapshot.val().mensajes[msn].fecha
        }
        cont++
        if(snapshot.val().destino !==t.props.user)
          temp.destino = snapshot.val().destino
        if(snapshot.val().remitente !== t.props.user)
          temp.destino = snapshot.val().remitente
      }
      t.setState(temp)
    });

  }
  render() {
      return(
          <li>
            <ImgItemList key={this.state.destino} id={this.state.destino}/>
            Tema :<strong>{this.state.tema}</strong>
            <p>Ultimo mensaje: {this.state.ultimo}</p>
            fecha: {this.state.fecha}
          </li>   
      )
  
  }
}

class Mensajes extends Component {
  constructor(props) {
    super(props);
    this.state= {
      conversaciones :[]
    }
  }
  componentDidMount() {
    let t = this;
    var conversaciones = firebase.database().ref('Usuarios/' + this.props.user.displayName+ '/conversaciones');
    conversaciones.on('value', function(snapshot) {
        
        var temp =[]
        for (var a in snapshot.val()){
          temp.push({key: a, tema: snapshot.val()[a].tema })
        }
      t.setState({conversaciones : temp})
    });
  }
  render() {
    return (
        <ul>
          {this.state.conversaciones.map(item => (
              <ItemList key={item.key} item={item} user={this.props.user.displayName}/>
            ))}
          
        </ul>
      )
  }
}

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
          foto: result.user.photoURL,
          conversaciones : "no ok"
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
    <Router history={browserHistory}>
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

              <Route exact path="/home" render={() => (
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
          <Router notFoundComponent={NotFound}/>
           </Switch>
        </div>
        <Footer />
     </div>
    </Router>
    );
  }
}
export default App;
