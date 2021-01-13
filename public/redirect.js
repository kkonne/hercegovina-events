const all = document.querySelectorAll("body");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var query = firebase.database().ref("users/"+user.uid)
            query.once("value")
              .then(function(snapshot) {
                if(user.photoURL != undefined && snapshot.child("tipKorisnika").val() != undefined){
                    window.location = "./404.html";
                }
            })
    }else{
        all.forEach(item => item.style.display = 'block');
    }
});
