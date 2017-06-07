import React,{Component} from 'react';

class ListaItems extends Component {
	constructor(props) {
        super(props);
         this.state={
          foro: null,
          item : null,
          favorite : false,
          likes:0
        }
      }
     componentWillMount() {
	 	this.setState({foro : this.props.foro,item:this.props.item})
	 	
	}
  	componentWillReceiveProps(nextProps) {
  		this.setState({foro : nextProps.foro,item:nextProps.item})
  	}
	render() {
        return (
            <li className="collection-item avatar right-align"> 
                <img  src={this.state.item.photoURL} style={{width:40, height:40 }}  alt="" className="circle"/>
                <strong className="title green-text text-darken-4">{this.state.item.user}</strong>
                <p>{this.state.item.text}<br/><span className="blue-text">{this.state.item.date}</span></p> 
            </li>
        )
    } 
}


export default ListaItems;