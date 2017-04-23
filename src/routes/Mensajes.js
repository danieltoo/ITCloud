import React, { Component } from 'react'
import MensajesList from '../components/mensajes/MensajesList'

class Mensajes extends Component {
  render() {
    return (
        <div>
          <MensajesList user={this.props.user}/>
        </div>
      )
  }
}
export default Mensajes ;