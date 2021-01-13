firebase.auth().onAuthStateChanged(function (user) {
   
    if (user) {
        setupUI(user);
    }else {
        setupUI();
    }
});


function uploadImage() {
    // File or Blob named mountains.jpg
    const file = document.querySelector("#photo").files[0];
    var user = firebase.auth().currentUser;
    const name = user.uid;
    var uploader = document.getElementById("uploader");

// Create the file metadata
var metadata = {
  contentType: file.type
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('userImages/' + name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    uploader.value  = progress;
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
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
     document.querySelector("#profilePhoto").src = url;
     uploader.value  = 0;
     var imgUrl = url;
     user.updateProfile({
        photoURL:imgUrl
        });
  }).then(function() {
    window.alert("Uspješan upload!")
}).then(function(){
    window.location = './index.html'; //After successful login, user will be redirected to index.html
})
    
});
        
    }

function showPreview(event){
    if(event.target.files.length > 0){
        var src =URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("profilePhoto"); //dodati id gdje ce biti preview slike
        preview.src = src;
    }
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function postovi(){ // samo logovi od eventova za postove
  var query = firebase.database().ref("events");
  query.on("value",(data)=>{
    var posts = data.val();
    
   
    document.getElementById("allEvents").innerHTML = ''
    for(const post in posts){
         if(posts[post].objectName == undefined){
      document.getElementById("allEvents").innerHTML +=
      `<tr>
      <td>${posts[post].eventName}</td>
      <td>${posts[post].description}</td>
      <td>${posts[post].eventDate}</td>
      <td>${posts[post].eventTime}</td>
      <tr>`
    }else{
      document.getElementById("allEvents").innerHTML +=
      `<tr>
      <td>${posts[post].eventName} </td>
      <td>${posts[post].description}</td>
      <td>${posts[post].eventDate} </td>
      <td>${posts[post].eventTime}</td>
      <td>${posts[post].objectName}</td> 
      <tr>`
    }
    }

  })
}
postovi();

