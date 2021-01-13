const addModerator = document.getElementById("addModerator");
const deleteModerator = document.getElementById("deleteModerator");
const showTable = document.getElementById("showTable");
const showUsers = document.getElementById("showUsers");
const showModerators = document.getElementById("showModerators");
const query = firebase.database().ref("users");
const all = document.querySelectorAll("body");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
      var tipKorisnika = snapshot.val().tipKorisnika;
      if(tipKorisnika == 99){
        all.forEach(item => item.style.display = 'block');
      }else{
        window.location = "./404.html";
      }
});
      
  } else {
      window.location = "./404.html";
  }
});

addModerator.addEventListener('click',function(){

        let emailInput = document.getElementById("addModeratorEmail").value;
        var query = firebase.database().ref("users")
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

              var email = childSnapshot.child("email").val();
              var userId= childSnapshot.child("uid").val();
              var username = childSnapshot.child("username").val();
            
              if(emailInput){
                var tipKorisnika = childSnapshot.child("tipKorisnika").val();
                if(emailInput == email){ 
              
                switch(tipKorisnika) {
                    case 10:
                        emailInput = null;
                        document.getElementById("addModeratorEmail").value = null;
                        alert(email+" je već moderator");
                        break;
                    case 99:
                        emailInput = null;
                        document.getElementById("addModeratorEmail").value = null;
                        alert(email+" je admin i ne možete mu mijenjati vrijednosti");
                        
                        break;
                    case 0:
                        emailInput = null;
                        document.getElementById("addModeratorEmail").value = null;
                        firebase.database().ref('users/'+userId).set({
                            email:email,
                            tipKorisnika:10,
                            uid:userId,
                            username:username  
                        })
                  
                        
                        alert("Uspješno dodan moderator na "+email);
                        break;
                        }   
                    }
                }
              
          });
        });


    

function errData(err){
    console.log(err);
}

})


deleteModerator.addEventListener('click',function(){

    let emailInput = document.getElementById("addModeratorEmail").value;
    var query = firebase.database().ref("users")
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {

          var email = childSnapshot.child("email").val();
          var userId= childSnapshot.child("uid").val();
          var username = childSnapshot.child("username").val();
        
          if(emailInput){
            var tipKorisnika = childSnapshot.child("tipKorisnika").val();
            if(emailInput == email){ 
          
            switch(tipKorisnika) {
                case 0:
                    emailInput = null;
                    document.getElementById("addModeratorEmail").value = null;
                    alert(email+" nije moderator");
                    break;
                case 99:
                    emailInput = null;
                    document.getElementById("addModeratorEmail").value = null;
                    alert(email+" je admin i ne možete mu mijenjati vrijednosti");
                    
                    break;
                case 10:
                    emailInput = null;
                    document.getElementById("addModeratorEmail").value = null;
                    firebase.database().ref('users/'+userId).set({
                        email:email,
                        tipKorisnika:0,
                        uid:userId,
                        username:username  
                    })
              
                    
                    alert("Uspješno izbrisan moderator na "+email);
                    break;
                    }   
                }
            }
          
      });
    });




function errData(err){
console.log(err);
}

})




query.on("value",snapshot => {
    var myTable = "<table border='1' width='100%'><tr>";
    myTable += "<th align='center'>" + "Ime"+ "</th>";
    myTable += "<th align='center'>" + "Email"+ "</th>";
    myTable += "<th align='center'>" + "Tip korisnika"+ "</th>";
    myTable += "</tr>";

    var myTable1 = "<table border='1' width='100%'><tr>";
    myTable1 += "<th align='center'>" + "Ime"+ "</th>";
    myTable1 += "<th align='center'>" + "Email"+ "</th>";
    myTable1 += "</tr>";

    var myTable2 = "<table border='1' width='100%'><tr>";
    myTable2 += "<th align='center'>" + "Ime"+ "</th>";
    myTable2 += "<th align='center'>" + "Email"+ "</th>";
    myTable2 += "</tr>";

    snapshot.forEach(function(childSnapshot) {

      var email = childSnapshot.child("email").val();
      var username = childSnapshot.child("username").val();
      var tipKorisnika = childSnapshot.child("tipKorisnika").val();
      var userId = childSnapshot.child("uid").val();
      myTable += "<td align='center'>" + username +"</td>";
      myTable += "<td align='center'>" + email +"</td>";
      if(tipKorisnika == 0){
        myTable += `<td align='center'>` + "Korisnik" +"</td>";
      }
      if(tipKorisnika == 10){
        myTable += `<td align='center'>` + "Moderator" +"</td>";
      }
      if(tipKorisnika == 99){
        myTable += `<td align='center'>` + "Admin" +"</td>";
      }

      myTable += "</tr>";
      
      if(tipKorisnika == 0){
        myTable1 += "<td align='center'>" + username +"</td>";
        myTable1 += "<td align='center'>" + email +"</td>";
        myTable1 += "</tr>";
      }

      if(tipKorisnika == 10){
        myTable2 += "<td align='center'>" + username +"</td>";
        myTable2 += "<td align='center'>" + email +"</td>";
        myTable2 += "</tr>";
      }
      });
      myTable += "</tr></table>";
      myTable1 += "</tr></table>";
      myTable2 += "</tr></table>";

      document.getElementById("outputDiv").innerHTML = myTable;
      document.getElementById("outputDivUser").innerHTML = myTable1;
      document.getElementById("outputDivModerator").innerHTML = myTable2;

      showTable.addEventListener('click',function(){
        document.getElementById("outputDiv").style.display = "block";
        document.getElementById("outputDivUser").style.display = "none";
        document.getElementById("outputDivModerator").style.display = "none";
    });

    showUsers.addEventListener('click',function(){
        document.getElementById("outputDiv").style.display = "none";
        document.getElementById("outputDivUser").style.display = "block";
        document.getElementById("outputDivModerator").style.display = "none";
    });

    showModerators.addEventListener('click',function(){
        document.getElementById("outputDiv").style.display = "none";
        document.getElementById("outputDivUser").style.display = "none";
        document.getElementById("outputDivModerator").style.display = "block";
    });
})

