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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      topics : [],
      file : null,
      unploadValue:0
    }
   
  }
  handleSubmit(e) {
        e.preventDefault();
        let file = this.state.file
        let storageRef = firebase.storage().ref('Documentos/'+this.props.user.displayName+'/'+file.name)
        let task = storageRef.put(file)

        var URL ="" 
        var content="" 
        var name=""

        task.on('state_changed', (snapshot) => {
         let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100

         this.setState({
           unploadValue: Math.round(percentage)
         })

        }, (error) => {
         this.setState({
            message:`ha ocurridoun error ${error.message}`
          })
        }, () => {
          URL = task.snapshot.downloadURL
          content = task.snapshot.metadata.contentType
          name = task.snapshot.metadata.name
          var fecha=new Date()

          firebase.database().ref('Documentos/'+this.props.user.displayName).push({
            titulo : ReactDOM.findDOMNode(this.refs.titulo).value,
            nombre  : name ,
            usuario : this.props.user.displayName, 
            downloadURL : URL,
            temas : this.state.topics,
            contentType : content,
            fecha : fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"+ fecha.getMinutes()

          })

          this.setState({
            message:"Archivo Subido"
          })

        })

  }
  handleOnChange (event){
      let file = event.target.files[0]
      this.setState({file : file})
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
                  <input id="icon_prefix2" ref="titulo" required="required" type="text" className="validate" />
                  <label htmlFor="icon_prefix2">Titulo</label>
                </div>
              </Row>
              <Row>
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>File</span>
                      <input type="file" ref="file"  onChange={this.handleOnChange.bind(this)} />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate"  type="text" />
                    </div>
                  </div>
              </Row>
              <Row>
                <div className="col s11">
                  <div className="progress center-align">
                    <div className="determinate" style={{width : this.state.unploadValue +"%"}} ></div>
                  </div>
                </div>
                {this.state.unploadValue}%
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
              <Row className="right-align">
                {this.state.message}
              </Row>
            </div> 
          </form>   
        </Modal>
      )
  }
}

export default NewFile ;