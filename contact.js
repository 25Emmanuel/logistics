let accessToken = 'pk.eyJ1IjoibS1hbmQtYy1kaXZpbmUtdW5pdmVyc2FsIiwiYSI6ImNsZjIxOXdhczBhdmczdW54ZW9uczRheTkifQ.t-2cs9WnBGjoGoQ22POGjg';
mapboxgl.accessToken = 'pk.eyJ1IjoibS1hbmQtYy1kaXZpbmUtdW5pdmVyc2FsIiwiYSI6ImNsZjIxOXdhczBhdmczdW54ZW9uczRheTkifQ.t-2cs9WnBGjoGoQ22POGjg';
const map = new mapboxgl.Map({
    container: 'map-location', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [3.303280,6.564343], // starting position [lng, lat]
    zoom: 10, // starting zoom
    projection: 'globe'
});

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
    }).setLngLat([3.370048, 6.524883]).setPopup(officePopup).addTo(map);

})