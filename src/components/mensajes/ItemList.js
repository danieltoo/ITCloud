import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'

import ImgItemList from '../ImgItemList'

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
        if (cont === Object.keys(snapshot.val().mensajes).length-1){
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
          <li className="collection-item avatar ">
            <ImgItemList key={this.state.destino} id={this.state.destino}/>
            <strong className="title green-text text-darken-4">Tema : {this.state.tema}</strong>
            <p>{this.state.destino}<br/>
              Ultimo mensaje: {this.state.ultimo} {this.state.fecha}<br/>
            </p>
            <Link to={`/mensajes/${this.props.user}/${this.props.item.key}`}  className="secondary-content">
              <i className="material-icons green-text text-darken-4">send</i>
            </Link>
          </li>   
      )
  
  }
}

export default ItemList;