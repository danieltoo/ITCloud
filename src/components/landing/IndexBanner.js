import React from 'react';

class IndexBanner extends React.Component {
  

  render() {
    return (
      <div className="parallax-container" style={{height:"650"}}>
        <div className="section no-pad-bot">
          <div className="container">
            <br /><br /><br /><br /><br /><br /><br />
            <h3 className="header center text-teal text-lighten-5">ITCloud Platform</h3>
            <div className="row center">
              <h5 className="header col s12 light">
                “Plataforma de compartición de archivos académicos en dispositivos móviles”
              </h5>
              <h6>DESARROLLADO EN:
                <strong>
                   <br/> INSTITUTO TECNOLÓGICO DE CUAUTLA 
                </strong>
              </h6>
            </div>
            <div className="row center">
              <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light red  darken-1">Descargar App <i className="material-icons left">file_download</i></a>
            </div>
          </div>
        </div>
        <div className="parallax"><img src={this.props.fondo} alt="Unsplashed background img 1" /></div>
      </div>
      );
  }
}

export default IndexBanner;