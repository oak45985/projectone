// API Key for NPS: yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw  Hiking BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA

// https://developer.nps.gov/api/v1/parks?stateCode=TX&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw

// var getParkActivities = function() {
//     // geocoding
//     var apiUrl = "https://developer.nps.gov/api/v1/activities/parks?stateCode=TX&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw"

//     fetch(apiUrl).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 console.log("getParkActivities start");    
//                 console.log(data)
//                 console.log(data.data[17].parks)
//                 console.log("getParkActivities end");
//             });
//         }  else {
//             console.log("something aint right");
//         }
//     });
// };

function distance(lat1, lat2, lon1, lon2)
{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 3956;

// calculate the result
return(c * r);

}



const stateAbbrev = [
    {full: 'Alabama', st: 'AL'},
    {full: 'Alaska', st: 'AK'},
    {full: 'Arizona', st: 'AZ'},
    {full: 'Arkansas', st: 'AR'},
    {full: 'California', st: 'CA'},
    {full: 'Colorado', st: 'CO'},
    {full: 'Connecticut', st: 'CT'},
    {full: 'Delaware', st: 'DE'},
    {full: 'Florida', st: 'FL'},
    {full: 'Georgia', st: 'GA'},
    {full: 'Hawaii', st: 'HI'},
    {full: 'Idaho', st: 'ID'},
    {full: 'Illinois', st: 'IL'},
    {full: 'Indiana', st: 'IN'},
    {full: 'Iowa', st: 'IA'},
    {full: 'Kansas', st: 'KS'},
    {full: 'Kentucky', st: 'KY'},
    {full: 'Louisiana', st: 'LA'},
    {full: 'Maine', st: 'ME'},
    {full: 'Maryland', st: 'MD'},
    {full: 'Massachusetts', st: 'MA'},
    {full: 'Michigan', st: 'MI'},
    {full: 'Minnesota', st: 'MN'},
    {full: 'Mississippi', st: 'MS'},
    {full: 'Missouri', st: 'MO'},
    {full: 'Montana', st: 'MT'},
    {full: 'Nebraska', st: 'NE'},
    {full: 'Nevada', st: 'NV'},
    {full: 'New Hampshire', st: 'NH'},
    {full: 'New Jersey', st: 'NJ'},
    {full: 'New Mexico', st: 'NM'},
    {full: 'New York', st: 'NY'},
    {full: 'North Carolina', st: 'NC'},
    {full: 'North Dakota', st: 'ND'},
    {full: 'Ohio', st: 'OH'},
    {full: 'Oklahoma', st: 'OK'},
    {full: 'Oregon', st: 'OR'},
    {full: 'Pennsylvania', st: 'PA'},
    {full: 'Rhode Island', st: 'RI'},
    {full: 'South Carolina', st: 'SC'},
    {full: 'South Dakota', st: 'SD'},
    {full: 'Tennessee', st: 'TN'},
    {full: 'Texas', st: 'TX'},
    {full: 'Utah', st: 'UT'},
    {full: 'Vermont', st: 'VT'},
    {full: 'Virginia', st: 'VA'},
    {full: 'Washington', st: 'WA'},
    {full: 'West Virginia', st: 'WV'},
    {full: 'Wisconsin', st: 'WI'},
    {full: 'Wyoming', st: 'WY'},
    
]

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
var limitMiles = 500;
var latitude = 63.004049;
var longitude = -152.363762;
const selectedActivities = ['Hiking', 'Canoeing','Fishing'];

function reverseGeocodeStateInput() {

    var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=7fe9a570ce699e734be31068fc9c9690"
    
    fetch(apiUrlGeo).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data[0].state);
                var state = stateAbbrev.find(person => person.full === data[0].state);
                console.log(state);
                var sT = state.st
                console.log(sT);
                getParkState(sT);
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

// var state = stateAbbrev.find(person => person.full === 'Alaska');
// console.log(state.st);

var getParkState = function(sT) {
    // geocoding
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + sT + "%2C&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(response) {

                    var parks = response.data;

                    var latLonArray = parks.map(function(park){
                        return {name: park.fullName, lat: park.latitude, lon: park.longitude, activities: park.activities};
                    });
                    console.log(latLonArray);

                    var updatedLatLonArray = latLonArray.filter(function(latLon){
                        if (distance(latitude,latLon.lat,longitude,latLon.lon) <= limitMiles) {
                            return true;
                        } else {
                            return false;
                        };
                    });
                    console.log(updatedLatLonArray);

                    const updatedUpdated = updatedLatLonArray.filter(function(park){
                        console.log(park.activities);
                        var activities = park.activities;

                        for (let x = 0; x < activities.length; x++) {
                            console.log(activities[x]);
                            
                        }

                        // If any of the selected activities is not in the list of the park's activities, we filter this park out
                        for(let i = 0; i < selectedActivities.length; i++) {
                          if (!activities.includes(selectedActivities[i])) {
                            return false;
                          }
                        }
                        // If they are all included then we return true (keep this park)
                        return true;
                    });
            });
        }  else {
            console.log("something aint right");
        }
    });
};

console.log(distance(50, 50.1, 30, 30.31));
// getParkActivities();
// getParkState();

// User sees a bunch of checkboxes

// User clicks on however many checkboxes of activities

// Grab all of the checked checkboxes and store them in an array
// const selectedActivities = ['Hiking', 'Fishing', 'Canoeing']

// const updatedUpdated = updatedLonLongArr.filter(function(park){
//   var activities = park.activities
//   // If any of the selected activities is not in the list of the park's activities, we filter this park out
//   for(let i = 0; i < selectedActivities.length; i++) {
//     if (!activities.includes(selectedActivities[i])) {
//       return false;
//     }
//   }
//   // If they are all included then we return true (keep this park)
//   return true;
// })