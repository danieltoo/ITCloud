import React, { Component } from 'react'
import firebase from '../firebase'

class ImgItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto : ""
    }
  }
 componentDidMount() {
    let t = this
    var usuario = firebase.database().ref('Usuarios/' + this.props.id +'/' );
    usuario.on('value', function(snapshot) {
        t.setState({foto : snapshot.val().foto })
    });
    return;

  }

  render() {
    return(
        <div>
          <img  alt="" className="circle rigth" width={50} height={50} src={this.state.foto} />

          
        </div>

      )

  }
}
export default ImgItemList;