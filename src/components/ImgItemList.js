import React, { Component } from 'react'
import firebase from '../firebase'
import { Preloader} from  'react-materialize'
class ImgItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto : null
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

  showData () {
    return (<img  alt="" className="circle rigth" width={50} height={50} src={this.state.foto} />)
  }
  preload () {
    return(<Preloader size='small'/>)
  }

  render() {
    return(
        <span>
          {this.state.foto ? this.showData() : this.preload() }
        </span>

      )

  }
}
export default ImgItemList;