const all = document.querySelectorAll("body");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.querySelector("#moderatorPhoto").src = user.photoURL;
        document.getElementById('moderatorName').innerHTML = user.displayName;     

        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var tipKorisnika = snapshot.val().tipKorisnika;
        if(tipKorisnika == 99 || tipKorisnika == 10){
          all.forEach(item => item.style.display = 'block');
        }else{
          window.location = "./404.html";
        }
  });
    } else {
        window.location = "./404.html";
    }
  });


function addObject(){
    var user = firebase.auth().currentUser;
    var objectName =  document.getElementById('objectNameInput').value;
    var objectCoordinatesInput = document.getElementById('objectCoordinatesInput').value;
    var objectTypeInput = document.getElementById('objectTypeInput').value;
    var objectCityInput = document.getElementById('objectCityInput').value;
    var objectAddressInput = document.getElementById('objectAddressInput').value;
    var objectKey = user.uid+objectName;
    var objects = firebase.database().ref('objects/'+objectKey);

    if(objectName != "" && objectCityInput != "Odaberi grad" && objectAddressInput != ""){
        objects.set({
            userId : user.uid,
            objectId:user.uid+objectName,
            name: objectName,
            type:objectTypeInput,
            coordinates: objectCoordinatesInput,
            city:objectCityInput,
            adress:objectAddressInput, 
    })
    } else {
        console.log("Niste ispunili sva polja!")
    }
}



function addEvent(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    time =year.toString()+month.toString()+date.toString()+hours.toString()+minutes.toString()+seconds.toString();

    time = parseInt(time);

    var user = firebase.auth().currentUser;

    var eventName = document.getElementById("eventNameInput").value;
    var eventDescription = document.getElementById("eventDescriptionInput").value;
    var eventDate = document.getElementById("eventDateInput").value;
    var eventTime = document.getElementById("eventTimeInput").value;
    var clubbingObject= document.getElementById("clubbingObjectInput").value;
    var barLoungeObject = document.getElementById("barLoungeObjectInput").value;
    var concertCoordinates = document.getElementById("concertCoordinatesInput").value;
    var festivalCoordinates = document.getElementById("festivalCoordinatesInput").value;
    var concertCity = document.getElementById("concertCityInput").value;
    var festivalCity = document.getElementById("festivalCityInput").value;
    var concertAdress = document.getElementById("concertAddressInput").value;
    var festivalAdress = document.getElementById("festivalAddressInput").value;

    var events = firebase.database().ref('events');
    var pushKeys = events.push();
    if(clubbingObject != ""){
        var objectKey = user.uid+clubbingObject;
        var objects = firebase.database().ref('objects/'+objectKey);
        objects.once("value").then(function(snapshot){
            if(snapshot.key == objectKey){
                pushKeys.set({
                    eventAdded:time,
                    userIdOfEvent:user.uid,
                    eventId:pushKeys.key,
                    eventDateTime:eventDate+" "+eventTime,
                    eventName:eventName,
                    description:eventDescription,
                    eventDate:eventDate,
                    eventTime:eventTime,
                    eventType:snapshot.child("type").val(),
                    eventCity:snapshot.child("city").val(),
                    eventAdress:snapshot.child("adress").val(),
                    eventCoordinates:snapshot.child("coordinates").val(),
                    objectName:snapshot.child("name").val()

            })
            }
        })
       
    }
    else if(barLoungeObject != ""){
        var objectKey = user.uid+barLoungeObject;
        var objects = firebase.database().ref('objects/'+objectKey);
        objects.once("value").then(function(snapshot){
            if(snapshot.key == objectKey){
                pushKeys.set({
                    eventAdded:time,
                    userIdOfEvent:user.uid,
                    eventId:pushKeys.key,
                    eventDateTime:eventDate+" "+eventTime,
                    eventName:eventName,
                    description:eventDescription,
                    eventDate:eventDate,
                    eventTime:eventTime,
                    eventType:snapshot.child("type").val(),
                    eventCity:snapshot.child("city").val(),
                    eventAdress:snapshot.child("adress").val(),
                    eventCoordinates:snapshot.child("coordinates").val(),
                    objectName:snapshot.child("name").val()

            })
            }
        })
       
    }else{
        if(concertCity != "Odaberi grad" && concertAdress !=""){
            pushKeys.set({
                eventAdded:time,
                userIdOfEvent:user.uid,
                eventId:pushKeys.key,
                eventDateTime:eventDate+" "+eventTime,
                eventName:eventName,
                description:eventDescription,
                eventDate:eventDate,
                eventTime:eventTime,
                eventCoordinates:concertCoordinates,
                eventCity:concertCity,
                eventAdress:concertAdress,
        })
        }
        else if(festivalCity != "Odaberi grad" && festivalAdress != ""){
            pushKeys.set({
                eventAdded:time,
                userIdOfEvent:user.uid,
                eventId:pushKeys.key,
                eventDateTime:eventDate+" "+eventTime,
                eventName:eventName,
                description:eventDescription,
                eventDate:eventDate,
                eventTime:eventTime,
                eventCoordinates:festivalCoordinates,
                eventCity:festivalCity,
                eventAdress:festivalAdress,
        })
        }else{
            console.log("Niste ispunili obavezna polja!")
        }
    }
}

function optionList(){
    var user = firebase.auth().currentUser;
    var query = firebase.database().ref("objects")
    query.once("value")
    .then(function(snapshot) {
        var myOptionClubbing = "<option id='clubbingOption'></option>";
        var myOptionBar = "<option id='barOption'></option>";
        snapshot.forEach(function(childSnapshot) {
            var city  = childSnapshot.child("city").val();
            var adress = childSnapshot.child("adress").val();
            var userId = childSnapshot.child("userId").val();
            var name = childSnapshot.child("name").val();
            var type = childSnapshot.child("type").val();
            var coordinates = childSnapshot.child("coordinates").val();
        
            if(user.uid+name == userId+name){
                if(type == "Club"){
                    myOptionClubbing += "<option>" + name +"</option>";
                }
                if(type == "Bar/lounge") {
                    myOptionBar += "<option>" + name +"</option>";
                }
               
            }
            document.getElementById("clubbingObjectInput").innerHTML = myOptionClubbing;
            document.getElementById("barLoungeObjectInput").innerHTML = myOptionBar;
        })
    })   
}
// ${posts[post].eventName}
function eventHistory(){ // samo logovi od eventova za postove
    var query = firebase.database().ref("events");
    query.on("value",(data)=>{
      var posts = data.val();
      var user = firebase.auth().currentUser;
      document.getElementById("historyList").innerHTML = '<br><h3>Povijest vaših eventova</h3><br>'
      for(const post in posts){
          
          if(posts[post].userIdOfEvent == user.uid){
              
           if(posts[post].objectName == undefined){
        document.getElementById("historyList").innerHTML +=
        `
        <li class="list-group-item">${posts[post].eventName}<span style="float: right;">${posts[post].eventDate}</span></li>

        `
      }else{
        document.getElementById("historyList").innerHTML +=
        `

        <li class="list-group-item">${posts[post].eventName}<span style="float: right;">${posts[post].eventDate}</span></li>

        `
      }
    }
      }
  
    })
  }

