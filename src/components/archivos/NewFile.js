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

class NewFile extends Component {
  constructor(props) {
    super(props);
    this.addThisTopic = this.addThisTopic.bind(this)
    this.removeThisTopic = this.removeThisTopic.bind(this)
    this.state = {
      topics : []
    }
   
  }
  handleSubmit(e) {
        e.preventDefault();

  }
  addThisTopic(){
    let topic = "#" + ReactDOM.findDOMNode(this.refs.topics).value
    this.setState(prevState => { 
      topics : prevState.topics.push(topic)
    })
    ReactDOM.findDOMNode(this.refs.topics).value = ""
  }
  removeThisTopic(key){
    let temp = []
    for (let i = 0 ; i < this.state.topics.length-1 ; i++){
      if (this.state.topics[i] != key ){
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
          fixedFooter
          actions={
            <Button waves='light' modal='close' flat>
              <Icon right>clear</Icon>
            </Button>}
          trigger={
            <a className="btn-floating blue">
              <i className="material-icons">attach_file</i>
            </a>
          }>
          <form onSubmit={this.handleSubmit} className="col s12">
            <div >
              <h6 className="center-align"><strong>Subir Nuevo Archivo</strong></h6>
              <Row>
                <div className="input-field col s12">
                  <i className="material-icons prefix">format_quote</i>
                  <input id="icon_prefix2" ref="tema" required="required" type="text" className="validate" />
                  <label htmlFor="icon_prefix2">Titulo</label>
                </div>
              </Row>
              <Row>
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>File</span>
                      <input type="file" />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
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
              <Row className="right-align">
                <Button waves='light' >Comenzar<Icon right>send</Icon></Button>
              </Row>
            </div> 
          </form>   
        </Modal>
      )
  }
}

export default NewFile ;