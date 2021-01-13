let register = () => {
    let userPassword = document.getElementById("registerPasswordInput").value;
    let confirmPassword = document.getElementById("confirmRegisterPasswordInput").value;
    const userEmail = document.getElementById("registerEmailInput").value;
    const username = document.getElementById("registerNameInput").value;
   
        if(userPassword == confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function(){
                var user = firebase.auth().currentUser;
                    firebaseDatabase.ref('users/' + user.uid).set({
                        email: user.email,  
                        uid : user.uid,
                        username: username,
                        tipKorisnika:0,
                        
                })
                user.updateProfile({
                    displayName: username,
                    photoURL: "./defaultProfilePhoto.png"
        
                }).then(function(){
                    window.location = "./index.html";   
                })
                })
                .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                
                var errorMessage = error.message;
                window.alert(errorCode + ": " + errorMessage);
                // ...
            
    
            })
    
          
        }else{
            console.log("Ne podudaraju se lozinke")
        }

};

