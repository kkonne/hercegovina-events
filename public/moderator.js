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
    function clearObjFields(){
    document.getElementById('objectNameInput').value = "";
    objectCoordinatesInput = document.getElementById('objectCoordinatesInput').value = "";
    objectTypeInput = document.getElementById('objectTypeInput').value = "";
    objectCityInput = document.getElementById('objectCityInput').value = "Odaberi grad";
    objectAddressInput = document.getElementById('objectAddressInput').value = "";
    }
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
    alert("Uspješno dodan objekt!")
    clearObjFields();
    } else {
        alert("Niste ispunili sva polja!")
    }
}



function addEvent(){

    var events = firebase.database().ref('events');
    var pushKeys = events.push();
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
    var eventImage = document.getElementById("eventImageInput").value;
         
     
         function checkStaticEventData(){
            if(eventName !="" && eventImage!="" && eventDescription!="" && eventDate!="" && eventTime!=""){
            
                return true
            }else{
               
                return false
            }
        };

        function checkClubbingData(){

            if(!clubbingObject){
             
                return false
            }else{
              
                return true
            }
        };
        function checkBarLoungeData(){

            if(!barLoungeObject){
          
                return false
            }else{
              
                return true
            }
        };
        function checkConcertData(){

            if(concertCity === "Odaberi grad" && !concertCoordinates && !concertAdress){
          
                return false
            }else{
               
                return true
            }
        };
        function checkFestivalData(){

            if(festivalCity === "Odaberi grad"  && !festivalCoordinates && !festivalAdress){
               
                return false
            }else{
               
                return true
            }
        };

        function uploadClubbingData(downloadURL){
            var user = firebase.auth().currentUser;
            var objectKey = user.uid+clubbingObject;
            var objects = firebase.database().ref('objects/'+objectKey);
        
            objects.once("value").then(function(snapshot){
                
                if(snapshot.key == objectKey){
        
                    pushKeys.set({
                        eventImgUrl:downloadURL,
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
                        eventAddress:snapshot.child("adress").val(),
                        eventCoordinates:snapshot.child("coordinates").val(),
                        objectName:snapshot.child("name").val(),
                        trending:false,
        
                })
                }
            })
        
     
            
        
        }
        
        function uploadBarLoungeData(downloadURL){
            var user = firebase.auth().currentUser;
            var objectKey = user.uid+barLoungeObject;
            var objects = firebase.database().ref('objects/'+objectKey);
        
            objects.once("value").then(function(snapshot){
                
                if(snapshot.key == objectKey){
                    pushKeys.set({
                        eventImgUrl:downloadURL,
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
                        eventAddress:snapshot.child("adress").val(),
                        eventCoordinates:snapshot.child("coordinates").val(),
                        objectName:snapshot.child("name").val(),
                        trending:false,
        
                })
                }
            })
        
          
            
        }
        
        function uploadConcertData(downloadURL){
        
            pushKeys.set({
                 eventImgUrl:downloadURL,
                 eventAdded:time,
                 userIdOfEvent:user.uid,
                 eventId:pushKeys.key,
                 eventDateTime:eventDate+" "+eventTime,
                 eventName:eventName,
                 description:eventDescription,
                 eventDate:eventDate,
                 eventTime:eventTime,
                 eventType:"Koncert",
                 eventCoordinates:concertCoordinates,
                 eventCity:concertCity,
                 eventAddress:concertAdress,
                 trending:false,
         })
     
      
        
        }
        
        function uploadFestivalData(downloadURL){
        
            pushKeys.set({
                eventImgUrl:downloadURL,
                eventAdded:time,
                userIdOfEvent:user.uid,
                eventId:pushKeys.key,
                eventDateTime:eventDate+" "+eventTime,
                eventName:eventName,
                description:eventDescription,
                eventDate:eventDate,
                eventTime:eventTime,
                eventType:"Festival",
                eventCoordinates:festivalCoordinates,
                eventCity:festivalCity,
                eventAddress:festivalAdress,
                trending:false,
        })
        
     
           
        
        }
        
        function uploadEventImage(){
var file = document.querySelector("#eventImageInput").files[0];

// Create the file metadata
var metadata = {
  contentType: file.type
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = firebase.storage().ref().child('eventImages/' + pushKeys.key).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function(){
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    if(checkClubbingData() === true){
        uploadClubbingData(downloadURL)
        clearFields();
        alert("Uspješno dodan event!")
    }
    if(checkBarLoungeData() === true){
        uploadBarLoungeData(downloadURL)
        clearFields();
        alert("Uspješno dodan event!")
    }
    if(checkConcertData() === true){
        uploadConcertData(downloadURL)
        clearFields();
        alert("Uspješno dodan event!")
    }
    if(checkFestivalData() === true){
        uploadFestivalData(downloadURL);
        clearFields();
        alert("Uspješno dodan event!")
    }
  });
});
        
        }


     if(checkStaticEventData() === true){

         if(checkClubbingData() === true){

            uploadEventImage();

         }else if(checkBarLoungeData() === true){

            uploadEventImage();
            

         }else if(checkConcertData() === true){

            uploadEventImage();
            

         }else if(checkFestivalData() === true){

            uploadEventImage();
     

         }else{
             alert("Niste ispunili sva polja!")
         }
    }else{
         alert("Niste ispunili sva polja!");
     };
          
    }

  
function optionList(){
    var user = firebase.auth().currentUser;
    var query = firebase.database().ref("objects")
    query.once("value")
    .then(function(snapshot) {
        var myOptionClubbing = "<option id='clubbingOption'></option>";
        var myOptionBar = "<option id='barOption'></option>";
        snapshot.forEach(function(childSnapshot) {
            var userId = childSnapshot.child("userId").val();
            var name = childSnapshot.child("name").val();
            var type = childSnapshot.child("type").val();
        
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
let deleteEvent = (some) => {
        
    eventsImgRef = firebase.storage().ref("eventImages/"+some);
    eventsRef = firebase.database().ref('events/'+some);

    if(some){
        eventsImgRef.delete();
        eventsRef.remove();
    }
   
}


function eventHistory(){ 
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
        
        <li class="list-group-item">${posts[post].eventName}<span style="float: right;"></span><button class="deleteEventButtons" id="${posts[post].eventId}">Izbriši</button></li>
        

        `
        
      }else{
        document.getElementById("historyList").innerHTML +=
        `

        <li class="list-group-item">${posts[post].eventName}<span style="float: right;"></span><button class="deleteEventButtons" id="${posts[post].eventId}">Izbriši</button></li>
   
        `
      }   
    }
    
      }
      $('.deleteEventButtons').on('click', function(){
        $(this).parent().remove();
        if($(this).parent().remove()){
            deleteEvent(this.id);
        }
      });
     
    })
  }

  let editImage = () => {
    let error = document.getElementById("eventImageError");

    let addImageButton = document.getElementById("addEventImageButton");
    let imagePreview = document.getElementById('eventImageInputPreview');
    let fileInput = document.getElementById("eventImageInput");

    if (!imagePreview.src) {
        error.innerHTML = "Neuspješno dodavanje fotografije!"
        error.style.display = "block";
    } else {

        imagePreview.style.display = "none";
        addImageButton.style.display = "none";
        fileInput.style.display = "block";

        error.innerHTML = ""
        error.style.display = "none";
    }
};


function clearFields(){
        
    document.getElementById("eventNameInput").value = "";
    document.getElementById("eventDescriptionInput").value = "";
    document.getElementById("eventDateInput").value = "";
    document.getElementById("eventTimeInput").value = "";
    document.getElementById("clubbingObjectInput").value = "";
    document.getElementById("barLoungeObjectInput").value = "";
    document.getElementById("concertCoordinatesInput").value = "";
    document.getElementById("festivalCoordinatesInput").value = "";
    document.getElementById("concertCityInput").value = "Odaberi grad";
    document.getElementById("festivalCityInput").value = "Odaberi grad";
    document.getElementById("concertAddressInput").value = "";
    document.getElementById("festivalAddressInput").value = "";
    document.getElementById("eventImageInput").value = "";
    document.getElementById("eventImageInputPreview").value = "";
    editImage();

}



