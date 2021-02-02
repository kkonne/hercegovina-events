firebase.auth().onAuthStateChanged(function (user) {

  if (user) {
    setupUI(user);
  } else {
    setupUI();
  }
});


function uploadImage() {
  // File or Blob named mountains.jpg
  const file = document.querySelector("#userProfileImageInput").files[0];
  let user = firebase.auth().currentUser;
  const name = user.uid;
  let errorAlert = document.getElementById("userProfileImageUploadError");
  let successAlert = document.getElementById("userProfileImageUploadSuccess");
  let uploadSpinner = document.getElementById("userProfilePhotoSpinner");
  let uploadProgress = document.getElementById("userProfilePhotoProgress");
  uploadSpinner.style.display = "block";

  errorAlert.style.display = "none";
  successAlert.style.display = "none";

  if (!file) {
    errorAlert.innerHTML = "Dogodila se greška: Nije odabrana datoteka!";
    errorAlert.style.display = "block";
  } else {
    errorAlert.style.display = "none";

    // Create the file metadata
    var metadata = {
      contentType: file.type
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('userImages/' + name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let uploadedPercent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        uploadProgress.innerHTML = `${uploadedPercent}% učitano`;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            errorAlert.innerHTML = "Korisniku nije dopušten pristup objektu!";
            errorAlert.style.display = "block";
            break;

          case 'storage/canceled':
            // User canceled the upload
            errorAlert.innerHTML = "Korisnik je prekinio prijenos datoteka!";
            errorAlert.style.display = "block";
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            errorAlert.innerHTML = "Nepoznata greška. Pokušajte ponovno!";
            errorAlert.style.display = "block";
            break;
          default:
            console.log("Error: " + error.code);
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          document.querySelector("#profilePhoto").src = url;

          errorAlert.style.display = "none";
          uploadSpinner.style.display = "none";
          uploadProgress.style.display = "none";
          document.getElementById("addUserProfileImageButton").style.display = "none";


          let imgUrl = url;
          user.updateProfile({
            photoURL: imgUrl
          });
        }).then(() => {
          // window.alert("Uspješan upload!")
          successAlert.style.display = "block";
          successAlert.innerHTML = "Uspješno promijenjena slika!";
          document.getElementById("uploadImageButton").style.display = "none";
        });

      });
  }



}

let refreshEventTable = () => {
  document.getElementById("allEventsList").innerHTML = `<div class="row">
                <div class="col-md-4" v-for="event in eventsData">
                    <div class="card bg-dark text-light my-3">
                        <img v-bind:src=event.eventImgUrl alt="Event image" id="eventImage" class="card-img-top cardImg"
                            width="100%">
                        <div class="card-body">
                            <p class="card-text float-right">{{ event.objectName }}</p>
                            <h5 class="card-title" style="color: #eb6363;">{{ event.eventName }}</h5>
                            <p class="card-text">{{ event.description }}</p>
                            <div class="eventTime float-left">
                                <p class="small">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#eb6363"
                                        class="bi bi-clock-fill mr-1" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                    </svg>
                                    {{ event.eventTime }}
                                </p>
                            </div>
                            <div class="eventDate float-right">
                                <p class="small">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#eb6363"
                                        class="bi bi-calendar3 mr-1" viewBox="0 0 16 16">
                                        <path
                                            d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                        <path
                                            d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg>
                                    {{ event.eventDate }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
};

let listEvents = () => {

  let filterCity = document.getElementById("filterCityInput").value;
  let filterType = document.getElementById("filterTypeInput").value;

  let query = firebase.database().ref("events").orderByChild("eventDateTime");
  

  query.on("value", snapshot => {
    let allEvents = [];
    if (snapshot.val()) {
      document.getElementById("eventsError").style.display = "none";
      document.getElementById("allEventsList").innerHTML = "";
      
      snapshot.forEach(childSnapshot => {
        if(filterCity != "" && filterType != ""){
          document.getElementById("clearFilterButton").style.display = "block"
          if(filterCity == childSnapshot.val().eventCity && filterType == childSnapshot.val().eventType){
            allEvents.push(childSnapshot.val());
          }
        }else if(filterCity != "" && filterType == ""){
          document.getElementById("clearFilterButton").style.display = "block"
          if(filterCity == childSnapshot.val().eventCity){
            allEvents.push(childSnapshot.val());
          }
        }else if(filterCity == "" && filterType != ""){
          document.getElementById("clearFilterButton").style.display = "block"
          if(filterType == childSnapshot.val().eventType){
            allEvents.push(childSnapshot.val());
          }
        }else if(filterCity == "" && filterType == "" ){
          document.getElementById("clearFilterButton").style.display = "none"
          allEvents.push(childSnapshot.val());
        }else{
          alert("Dogodila se nenadana pogreška!");
        }
      });
      if(allEvents.length == 0){
        document.getElementById("eventsError").innerHTML = "Nažalost, nema eventova koje vam možemo prikazati. Pokušajte ponovno kasnije!";
        document.getElementById("eventsError").style.display = "block";
        document.getElementById("allEventsList").style.display = "none";
      }
      refreshEventTable();
      document.getElementById("allEventsList").style.display = "block";

      new Vue({
        el: "#allEventsList",
        data: {
          eventsData: allEvents,
        },
      });
    } else {
      document.getElementById("eventsError").innerHTML = "Nažalost, nema eventova koje vam možemo prikazati. Pokušajte ponovno kasnije!";
      document.getElementById("eventsError").style.display = "block";
      document.getElementById("allEventsList").style.display = "none";
    };
  });
};

let editUserImage = () => {

  let addImageButton = document.getElementById("addUserProfileImageButton");
  let imagePreview = document.getElementById('userProfileImageInputPreview');
  let fileInput = document.getElementById("userProfileImageInput");

  imagePreview.style.height = imagePreview.style.width.value;
  imagePreview.style.display = "none";
  addImageButton.style.display = "none";
  fileInput.value = null;
  fileInput.style.display = "block";
};

let applyFilters = () => {
  listEvents();
}
let clearFilters = () => {
  let filterCity = document.getElementById("filterCityInput").value;
  let filterType = document.getElementById("filterTypeInput").value;

  if(filterCity != "" || filterType != ""){
    document.getElementById("filterCityInput").value = ""
    document.getElementById("filterTypeInput").value = ""
    listEvents();
  }

}
listEvents();
