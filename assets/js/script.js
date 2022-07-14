// API Key for NPS: yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw  Hiking BFF8C027-7C8F-480B-A5F8-CD8CE490BFBA
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

var lineElementEl = document.getElementById("line");
var submitBtnEl = document.querySelector("#submitbtn");
var selectedActivities = [];

// 
// START get Activities
function printItems(event) {
    event.preventDefault();
    selectedActivities = [];
    if (document.querySelector("#Hiking").checked) {
        selectedActivities.push("Hiking");
    }
    if (document.querySelector("#Camping").checked) {
        selectedActivities.push("Camping");
    }
    if (document.querySelector("#Fishing").checked) {
        selectedActivities.push("Fishing");
    }
    console.log(selectedActivities);
};
// END get Activities
// 
// calculate distance between lat/lon points
function distance(lat1, lat2, lon1, lon2)
{

lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

let r = 3956;

return(c * r);

};
// END calculate distance between lat/lon points
// 

function chooseLocation(event) {
    event.preventDefault();
    if (document.querySelector("#current-geo").checked) {
        navigator.geolocation.getCurrentPosition(onSuccess);
        onSuccess(position);
    } else {
        reverseGeocodeStateInput();
    }
}

// 
// GEOLOCATION START for CURRENT POSITION

function onSuccess(position) {
    const {
        latitude,
        longitude
    } = position.coords;

    reverseGeocode(latitude, longitude);
}

function reverseGeocode(latitude, longitude) {

var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=7fe9a570ce699e734be31068fc9c9690"

fetch(apiUrlGeo).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            var state = stateAbbrev.find(person => person.full === data[0].state);
            var sT = state.st;
            getParkState(sT, latitude,longitude);
        });
    }  else {
        console.log("something aint right");
    }
});

};
// 
// GEOLOCATION END for CURRENT POSITION

// 
// GEOLOCATION START for City, ST INPUT
function reverseGeocodeStateInput() {
    // event.preventDefault();
    var cityEl = document.getElementById("city").value;
    var stateEl = document.getElementById("multi-state").value;

    var apiUrlGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityEl + "," + stateEl + "," + "US&limit=1&appid=7fe9a570ce699e734be31068fc9c9690"
    
    fetch(apiUrlGeo).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon
                var sT = stateEl;
                getParkState(sT, latitude, longitude);
            });
        }  else {
            console.log("something aint right");
        }
    });
};
 // GEOLOCATION END for City, ST INPUT
// 

var getParkState = function(sT, latitude, longitude) {
    // geocoding
    var apiUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + sT + "%2C&api_key=yybIcE0sfUB4sAAd0pJkOErlOxwfBed2vqtPbYDw"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(response) {
                    var limitMiles = [];
                    var parks = response.data;
                    var limitMiles = document.getElementById("milesTravel").value;
                    console.log(limitMiles);
                    console.log(parks);

                    // resituate the items for only what we need park name, lat, lon, activities[]
                    var latLonArray = parks.map(function(park){
                        return {name: park.fullName, address: park.addresses, lat: park.latitude, lon: park.longitude, activities: park.activities, images: park.images};
                    });
                    console.log(latLonArray);
                    // filter parks by calculating distance input [distance();] formula
                    var filteredParksArray = latLonArray.filter(function(park){
                        const withinDistance = distance(latitude,park.lat,longitude,park.lon) <= limitMiles;
                        
                        const activityIntersection = park.activities.filter(function(activity) {
                            return selectedActivities.includes(activity.name); 
                        });

                        const validActivities = activityIntersection.length === selectedActivities.length;
                        // console.log(park.name,activityIntersection);
                        return withinDistance && validActivities;
                        
                    });
                    displayItems(filteredParksArray);
                    saveParks(filteredParksArray);
                    // display(filteredParksArray);

            });
        }  else {
            console.log("something aint right");
        }
    });
};


function displayItems(filteredParksArray) {
    // console.log(filteredParksArray);

    for (var i=0; i < filteredParksArray.length; i++) {

    var parkDivEl = document.createElement("div");
    parkDivEl.className="pure-u-1 pure-g searchqueries";
    lineElementEl.appendChild(parkDivEl)

    var parkNameEl = document.createElement("h2");
    parkNameEl.className = "pure-u-1 center";
    parkNameEl.textContent = filteredParksArray[i].name;
    parkDivEl.appendChild(parkNameEl);

    var parkImageEl = document.createElement("div");
    parkImageEl.className = "pure-u-1 center";
    parkImageEl.id = "park-image"
    parkImageEl.innerHTML = "<img src='"+ filteredParksArray[i].images[0].url + "' alt='" + filteredParksArray[i].images[0].altText + "'/>";
    parkNameEl.appendChild(parkImageEl);

    var parkAddressEl = document.createElement("p");
    parkAddressEl.className = "pure-u-1 center";
    var parkAdAdd = filteredParksArray[i].address[0].line1;
    var parkAdCity = filteredParksArray[i].address[0].city;
    var parkAdSt = filteredParksArray[i].address[0].stateCode;
    var parkAdPost = filteredParksArray[i].address[0].postalCode;
    parkAddressEl.textContent = parkAdAdd + " " + parkAdCity + ", " + parkAdSt + "  " + parkAdPost;
    parkImageEl.appendChild(parkAddressEl);

    // var parkWeatherEl = document.createElement("p");
    // var parkTempEl = document.createElement("p");
    // var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + filteredParksArray[i].lat + "&lon=" + filteredParksArray[i].lon + "&units=imperial&appid=7fe9a570ce699e734be31068fc9c9690";
    // fetch(weatherUrl).then(function(response) {
    //     if(response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);
    //             var temp = data.main.feels_like;
    //             var overall = data.weather[0].description;
    //             parkTempEl.className = "pure-1-2";
    //             parkTempEl.textContent = temp + "°F, ";
    //             parkAddressEl.appendChild(parkTempEl);
    //             parkWeatherEl.className = "pure-1-2";
    //             parkWeatherEl.textContent = overall;
    //             parkAddressEl.appendChild(parkWeatherEl);

    //         });
    //     } else {
    //         console.log("something aint right");
    //     }
    // });
    
    };

}

var allItems = function(event) {
    event.preventDefault();
    var searchQueries = document.getElementsByClassName("pure-u-1 pure-g searchqueries");
    searchQueries.remove();
}

var saveParks = function(filteredParksArray) {
    localStorage.setItem("parks", JSON.stringify(filteredParksArray));
}

var loadParks = function() {
    var savedParks = localStorage.getItem("parks");

    if (!savedParks) {
        return false;
    }

    savedParks = JSON.parse(savedParks);

    for (var i = 0; i < 1; i++) {
        displayItems(savedParks);
    }
};


submitBtnEl.addEventListener('click', allItems);
submitBtnEl.addEventListener('click',printItems);
submitBtnEl.addEventListener('click',chooseLocation);
loadParks();