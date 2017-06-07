import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import firebase from '../../firebase.js'


class FormComentarios extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			foro :null,
			user:null
		}
	}
	componentDidMount() {
	    firebase.auth().onAuthStateChanged(user => {
	      this.setState({ user })
	    })
	  }

	componentWillMount() {
	 	this.setState({foro:this.props.foro})
	}
  	componentWillReceiveProps(nextProps) {
  		this.setState({foro:nextProps.foro})
  	}
	handleSubmit(e) {
        e.preventDefault();
        let id = Date.now()
        let mesajesDB = firebase.database().ref().child("Comentarios/"+this.state.foro+"/"+id)
        let t = this
        var fecha=new Date()
        var newItem = {
        	id: id,
          text: ReactDOM.findDOMNode(t.refs.mensajeInput).value,
          date : fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"+ fecha.getMinutes(),
          photoURL : this.state.user.photoURL,
          user : this.state.user.displayName
        };
        ReactDOM.findDOMNode(t.refs.mensajeInput).value=""
        mesajesDB.set(newItem)
    }
	render() {
		return(
			<div ><br/>
				<h4 className="flow-text green-text text-darken-4">Comentarios</h4>
				<form onSubmit={this.handleSubmit} className="row">
                <div className="col l9">
                  <input ref="mensajeInput" className="white" />
                </div>
                <div className="col l2 right-align">
                  <button className="btn red white-text"><i className="material-icons">send</i></button>
                </div>
              </form>
			</div>
			)
	}
} 


export default FormComentarios;