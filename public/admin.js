const showTable = document.getElementById("showTable");
const showUsers = document.getElementById("showUsers");
const showModerators = document.getElementById("showModerators");
const query = firebase.database().ref("users");
const db = firebase.database();
const all = document.querySelectorAll("body");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
      var tipKorisnika = snapshot.val().tipKorisnika;
      if (tipKorisnika == 99) {
        all.forEach(item => item.style.display = 'block');
      } else {
        window.location = "./404.html";
      }
    });

  } else {
    window.location = "./404.html";
  }
});

let adminPanelData = () => {
  query.once('value', (snap) => {
    let numOfUsers = snap.numChildren();

    document.getElementById("numOfUsers").innerHTML = numOfUsers;
  });

  db.ref("events").once('value', (snap) => {
    let numOfEvents = snap.numChildren();

    document.getElementById("numOfEvents").innerHTML = numOfEvents;
  });
};

let listUsers = () => {
  let query = firebase.database().ref("users");
  let allModerators = [];
  let allAdmins = [];
  let allUsers = [];
  query.on("value", snapshot => {
    snapshot.forEach((childSnapshot) => {

      childSnapshot.child("tipKorisnika").val() === 99 ?
        allAdmins.push(childSnapshot.val()) && allUsers.push(childSnapshot.val()) && allModerators.push(childSnapshot.val()) :
        (childSnapshot.child("tipKorisnika").val() === 10 ?
          allModerators.push(childSnapshot.val()) && allUsers.push(childSnapshot.val()) :
          allUsers.push(childSnapshot.val()));
    });
  });

  new Vue({
    el: "#listUsers",
    data: {
      users: allUsers,
    }
  });

  new Vue({
    el: "#listAdmins",
    data: {
      admins: allAdmins,
    }
  });

  new Vue({
    el: "#listModerators",
    data: {
      moderators: allModerators,
    }
  });
};

let listEvents = () => {
 
  let query = firebase.database().ref("events");
  let allEvents = [];
  query.on("value", snapshot => {
    refreshEventTable();
    snapshot.forEach((childSnapshot) => {
      allEvents.push(childSnapshot.val());
    });
  });
  
  new Vue({
    el: "#listEvents",
    data: {
      events: allEvents,
    },
    methods: {
      deleteEvent: function (event) {
       
        if(event){
            let query = firebase.database().ref("events");
          query.once("value")
            .then(function (snapshot) {
              snapshot.forEach((childSnapshot) => {
                let eventId = childSnapshot.child("eventId").val()
                if(eventId == event.target.id){
                  let eventsRef = firebase.database().ref('events/'+eventId);
                  let eventsImgRef = firebase.storage().ref("eventImages/"+eventId);
                  eventsRef.remove();
                  eventsImgRef.delete()
                }
              
              })
          })
        
      }
      },
      addTrending: function (event){
        if(event){
          let query = firebase.database().ref("events");
          query.once("value")
            .then(function (snapshot) {
              snapshot.forEach((childSnapshot) => {
                let description = childSnapshot.child("description").val()
                let eventAdded = childSnapshot.child("eventAdded").val()
                let eventAddress = childSnapshot.child("eventAddress").val()
                let eventCity = childSnapshot.child("eventCity").val()
                let eventCoordinates = childSnapshot.child("eventCoordinates").val()
                let eventDate = childSnapshot.child("eventDate").val()
                let eventDateTime = childSnapshot.child("eventDateTime").val()
                let eventId = childSnapshot.child("eventId").val()
                let eventImgUrl = childSnapshot.child("eventImgUrl").val()
                let eventName = childSnapshot.child("eventName").val()
                let eventTime = childSnapshot.child("eventTime").val()
                let eventType = childSnapshot.child("eventType").val()
                let userIdOfEvent = childSnapshot.child("userIdOfEvent").val()
        
                if(childSnapshot.child("objectName")  && eventId == event.target.id){
                  let objectName = childSnapshot.child("objectName").val()
                  firebase.database().ref('events/' + event.target.id).set({
        
                    description: description,
                    
                    eventAdded: eventAdded,
                    
                    eventAddress: eventAddress,
                   
                    eventCity: eventCity,
                    
                    eventCoordinates: eventCoordinates,
                  
                    eventDate: eventDate,
                   
                    eventDateTime: eventDateTime,
                 
                    eventId: eventId,
                    
                    eventImgUrl: eventImgUrl,
                    
                    eventName: eventName,
              
                    eventTime: eventTime,
                    
                    eventType: eventType,
                  
                    objectName: objectName,
                    
                    trending: true,
        
                    userIdOfEvent: userIdOfEvent
                    
                    
                  });
                }else if(!childSnapshot.child("objectName") && eventId == event.target.id){
        
                  firebase.database().ref('events/' + event.target.id).set({
        
                    description: description,
                    
                    eventAdded: eventAdded,
                    
                    eventAddress: eventAddress,
                   
                    eventCity: eventCity,
                    
                    eventCoordinates: eventCoordinates,
                  
                    eventDate: eventDate,
                   
                    eventDateTime: eventDateTime,
                 
                    eventId: eventId,
                    
                    eventImgUrl: eventImgUrl,
                    
                    eventName: eventName,
              
                    eventTime: eventTime,
                    
                    eventType: eventType,
                    
                    trending: true,
        
                    userIdOfEvent: userIdOfEvent
                    
                    
                  });
        
                }
              })
            })
        };

        
      },
      deleteTrending: function(event){
        if(event){
          var query = firebase.database().ref("events");
          query.once("value")
            .then(function (snapshot) {
              snapshot.forEach(function (childSnapshot) {
                let description = childSnapshot.child("description").val()
                let eventAdded = childSnapshot.child("eventAdded").val()
                let eventAddress = childSnapshot.child("eventAddress").val()
                let eventCity = childSnapshot.child("eventCity").val()
                let eventCoordinates = childSnapshot.child("eventCoordinates").val()
                let eventDate = childSnapshot.child("eventDate").val()
                let eventDateTime = childSnapshot.child("eventDateTime").val()
                let eventId = childSnapshot.child("eventId").val()
                let eventImgUrl = childSnapshot.child("eventImgUrl").val()
                let eventName = childSnapshot.child("eventName").val()
                let eventTime = childSnapshot.child("eventTime").val()
                let eventType = childSnapshot.child("eventType").val()
                let userIdOfEvent = childSnapshot.child("userIdOfEvent").val()
                if(childSnapshot.child("objectName")  && eventId == event.target.id){
                  let objectName = childSnapshot.child("objectName").val()
                  firebase.database().ref('events/' + event.target.id).set({
        
                    description: description,
                    
                    eventAdded: eventAdded,
                    
                    eventAddress: eventAddress,
                   
                    eventCity: eventCity,
                    
                    eventCoordinates: eventCoordinates,
                  
                    eventDate: eventDate,
                   
                    eventDateTime: eventDateTime,
                 
                    eventId: eventId,
                    
                    eventImgUrl: eventImgUrl,
                    
                    eventName: eventName,
              
                    eventTime: eventTime,
                    
                    eventType: eventType,
                  
                    objectName: objectName,
                    
                    trending: false,
        
                    userIdOfEvent: userIdOfEvent
                    
                    
                  });
                }else if(!childSnapshot.child("objectName") && eventId == event.target.id){
        
                  firebase.database().ref('events/' + event.target.id).set({
                    
                    description: description,
                    
                    eventAdded: eventAdded,
                    
                    eventAddress: eventAddress,
                   
                    eventCity: eventCity,
                    
                    eventCoordinates: eventCoordinates,
                  
                    eventDate: eventDate,
                   
                    eventDateTime: eventDateTime,
                 
                    eventId: eventId,
                    
                    eventImgUrl: eventImgUrl,
                    
                    eventName: eventName,
              
                    eventTime: eventTime,
                    
                    eventType: eventType,
                    
                    trending: false,
        
                    userIdOfEvent: userIdOfEvent
        
                  });
        
                }
              })
            })
        }
        
      },
    }
  });
};

let deleteEvent = (some) => {


  let eventsRef = firebase.database().ref('events/'+some);
  let eventsImgRef = firebase.storage().ref("eventImages/"+some);

  if(some){
    refreshEventTable();
    eventsImgRef.delete()
    eventsRef.remove();
  }
}




let refreshTable = () => {
  document.getElementById("moderatorTableBody").innerHTML = "";
  document.getElementById("adminTableBody").innerHTML = "";
  document.getElementById("userTableBody").innerHTML = "";
  document.getElementById("eventsTableBody").innerHTML = "";
};

let refreshEventTable = () => {
  document.getElementById("eventsTableBody").innerHTML = "";
};

let deleteModerator = () => {
  let emailInput = document.getElementById("editModeratorInput").value;
  let successAlert = document.getElementById("moderatorSuccessAlert");
  let errorAlert = document.getElementById("moderatorErrorAlert");

  if (emailInput) {
    let counter = 0;

    var query = firebase.database().ref("users")
    query.once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {

          var email = childSnapshot.child("email").val();
          var userId = childSnapshot.child("uid").val();
          var username = childSnapshot.child("username").val();

          var tipKorisnika = childSnapshot.child("tipKorisnika").val();
          if (emailInput == email) {
            counter++;

            switch (tipKorisnika) {
              case 0:
                emailInput = null;
                document.getElementById("editModeratorInput").value = null;

                successAlert.style.display = "none"
                errorAlert.innerHTML = `Korisnik <b>${email}</b> nije moderator!`;
                errorAlert.style.display = "block";
                break;
              case 99:
                emailInput = null;
                document.getElementById("editModeratorInput").value = null;

                successAlert.style.display = "none"
                errorAlert.innerHTML = `Korisnik <b>${email}</b> je administrator i ne možete mu mijenjati vrijednosti!`;
                errorAlert.style.display = "block";
                break;
              case 10:
                refreshTable();
                emailInput = null;
                document.getElementById("editModeratorInput").value = null;
                firebase.database().ref('users/' + userId).set({
                  email: email,
                  tipKorisnika: 0,
                  uid: userId,
                  username: username
                });

                errorAlert.style.display = "none"
                successAlert.innerHTML = `Korisniku <b>${email}</b> je uspješno uklonjena uloga moderatora!`;
                successAlert.style.display = "block";
                break;
            };
          };
        });

        if (!counter) {
          successAlert.style.display = "none"
          errorAlert.innerHTML = `Nije pronađen ovaj korisnik. Provjerite unos!`;
          errorAlert.style.display = "block";
        };

      });
  } else {
    successAlert.style.display = "none"
    errorAlert.innerHTML = `Unesite email!`;
    errorAlert.style.display = "block";
  };
};

let addModerator = () => {


  let emailInput = document.getElementById("editModeratorInput").value;
  let successAlert = document.getElementById("moderatorSuccessAlert");
  let errorAlert = document.getElementById("moderatorErrorAlert");

  if (emailInput) {

    let counter = 0;

    var query = firebase.database().ref("users");
    query.once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

          let email = childSnapshot.child("email").val();
          let userId = childSnapshot.child("uid").val();
          let username = childSnapshot.child("username").val();


          let tipKorisnika = childSnapshot.child("tipKorisnika").val();
          if (emailInput == email) {
            counter++;

            switch (tipKorisnika) {
              case 10:
                emailInput = null;
                document.getElementById("editModeratorInput").value = null;

                successAlert.style.display = "none"
                errorAlert.innerHTML = `Korisnik <b>${email}</b> je već moderator!`;
                errorAlert.style.display = "block";
                break;
              case 99:
                emailInput = null;
                document.getElementById("editModeratorInput").value = null;

                successAlert.style.display = "none"
                errorAlert.innerHTML = `Korisnik <b>${email}</b> je administrator i ne možete mu mijenjati vrijednosti!`;
                errorAlert.style.display = "block";
                break;
              case 0:
                refreshTable();
                emailInput = null;
                document.getElementById("editModeratorInput").value = null;
                firebase.database().ref('users/' + userId).set({
                  email: email,
                  tipKorisnika: 10,
                  uid: userId,
                  username: username
                });


                errorAlert.style.display = "none"
                successAlert.innerHTML = `Korisnik <b>${email}</b> je uspješno promoviran u moderatora!`;
                successAlert.style.display = "block";
                break;
            };
          };


        });

        if (!counter) {
          successAlert.style.display = "none"
          errorAlert.innerHTML = `Nije pronađen ovaj korisnik. Provjerite unos!`;
          errorAlert.style.display = "block";
        };

      });

  } else {
    successAlert.style.display = "none"
    errorAlert.innerHTML = `Unesite email!`;
    errorAlert.style.display = "block";
  };

};

listUsers();
listEvents();
adminPanelData();
