import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from '../../firebase'
import { Icon,  Button, Row, Modal} from 'react-materialize'

class NewMensaje extends Component {
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
        ReactDOM.findDOMNode(this.refs.destino).value =""
        ReactDOM.findDOMNode(this.refs.tema).value=""
        ReactDOM.findDOMNode(this.refs.contenido).value=""
  }
  render() {
    return (
      
        <Modal
          fixedFooter
          actions={
              <Button waves='light' modal='close' flat><Icon right>clear</Icon></Button>
          }
          trigger={
            <a className="btn-floating red"><i className="material-icons">message</i></a>
          }>
          <form onSubmit={this.handleSubmit} className="col s12">
          
            <div >
              <h6 className="center-align"><strong>Nueva Conversación</strong></h6>
              <Row>
                <div className="input-field col s6">
                  <i className="material-icons prefix">{this.state.icon}</i>
                  <input id="icon_prefix5" onChange={this.handleChange} value={this.state.destino} ref="destino" required="required" type="text" className="validate" />
                  <label htmlFor="icon_prefix5">Usuario Destino</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s12">
                  <i className="material-icons prefix">format_quote</i>
                  <input id="icon_prefix2" ref="tema" required="required" type="text" className="validate" />
                  <label htmlFor="icon_prefix2">Tema</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s8">
                  <i className="material-icons prefix">message</i>
                  <textarea id="icon_prefix4" ref="contenido" required="required" className="materialize-textarea validate" />
                  <label htmlFor="icon_prefix4">Mensaje</label>
                </div>
                <Button waves='light' >Comenzar<Icon right>send</Icon></Button>
              </Row>
            </div> 
          </form>   
          </Modal>

        
        
      )
  }
}

export default NewMensaje ;