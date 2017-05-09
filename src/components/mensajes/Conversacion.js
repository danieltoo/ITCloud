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
        <div className="card-panel  green lighten-5 black-text left-align">
          <Row>
             <div className=" col l11 s10">
              <p className="row" >
                {this.props.contenido}
              </p>
              {this.props.fecha}
             </div>
            <div className="col s2 l1" >
                <ImgItemList id={this.props.user} />
            </div> 
          </Row>
          
          </div>
        )
    }else {
      return (
          <div className="card-panel black-text  right-align">
            <Row>
               
              <div className="col s2 l1" >
                  <ImgItemList id={this.props.user} />
              </div> 
              <div className=" col l11 s10">
                <p className="row" >
                  {this.props.contenido}
                </p>
                {this.props.fecha}
               </div>
            </Row>
          
          </div>
        
        )
    }
  }
  render() {
    return (
        <li >
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
        <form onSubmit={this.handleSubmit} >
            <Row>
              <div className="input-field col s9">
                <i className="material-icons prefix">message</i>
                <textarea id="icon_prefix4" ref="contenido" required="required" className="materialize-textarea validate " />
                <label htmlFor="icon_prefix4">Mensaje</label>
              </div>
              <Button waves='light' >Enviar<Icon right>send</Icon></Button>
            </Row>
        </form>
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

  render() {
    return(
      <div className=""  >
        <h6 className="center-align"><br/><strong>{this.state.tema}</strong></h6>
        <ul className=" " style={{overflow: "scroll" ,  height : "250px"}}>
        {this.state.mensajes.map( mensage => (
          <MensajeConver key={mensage.id} propietario={this.state.propietario} user={mensage.item.usuario} contenido={mensage.item.contenido} fecha={mensage.item.fecha} />
        ))}
        </ul>
        <MensajeForm user={this.state.propietario} conversacion={this.state.id} />

      </div>
      )
  }
}


export default withRouter(Conversacion);