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
  document.getElementById("eventsListBody").innerHTML = "";
};

let listEvents = () => {
  let query = firebase.database().ref("events");
  let allEvents = [];
  query.on("value", snapshot => {
    refreshEventTable();
    if (!snapshot.val()) {
      document.getElementById("eventsError").innerHTML = "Nažalost, nema eventova koje vam možemo prikazati. Pokušajte ponovno kasnije!";
      document.getElementById("eventsError").style.display = "block";
      document.getElementById("allEventsList").style.visibility = "hidden";
    } else {
      document.getElementById("eventsError").style.display = "none";
      document.getElementById("allEventsList").style.visibility = "visible";

      snapshot.forEach(childSnapshot => {
        allEvents.push(childSnapshot.val());
      });
    }
  });
  new Vue({
    el: "#allEventsList",
    data: {
      eventsData: allEvents,
    },
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

listEvents();