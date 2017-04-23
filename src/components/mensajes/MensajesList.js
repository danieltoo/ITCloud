import React, { Component } from 'react'
import firebase from '../../firebase'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ItemList from './ItemList'
import Conversacion from './Conversacion'

class MensajesList extends Component {
  constructor(props) {
    super(props);
    this.state= {
      conversaciones :[],
      conver : ""
    }
  }
  componentWillMount() {
    let t = this;
    var conversaciones = firebase.database().ref('Usuarios/' + this.props.user.displayName+ '/conversaciones');
    conversaciones.on('value', function(snapshot) {
        
        var temp =[]
        for (var a in snapshot.val()){
          temp.push({key: a, tema: snapshot.val()[a].tema })
        }
      t.setState({conversaciones : temp})
    });
    return ;
  }
 

  render() {
    return (
      <Router>
        <div className="row">
          <div className="col s12 m4 l4" >
            <ul className="collection section " style={{overflow: "scroll" ,  height : "450px"}}>
              {this.state.conversaciones.reverse().map(item => (
                  <ItemList key={item.key}  item={item} user={this.props.user.displayName}  />
                ))}
            </ul>
          </div>
          <div className="col s12 m8 l8">
            <Route path='/mensajes/:user/:id' user={this.props.user} component={Conversacion} />
          </div>
        </div>
      </Router>
      )
  }
}

export default MensajesList;