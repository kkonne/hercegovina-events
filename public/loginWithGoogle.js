function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(()=>{
    window.location.assign = "./profile.html"
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref("users").once("value").then(function(snapshot){
          var check = snapshot.hasChild(user.uid)
          if(check == true){
            console.log("ima");
            window.location = "./index.html"
          }else{
            console.log("nema")
            firebaseDatabase.ref('users/' + user.uid).set({
              email: user.email,  
              uid : user.uid,
              username: user.displayName,
              tipKorisnika:0,
            })  
            window.location = "./index.html"    
          }
          window.location = "./index.html"
        });    
      }
  })
  }).catch(error =>{
      console.log(error)
  })
}

