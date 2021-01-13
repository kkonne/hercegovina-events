const firebaseDatabase = firebase.database();
const dbUsersRef = firebaseDatabase.ref('users');
const storage = firebase.storage();
const storageRef = storage.ref();



let logout = () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "./index.html"
    }).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        window.alert(errorCode + ": " + errorMessage);
    });
};


const setupUI = (user) => {
  
    const loggedOutLinks = document.querySelectorAll('.logged-out');
    const loggedInLinks = document.querySelectorAll('.logged-in');
    const loggedInAsAdminLinks = document.querySelectorAll('.logged-in-as-admin');
    const loggedInAsModeratorLinks = document.querySelectorAll('.logged-in-as-moderator');
    const all = document.querySelectorAll("body");
    
    if(user){
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        document.getElementById('username').innerHTML = user.displayName;
        document.querySelector("#profilePhoto").src = user.photoURL;
        document.getElementById("profilePhoto").style.display = "block";
        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var tipKorisnika = snapshot.val().tipKorisnika;
        if(tipKorisnika == 99){
            loggedInAsAdminLinks.forEach(item => item.style.display = 'block');
            loggedInAsModeratorLinks.forEach(item => item.style.display = 'block');
        }
        if(tipKorisnika == 10){
            loggedInAsModeratorLinks.forEach(item => item.style.display = 'block');
        }
        all.forEach(item => item.style.display = 'block');
});

    }else{
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        all.forEach(item => item.style.display = 'block');
       
       
    }
}
