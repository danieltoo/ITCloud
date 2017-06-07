import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from '../../firebase'
import { withRouter } from 'react-router'
import { Button, Icon, Row} from 'react-materialize'

import ImgItemList from '../ImgItemList.js'

class MensajeConver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cl : ""
    }
  }
  
  funcionCompara () {
    if (this.props.user === this.props.propietario) {
      return (
          <Row>
              <div className="col l9 left-align">
              <span className="title bold"></span>
                <p>
                  {this.props.contenido}
                  <br/>
                  <span className="blue-text">
                    {this.props.fecha}
                  </span>
                </p>
               </div>
               <div className="col l3 center"><br/>
                <ImgItemList id={this.props.user} />
              </div>

            </Row>
        )
    }else {
      return (
            <Row>
              <div className="col l3 center"><br/>
                <ImgItemList id={this.props.user} />
              </div>

              <div className="col l9 right-align">
              <span className="title bold"></span>
                <p>
                  {this.props.contenido}
                  <br/>
                  <span className="blue-text">
                    {this.props.fecha}
                  </span>
                </p>
               </div>

            </Row>
        
        )
    }
  }
  render() {
    return (
        <li className="collection rigth bold">
          {this.funcionCompara()}
        </li>
      )
  }
}

class MensajeForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    var fecha=new Date()
    firebase.database().ref('Conversaciones/' + this.props.conversacion + '/mensajes/' ).push({
      usuario : this.props.user,
      contenido : ReactDOM.findDOMNode(this.refs.contenido).value,
      fecha : fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"+ fecha.getMinutes()
    })
    ReactDOM.findDOMNode(this.refs.contenido).value=""
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <Row>
              <div className="input-field col s9">
                <textarea id="icon_prefix4" ref="contenido" required="required" className="materialize-textarea validate " />
                <label htmlFor="icon_prefix4">Mensaje</label>
              </div>
              <Button waves='light' >Enviar<Icon right>send</Icon></Button>
            </Row>
        </form>
      )
  }
}

class MensajesEnLista extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).scrollTop = 5000000
  }
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollTop = 5000000
  }
  render() {
    return(
        <ul className=" " style={{overflow: "scroll" ,  height : "460px"}}>
          {this.props.mensajes.map( mensage => (
            <MensajeConver key={mensage.id} propietario={this.props.propietario} user={mensage.item.usuario} contenido={mensage.item.contenido} fecha={mensage.item.fecha} />
          ))}
        </ul>  
      )
  }
}
class Conversacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : "",
      tema: "",
      destino : "",
      remitente : "",
      mensajes : [],
      propietario :""
    }
    
  }
  componentWillMount() {
    let t = this
    var datosConversacion = firebase.database().ref('Conversaciones/' + this.props.match.params.id +'/' );
    datosConversacion.on('value', function(snapshot) {
      let temp = []
      for ( let mensaje in snapshot.val().mensajes){
        temp.push({id : mensaje , item : snapshot.val().mensajes[mensaje]})
        
      }
      let newState = {
        id : t.props.match.params.id,
        tema: snapshot.val().tema,
        destino : snapshot.val().destino,
        remitente : snapshot.val().remitente,
        mensajes : temp,
        propietario : t.props.match.params.user
      }
      t.setState(newState)
    })
  }

  componentWillReceiveProps(nextProps) {
    let t = this
    
    var datosConversacion = firebase.database().ref('Conversaciones/' + nextProps.match.params.id +'/' );
    datosConversacion.on('value', function(snapshot) {
      let temp = []
      for ( let mensaje in snapshot.val().mensajes){
        temp.push({id : mensaje , item : snapshot.val().mensajes[mensaje]})
        
      }
      let newState = {
        id : nextProps.match.params.id,
        tema: snapshot.val().tema,
        destino : snapshot.val().destino,
        remitente : snapshot.val().remitente,
        mensajes : temp,
        propietario : nextProps.match.params.user
      }

      t.setState(newState)
    })
    
  }
  muestraMensajes(){
    return(
      <MensajesEnLista mensajes={this.state.mensajes} propietario={this.state.propietario} />
      )
  }
  noMuestraMensajes(){
    return(
        <div>No tienes mensajes</div>
      )
  }
  render() {
    return(
      <div className=""  >
        <h6 className="center-align green-text text-darken-4 "><br/><strong>{this.state.tema}</strong></h6>
        {this.state.mensajes ? this.muestraMensajes() : this.noMuestraMensajes()}
        <MensajeForm user={this.state.propietario} conversacion={this.state.id} />
      </div>
      )
  }
}


export default withRouter(Conversacion);