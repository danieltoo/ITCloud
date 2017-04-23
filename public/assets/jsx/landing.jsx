var config = {
    apiKey: "AIzaSyDZDGAPsn0gf5EJbuAYuMl09HZeHNbhwiE",
    authDomain: "itcloudmx.firebaseapp.com",
    databaseURL: "https://itcloudmx.firebaseio.com",
    projectId: "itcloudmx",
    storageBucket: "itcloudmx.appspot.com",
    messagingSenderId: "36102136598"
};
firebase.initializeApp(config);


class Nav extends React.Component{
  constructor() {
    super();
    this.state={
      user: null
    }
    
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }
  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => { 
      	console.log(`${JSON.stringify(result.user)} ha iniciado sesion`)
      })
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))

  }
  handleLogout(){
    firebase.auth().signOut()
      .then(() => console.log('te has deslogeado'))
      .catch(error => console.error(`Error : ${error.code}: ${error.message}`))
  }

  render(){
    return(
      <span>
        <Header
          user={this.state.user}
          onAuth={this.handleAuth.bind(this)}
          onLogout={this.handleLogout.bind(this)}
        />
      </span>
      )
  }

}

  
