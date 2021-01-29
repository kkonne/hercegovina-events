const all = document.querySelectorAll("body");


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.querySelector("#moderatorPhoto").src = user.photoURL;
        document.getElementById('moderatorName').innerHTML = user.displayName;

        firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
            var tipKorisnika = snapshot.val().tipKorisnika;
            if (tipKorisnika == 99 || tipKorisnika == 10) {
                all.forEach(item => item.style.display = 'block');
            } else {
                window.location = "./404.html";
            }
        });
    } else {
        window.location = "./404.html";
    }
});

function addObject() {
    function clearObjFields() {
        document.getElementById('objectNameInput').value = "";
        objectCoordinatesInput = document.getElementById('objectCoordinatesInput').value = "";
        objectTypeInput = document.getElementById('objectTypeInput').value = "";
        objectCityInput = document.getElementById('objectCityInput').value = "Odaberi grad";
        objectAddressInput = document.getElementById('objectAddressInput').value = "";
    };

    var user = firebase.auth().currentUser;
    var objectName = document.getElementById('objectNameInput').value;
    var objectCoordinatesInput = document.getElementById('objectCoordinatesInput').value;
    var objectTypeInput = document.getElementById('objectTypeInput').value;
    var objectCityInput = document.getElementById('objectCityInput').value;
    var objectAddressInput = document.getElementById('objectAddressInput').value;
    var objectKey = user.uid + objectName;
    var objects = firebase.database().ref('objects/' + objectKey);

    let addObjectError = document.getElementById("addObjectError");
    let addObjectSuccess = document.getElementById("addObjectSuccess");

    if (objectName != "" && objectCityInput != "Odaberi grad" && objectAddressInput != "") {
        objects.set({
            userId: user.uid,
            objectId: user.uid + objectName,
            name: objectName,
            type: objectTypeInput,
            coordinates: objectCoordinatesInput,
            city: objectCityInput,
            adress: objectAddressInput,
        })
        // alert("Uspješno dodan objekt!")
        addObjectError.style.display = "none";
        addObjectSuccess.innerHTML = "Uspješno dodan objekt!"
        addObjectSuccess.style.display = "block";
        clearObjFields();
    } else {
        // alert("Niste ispunili sva polja!")
        addObjectSuccess.style.display = "none";
        addObjectError.innerHTML = "Niste ispunili sva polja!"
        addObjectError.style.display = "block";
    }
}



let addEvent = () => {
    let addEventError = document.getElementById("addEventError");
    let addEventSuccess = document.getElementById("addEventSuccess");

    var events = firebase.database().ref('events');
    var pushKeys = events.push();
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    time = year.toString() + month.toString() + date.toString() + hours.toString() + minutes.toString() + seconds.toString();
    time = parseInt(time);
    var user = firebase.auth().currentUser;

    var eventName = document.getElementById("eventNameInput").value;
    var eventDescription = document.getElementById("eventDescriptionInput").value;
    var eventDate = document.getElementById("eventDateInput").value;
    var eventTime = document.getElementById("eventTimeInput").value;
    var clubbingObject = document.getElementById("clubbingObjectInput").value;
    var barLoungeObject = document.getElementById("barLoungeObjectInput").value;
    var concertCoordinates = document.getElementById("concertCoordinatesInput").value;
    var festivalCoordinates = document.getElementById("festivalCoordinatesInput").value;
    var concertCity = document.getElementById("concertCityInput").value;
    var festivalCity = document.getElementById("festivalCityInput").value;
    var concertAdress = document.getElementById("concertAddressInput").value;
    var festivalAdress = document.getElementById("festivalAddressInput").value;
    var eventImage = document.getElementById("eventImageInput").value;


    function checkStaticEventData() {
        if (eventName != "" && eventImage != "" && eventDescription != "" && eventDate != "" && eventTime != "") {
            return true
        } else {
            return false
        }
    };

    function checkClubbingData() {
        if (!clubbingObject) {
            return false
        } else {
            return true
        }
    };

    function checkBarLoungeData() {
        if (!barLoungeObject) {
            return false
        } else {
            return true
        };
    };

    function checkConcertData() {
        if (concertCity === "Odaberi grad" && !concertCoordinates && !concertAdress) {
            return false
        } else {
            return true
        };
    };

    function checkFestivalData() {
        if (festivalCity === "Odaberi grad" && !festivalCoordinates && !festivalAdress) {
            return false
        } else {
            return true
        };
    };

    function uploadClubbingData(downloadURL) {
        var user = firebase.auth().currentUser;
        var objectKey = user.uid + clubbingObject;
        var objects = firebase.database().ref('objects/' + objectKey);

        objects.once("value").then(function (snapshot) {

            if (snapshot.key == objectKey) {
                pushKeys.set({
                    eventImgUrl: downloadURL,
                    eventAdded: time,
                    userIdOfEvent: user.uid,
                    eventId: pushKeys.key,
                    eventDateTime: eventDate + " " + eventTime,
                    eventName: eventName,
                    description: eventDescription,
                    eventDate: eventDate,
                    eventTime: eventTime,
                    eventType: snapshot.child("type").val(),
                    eventCity: snapshot.child("city").val(),
                    eventAddress: snapshot.child("adress").val(),
                    eventCoordinates: snapshot.child("coordinates").val(),
                    objectName: snapshot.child("name").val(),
                    trending: false,
                });
            };
        });
    };

    function uploadBarLoungeData(downloadURL) {
        var user = firebase.auth().currentUser;
        var objectKey = user.uid + barLoungeObject;
        var objects = firebase.database().ref('objects/' + objectKey);
        objects.once("value").then(function (snapshot) {

            if (snapshot.key == objectKey) {
                pushKeys.set({
                    eventImgUrl: downloadURL,
                    eventAdded: time,
                    userIdOfEvent: user.uid,
                    eventId: pushKeys.key,
                    eventDateTime: eventDate + " " + eventTime,
                    eventName: eventName,
                    description: eventDescription,
                    eventDate: eventDate,
                    eventTime: eventTime,
                    eventType: snapshot.child("type").val(),
                    eventCity: snapshot.child("city").val(),
                    eventAddress: snapshot.child("adress").val(),
                    eventCoordinates: snapshot.child("coordinates").val(),
                    objectName: snapshot.child("name").val(),
                    trending: false,
                });
            };
        });
    };

    function uploadConcertData(downloadURL) {
        pushKeys.set({
            eventImgUrl: downloadURL,
            eventAdded: time,
            userIdOfEvent: user.uid,
            eventId: pushKeys.key,
            eventDateTime: eventDate + " " + eventTime,
            eventName: eventName,
            description: eventDescription,
            eventDate: eventDate,
            eventTime: eventTime,
            eventType: "Koncert",
            eventCoordinates: concertCoordinates,
            eventCity: concertCity,
            eventAddress: concertAdress,
            trending: false,
        });
    };

    function uploadFestivalData(downloadURL) {
        pushKeys.set({
            eventImgUrl: downloadURL,
            eventAdded: time,
            userIdOfEvent: user.uid,
            eventId: pushKeys.key,
            eventDateTime: eventDate + " " + eventTime,
            eventName: eventName,
            description: eventDescription,
            eventDate: eventDate,
            eventTime: eventTime,
            eventType: "Festival",
            eventCoordinates: festivalCoordinates,
            eventCity: festivalCity,
            eventAddress: festivalAdress,
            trending: false,
        });
    };

    function uploadEventImage() {
        let file = document.querySelector("#eventImageInput").files[0];
        let addEventButton = document.getElementById("addEventButton");

        if ((file.size / 1024 / 1024) > 10) {
            addEventSuccess.style.display = "none";
            addEventError.innerHTML = "Slika ima više od 10 MB. Molimo odaberite sliku koja ima manje od 10 MB!";
            addEventError.style.display = "block";
        };

        addEventButton.style.display = "none";

        // Create the file metadata
        var metadata = {
            contentType: file.type
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = firebase.storage().ref().child('eventImages/' + pushKeys.key).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // console.log('Upload is ' + progress + '% done');
                addEventError.style.display = "none";
                addEventSuccess.innerHTML = `${progress}% učitavanje`;
                addEventSuccess.style.display = "block";

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        // console.log('Upload is paused');
                        addEventSuccess.style.display = "none";
                        addEventError.innerHTML = "Učitavanje je pauzirano!";
                        addEventError.style.display = "block";
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        // console.log('Upload is running');
                        addEventError.style.display = "none";
                        addEventSuccess.innerHTML = "Učitavanje...";
                        addEventSuccess.style.display = "block";
                        break;
                }
            }, (error) => {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        addEventSuccess.style.display = "none";
                        addEventError.innerHTML = "Korisniku nije dozvoljen pristup!";
                        addEventError.style.display = "block";
                        break;

                    case 'storage/canceled':
                        addEventSuccess.style.display = "none";
                        addEventError.innerHTML = "Korisnik je prekinuo prijenos podataka!";
                        addEventError.style.display = "block";
                        break;

                    case 'storage/unknown':
                        addEventSuccess.style.display = "none";
                        addEventError.innerHTML = "Dogodila se nepoznata greška. Molimo probajte ponovno!";
                        addEventError.style.display = "block";
                        break;
                }
            }, function () {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    if (checkClubbingData() === true) {
                        uploadClubbingData(downloadURL)
                        clearFields();
                        // alert("Uspješno dodan event!")
                        addEventError.style.display = "none";
                        addEventSuccess.innerHTML = "Uspješno dodan event!";
                        addEventSuccess.style.display = "block";
                        addEventButton.style.display = "block";
                    }
                    if (checkBarLoungeData() === true) {
                        uploadBarLoungeData(downloadURL)
                        clearFields();
                        // alert("Uspješno dodan event!")
                        addEventError.style.display = "none";
                        addEventSuccess.innerHTML = "Uspješno dodan event!";
                        addEventSuccess.style.display = "block";
                        addEventButton.style.display = "block";
                    }
                    if (checkConcertData() === true) {
                        uploadConcertData(downloadURL)
                        clearFields();
                        // alert("Uspješno dodan event!")
                        addEventError.style.display = "none";
                        addEventSuccess.innerHTML = "Uspješno dodan event!";
                        addEventSuccess.style.display = "block";
                        addEventButton.style.display = "block";
                    }
                    if (checkFestivalData() === true) {
                        uploadFestivalData(downloadURL);
                        clearFields();
                        // alert("Uspješno dodan event!")
                        addEventError.style.display = "none";
                        addEventSuccess.innerHTML = "Uspješno dodan event!";
                        addEventSuccess.style.display = "block";
                        addEventButton.style.display = "block";
                    }
                });
            });
    };


    if (checkStaticEventData() === true) {

        if (checkClubbingData() === true) {

            uploadEventImage();

        } else if (checkBarLoungeData() === true) {

            uploadEventImage();


        } else if (checkConcertData() === true) {

            uploadEventImage();


        } else if (checkFestivalData() === true) {

            uploadEventImage();


        } else {
            // alert("Niste ispunili sva polja!")
            addEventSuccess.style.display = "none";
            addEventError.innerHTML = "Niste ispunili sva polja!";
            addEventError.style.display = "block";
        };
    } else {
        // alert("Niste ispunili sva polja!");
        addEventSuccess.style.display = "none";
        addEventError.innerHTML = "Niste ispunili sva polja!";
        addEventError.style.display = "block";
    };

}

function optionList() {
    var user = firebase.auth().currentUser;
    var query = firebase.database().ref("objects")
    query.once("value")
        .then(function (snapshot) {
            var myOptionClubbing = "<option id='clubbingOption'></option>";
            var myOptionBar = "<option id='barOption'></option>";
            snapshot.forEach(function (childSnapshot) {
                var userId = childSnapshot.child("userId").val();
                var name = childSnapshot.child("name").val();
                var type = childSnapshot.child("type").val();

                if (user.uid + name == userId + name) {
                    if (type == "Club") {
                        myOptionClubbing += "<option>" + name + "</option>";
                    }
                    if (type == "Bar/lounge") {
                        myOptionBar += "<option>" + name + "</option>";
                    }

                }
                document.getElementById("clubbingObjectInput").innerHTML = myOptionClubbing;
                document.getElementById("barLoungeObjectInput").innerHTML = myOptionBar;
            })
        })
}
let deleteEvent = (eventId) => {

    if (eventId) {
        eventsImgRef = firebase.storage().ref("eventImages/" + eventId);
        eventsRef = firebase.database().ref('events/' + eventId);

        eventsImgRef.delete();
        eventsRef.remove();

        userEventsHistory();
    } else {
        console.log("Error: user id not found!");
    };
};


let userEventsHistory = () => {
    let query = firebase.database().ref("events");
    let userEventsList = document.getElementById("userEventsList");
    let counter = 0;

    let userEventsError = document.getElementById("userEventsError");

    query.on("value", (snapshot) => {
        let userEvents = [];
        if (snapshot.val()) {
            snapshot.forEach((childSnapshot) => {
                let loggedInUser = firebase.auth().currentUser;
                if (childSnapshot.child("userIdOfEvent").val() == loggedInUser.uid) {
                    userEvents.push(childSnapshot.val());
                    counter++;
                };
            });

            userEventsError.style.display = "none";
            userEventsList.innerHTML = `<table class="table table-light rounded">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Naziv</th>
                                        <th scope="col">Datum</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody id="userEventsTable">
                                    <tr v-for="event in userEventsData">
                                        <th scope="row" class="align-middle">{{ event.eventName }}</th>
                                        <td class="align-middle">{{ event.eventDate }}</td>
                                        <td class="align-middle">
                                            <button class="float-right btn btn-danger" v-bind:id=event.eventId
                                                onclick="deleteEvent(this.id)" style="background-color: #eb6363;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>`;
            new Vue({
                el: "#userEventsList",
                data: {
                    userEventsData: userEvents,
                },
            });
        } else {
            userEventsList.innerHTML = "";
            userEventsError.innerHTML = "Nažalost, nema eventova koje vam možemo prikazati. Dodajte eventove da biste ih vidjeli ovdje!";
            userEventsError.style.display = "block";
        };
    });



    // console.log(counter);

    if (!counter) {

    } else {

    };
};

/*
$('#deleteEventButton').on('click', function () {
    $(this).parent().remove();
    if ($(this).parent().remove()) {
        deleteEvent(this.id);
    }
});
*/


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


function clearFields() {

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

userEventsHistory();