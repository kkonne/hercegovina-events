
let login = () => {
    
    let userEmail = document.getElementById("loginEmailInput").value;
    let userPassword = document.getElementById("loginPasswordInput").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((user) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                window.location = "./index.html";
            }
        });
    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        window.alert(errorCode + ": " + errorMessage);
        // ...
        
    })
};



