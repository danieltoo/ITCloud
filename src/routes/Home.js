import React from 'react';




class Home extends React.Component {
	render() {
		
		return (
			<div className="">
        <div className="section">
          <div className="row">
            <div className="col l12 m12 s12 center-align">
              <div className="center" >
                <br/>
                <img className="circle" style={{width: "100px", heigth:"100px"}} src={this.props.user.photoURL} alt=""/>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col s12 m4 card">
              <div className="icon-block center">
              <i className="medium material-icons">question_answer</i>
                <h5 className="center">Envia y recibe mensajes</h5>
                <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
              </div>
            </div>
            <div className="col s12 m4 card">
              <div className="icon-block center">
                <i className="medium material-icons">cloud</i>

                <h5 className="center">Almacena y comparte tus archivos</h5>
                <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
              </div>
            </div>
            <div className="col s12 m4 card">
              <div className="icon-block center">
              <i className="medium material-icons">supervisor_account</i>
                <h5 className="center">Crea foros y comenta </h5>
                <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
			)
	}
}




export default Home;