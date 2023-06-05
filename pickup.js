
const end = [3.370048, 6.524883];
let start = [];
let marker, route, distanceOfTravel, theOfficeLocation;


let accessToken = 'pk.eyJ1IjoibS1hbmQtYy1kaXZpbmUtdW5pdmVyc2FsIiwiYSI6ImNsZjIxOXdhczBhdmczdW54ZW9uczRheTkifQ.t-2cs9WnBGjoGoQ22POGjg';
mapboxgl.accessToken = 'pk.eyJ1IjoibS1hbmQtYy1kaXZpbmUtdW5pdmVyc2FsIiwiYSI6ImNsZjIxOXdhczBhdmczdW54ZW9uczRheTkifQ.t-2cs9WnBGjoGoQ22POGjg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [3.303280,6.564343], // starting position [lng, lat]
    zoom: 10, // starting zoom
    projection: 'globe',
});


async function getRoute(begin) {
  // make a directions request using driving profile
  // a start position will always change
  // only the end or destination will remain the same
  try {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${begin[0]},${begin[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    if (query.ok) {
      const json = await query.json();
      console.log(`this is begin ${begin}`);
      const data = json.routes[0];
      route = data.geometry.coordinates;
      distanceOfTravel = data.distance;
      console.log(distanceOfTravel);
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
    
      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource('route')) {
        console.log('means its true');
        console.log(geojson);
        map.getSource('route').setData(geojson);
          
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: geojson
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
      // add turn instructions here at the end
      pickUpOrder();
    } 
  } catch (error) {
    handleError ()
  }
  
  
}

map.on('load', () => {

  // creating a popup
  const officePopup = new mapboxgl.Popup({
    closeButton: true,
    clickToClose: true,
    offset: 20,
    focusAfterOpen: false
  })
  .setHTML('<h3>M&C</h3>');
  
  
  

  // creating and adding office location to the map
  theOfficeLocation = new mapboxgl.Marker({
    draggable: false,
    color: 'green',
    scale: 0.6
  }).setLngLat(end).setPopup(officePopup).addTo(map);

  theOfficeLocation.getCanvas().style.cursor = 'pointer';

  // this is where the code from the next step will go
  
});



// function to generate the users location on click of geolocate button
function userLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      
      if(!marker) {

        start[0] = position.coords.longitude
        start[1] = position.coords.latitude
      }

      // console.log(start);

      // adding a new marker at user approx location
      // i want it that when there is already a marker on the map for the users loc, another shouldnt get added when d user clicks the geolocate button again mistakenly
      
      if (!marker) {

        marker = new mapboxgl.Marker({
          draggable: true,
          scale: 0.6,
        
          // this is color blue for the users location icon
          color: '#4164FB'
        })
        .setLngLat(start)
        .addTo(map)
      }
      
      
      // adding event listener to user location icon
      marker.on('dragend', (e) => {
        // destructring the event object to get the coords of user
        let {lng:longitude, lat:latitude} = e.target._lngLat
        // converting the coordinates to numbers from string using the unary plus operator 
        start[0] = +longitude.toFixed(6);
        start[1] = +latitude.toFixed(6);
        
      });
     
    })
    
  }
}

// obtaining route details, as well as cost via funcs respectively
document.querySelector('#direct').addEventListener('click', () => {
  getRoute(start);
  pickUpOrder();
});

document.querySelector('.locate').addEventListener('click', userLocation);

// calculate the cost against distance for parcel pick up
function pickUpOrder () {
  const totalDistanceText = document.querySelector('#total-distance-text');
  const totalDistanceValue = document.querySelector('#total-distance-value');
  const totalCostText = document.querySelector('#total-cost-text');
  const totalCostValue = document.querySelector('#total-cost-value');
  totalDistanceText.innerHTML = `<span>Total Distance:</span>`;
  totalDistanceValue.innerHTML = `<h2>${(+distanceOfTravel/1000).toFixed(2)} KM</h2>`;
  totalCostText.innerHTML = `<span>Total Cost:</span>`;
  totalCostValue.innerHTML = `<h2>${Math.ceil(((+distanceOfTravel/1000).toFixed(2)) * 250)} Naira</h2>`;
}

// handling error when fetching route fails
function handleError () {
  if (!distanceOfTravel) {
    document.querySelector('#cost-summary').style.display = 'none'
    document.querySelector('#distance-summary').style.display = 'none'
    document.querySelector('#error-text').innerText = 'Oops! Couldn\'t fetch route details at the moment. please try again..'
    console.log('there was an error');
  }
}