 import * as firebase from 'firebase';
 
 var config = {
    apiKey: "AIzaSyDZDGAPsn0gf5EJbuAYuMl09HZeHNbhwiE",
    authDomain: "itcloudmx.firebaseapp.com",
    databaseURL: "https://itcloudmx.firebaseio.com",
    projectId: "itcloudmx",
    storageBucket: "itcloudmx.appspot.com",
    messagingSenderId: "36102136598"
  };
  firebase.initializeApp(config);

  export default firebase;

