import React,{Component} from 'react';
import firebase from '../../firebase.js'
import ListaItems from './ListaItems.js'

export default class Lista extends Component {
	constructor(props) {
        super(props);
        this.state={
          items: []
        }
      }

      componentWillMount() {
		let mDB = firebase.database().ref().child("Comentarios/"+this.props.foro)
         mDB.on('value', snap => {
          let temp = []
        	for ( let i in snap.val()){
        		temp.push(snap.val()[i])
        	}
          this.setState({items: temp})
        })
	}
	componentDidMount() {
		let mDB = firebase.database().ref().child("Comentarios/"+this.props.foro)
         mDB.on('value', snap => {
          let temp = []
        	for ( let i in snap.val()){
        		temp.push(snap.val()[i])
        	}
          this.setState({items: temp})
        })
	}

  	componentWillReceiveProps(nextProps) {
		let mDB = firebase.database().ref().child("Comentarios/"+nextProps.foro)
        mDB.on('value', snap => {
        	let temp = []
        	for ( let i in snap.val()){
        		temp.push(snap.val()[i])
        	}
          this.setState({items: temp})
        })
  	}

	

	render() {
        return (
          <ul className="collection"  >
            {this.state.items.reverse().map(item => (
              <ListaItems key={item.id} foro={this.state.foro} item={item} />
            ))}
          </ul>
        );
      }
}