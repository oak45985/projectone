// API Key for NPS: yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw  Hiking BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw

var getLatLong = function() {
    // geocoding
    var apiUrl = "https://developer.nps.gov/api/v1/activities/parks?id=BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA&sort=&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                    console.log(data.data[0].parks)
            });
        }  else {
            console.log("something aint right");
        }
    });
};


// var getLatLongTwo = function() {
//     // geocoding
//     var apiUrl = "https://developer.nps.gov/api/v1/parks?api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw"

//     fetch(apiUrl).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                     console.log(data.data[0].latLong);
//                     console.log(data.data);
//             });
//         }  else {
//             console.log("something aint right");
//         }
//     });
// };

// 
// GEOLOCATION START for CURRENT POSITION
// 

navigator.geolocation.getCurrentPosition(onSuccess);

function onSuccess(position) {
    const {
        latitude,
        longitude
    } = position.coords;
    console.log(`Your location: (${latitude},${longitude})`);
    console.log(latitude, longitude);
    console.log(position);

    reverseGeocode(latitude, longitude);
}

function reverseGeocode(latitude, longitude) {

var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=7fe9a570ce699e734be31068fc9c9690"

fetch(apiUrlGeo).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data[0].state);
        });
    }  else {
        console.log("something aint right");
    }
});

};

// 
// GEOLOCATION END for CURRENT POSITION
// 

// 
// GEOLOCATION START for COORDINATE INPUT
// 

var latitude = 63.004049
var longitude = -152.363762

function reverseGeocodeStateInput() {

    var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=7fe9a570ce699e734be31068fc9c9690"
    
    fetch(apiUrlGeo).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data[0].state);
            });
        }  else {
            console.log("something aint right");
        }
    });
};

reverseGeocodeStateInput();

// 
// GEOLOCATION END for COORDINATE INPUT
// 

getLatLong();
// getLatLongTwo();