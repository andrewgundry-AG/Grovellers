const routes = [
    {
        file: "GPX/48KM Gravel to Blackbushe CCW.gpx",
        title: "Gravel Ride to Blackbushe CCW",
        description: "text desciption goes here."
    },
    {
        file: "GPX/60KM Gravel ride to Blackbushe CW.gpx",
        title: "60KM Gravel ride to Blackbushe CW",
        description: "text desciption goes here."
    },
{
        file: "GPX/71KM Gravel ride to Pamber Forest.gpx",
        title: "71KM Gravel ride to Pamber Forest",
        description: "text desciption goes here."
    }
];

const container = document.getElementById("routes");

routes.forEach((route, index) => {

    const card = document.createElement("div");
    card.className = "route-card";

    const mapDiv = document.createElement("div");
    mapDiv.className = "map-container";
    mapDiv.id = "map" + index;

    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "route-description";

    descriptionDiv.innerHTML = `
        <h2>${route.title}</h2>
        <p>${route.description}</p>
        <div class="route-stats" id="stats${index}"></div>
    `;

    card.appendChild(mapDiv);
    card.appendChild(descriptionDiv);
    container.appendChild(card);

    const map = L.map(mapDiv.id, {
        zoomControl: false,
        attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    new L.GPX(route.file, {
        async: true,
        polyline_options: {
            color: '#000',
            weight: 6,
            opacity: 0.9
        }
    }).on('loaded', function(e) {

        map.fitBounds(e.target.getBounds());

        const distance = (e.target.get_distance() / 1000).toFixed(2);
        const elevation = e.target.get_elevation_gain().toFixed(0);
        const time = (e.target.get_total_time() / 3600).toFixed(2);

        document.getElementById("stats" + index).innerHTML = `
            <div>Distance: ${distance} km</div>
            <div>Elevation Gain: ${elevation} m</div>
            <div>Estimated Time: ${time} hrs</div>
        `;
    }).addTo(map);
});
