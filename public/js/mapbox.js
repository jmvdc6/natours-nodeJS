export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoiam12ZGMiLCJhIjoiY2tsNW4zbWhtMjlmODMwbXM1bDg4eHAxMiJ9.eHPWQaQT7KKcAzJw_HFVRg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jmvdc/ckl5nmg174fha17mvgw4ugym0',
    scrollZoom: false,
    //   center: [-118.6919205, 34.0201613],
    //   zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add marker
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
