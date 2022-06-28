mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGF2YWlkIiwiYSI6ImNsM3U4bHR3bjI4ZWUzaW9leGlrbXN2ZmcifQ.JA7tcQL3G1x8i7fZuWw2nA';

var map = new mapboxgl.Map({
  container: "map",
  projection: 'albers',
  style:  "mapbox://styles/mishavaid/cl4irdogp003815nyyybwxmjc",
  zoom: 5.5,
  maxZoom: 9,
  minZoom: 3,
  center: [-82.9, 28.2]

})


map.on("load", function () {
  map.resize();
    map.addLayer({
      id: "florida",
      type: "line",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/mishavaid7/mapping-datasets/main/finalFire.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    });
    map.addLayer({
      id: "wildfire",
      type: "fill",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/mishavaid7/mapping-datasets/main/finalFire.geojson",
      },
      maxzoom: 7, 
      minzoom: 5,
      "paint": {
        "fill-color": [
          "match",
          ["get", "naturalBreaks"],
          "19-38", "#efc22f",
          "38-74", "#ed9223",
          "74-86", "#e75d1e",
          "86-96", "#bd3f37",
          "96-100", "#7f3835",
          "#ffffff",
        ],
    }
    }, "waterway-label");
  });

  // Create the popup
map.on('click', 'wildfire', function (e) {
    var countyName = e.features[0].properties.county_name;
    var burnedHousing = e.features[0].properties.units_exposed.toLocaleString('en-US');
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+ '<strong>' + countyName + '</strong>' + '</h4>'
            + '<h4>' + 'Number of units at risk from wildfires:' + " " + '<strong>' + burnedHousing + '</strong>' + '</h4>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the map
map.on('mouseenter', 'wildfire_numbers', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'wildfire_numbers', function () {
    map.getCanvas().style.cursor = '';
});