import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from '../../firebase'
import { Icon,  Button, Row, Modal} from 'react-materialize'


class Chip extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this)
    
  }
  remove (){
    this.props.remove(this.props.topic)
  }
  render() {
    return ( 
        <div className="chip">
          {this.props.topic}
          <i className="close material-icons" onClick={this.remove}>close</i>
        </div>
      )
  } 
}

class NewForo extends Component {
  constructor(props) {
    super(props);
    this.addThisTopic = this.addThisTopic.bind(this)
    this.removeThisTopic = this.removeThisTopic.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      topics : []
    }
   
  }

  handleSubmit(e) {
    e.preventDefault();
    var fecha=new Date()
    let t = this
    firebase.database().ref('Posts/'+this.props.user.displayName).push({
      titulo : ReactDOM.findDOMNode(this.refs.titulo).value,
      descripcion : ReactDOM.findDOMNode(this.refs.descripcion).value,
      usuario : this.props.user.displayName, 
      temas: t.state.topics,
      fecha : fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"+ fecha.getMinutes()
    })
        

  }

  addThisTopic(){
    let topic = "#" + ReactDOM.findDOMNode(this.refs.topics).value
    let existencia = false
    for (let cont = 0 ; cont < this.state.topics.length ; cont++) {
      if (this.state.topics[cont] === topic) {
        existencia = true
      }
    }
    if (existencia){
      console.error("Valor repetido")
    }else {
      this.setState(prevState => { 
        // eslint-disable-next-line 
        topics : prevState.topics.push(topic)
      })
    }
    ReactDOM.findDOMNode(this.refs.topics).value = ""
  }
  removeThisTopic(key){
    let temp = []
    for (let i = 0 ; i < this.state.topics.length-1 ; i++){
      if (this.state.topics[i] !== key ){
        temp.push(this.state.topics[i])
      }
    }
    console.log(temp)
    this.setState({
      topics : temp
    })
  }
  
  render() {
    
    return (
      
        <Modal
          actions={
            <div>
              
            </div>}
          trigger={
            <a className="btn-floating yellow">
              <i className="material-icons">format_quote</i>
            </a>
          }>
          <form onSubmit={this.handleSubmit} className="col s12">
            <div >
              <h6 className="center-align"><strong>Crear Post</strong></h6>
              <Row>
                <div className="input-field col s12">
                  <i className="material-icons prefix">format_quote</i>
                  <input id="icon_prefix2" ref="titulo" required="required" type="text" className="validate" />
                  <label htmlFor="icon_prefix2">Titulo</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s12">
                  <i className="material-icons prefix">mode_edit</i>
                  <textarea id="icon_prefix2" ref="descripcion" className="materialize-textarea"></textarea>
                  <label htmlFor="icon_prefix2">Descripción</label>
                </div>
              </Row>
              <Row>
                <div className="input-field col s10">
                  <i className="material-icons prefix">bookmark</i>
                  <input id="icon_prefix2" ref="topics" required="required" type="text" className="validate" />
                  <label htmlFor="icon_prefix2">#Temas</label>
                </div>
                <div className="col s2">
                  <a className="btn-floating" onClick={this.addThisTopic} >
                    <i className="large material-icons">add</i>
                  </a>
                </div>
              </Row>
              <Row>
                <div className="col s12">
                  {this.state.topics.map( topic => (
                      <Chip key={topic} topic={topic} remove={this.removeThisTopic.bind(this)}/>
                  ))}
                </div>
              </Row>
              
            </div> 
            <div>
              <Row className="right-align" >
                <Button waves='light' >Crear<Icon right>send</Icon></Button>
              </Row>
              
            </div>
            </form>  
        </Modal>
       
      )
  }
}

export default NewForo ;