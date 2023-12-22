/* eslint-disable */

export const displayMap = (locations) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1yY25jYmtjMzYiLCJhIjoiY2xvZnhmdHB4MDI3YzJqbnZyaTRnbndlMCJ9.e8RfTtexXZ5_fx_W-GPVOw';

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        scrollZoom: false
        // center: [-73.997043, 40.769304],
        // zoom: 7,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {

        //* Create marker
        const el = document.createElement("div");
        el.className = "marker";

        //* Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);

        //* Add popup
        new mapboxgl.Popup({ offset: 30 }).setLngLat(loc.coordinates).setHTML(`<h5>Day ${loc.day}: ${loc.description}</h5>`).addTo(map);

        //* Extend map bounds to include current location
        bounds.extend(loc.coordinates);

    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};