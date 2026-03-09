const routes = [
    
    {
        file: "GPX/26KM Easy Gravel ride to 3 lakes.gpx",
        title: "Gravel Ride to 3 lakes CCW",
        description: "26km easy ride to 3 lakes - A short flat ride past California country park through Finchampstead and the lakes at Yateley looping back to the start at Peach Place."
    },
     {
        file: "GPX/29KM Easy Gravel loop from Cantley.gpx",
        title: "Gravel Ride to 3 lakes CCW",
        description: "9km from Cantley Park - Starting at Cantley Park and heading up towards Cabbage hill, out towards Moss End and looping round past Fernygrove farm, along to the polo club(don’t ride on the cinders track) past Billingbear golf course and back to Cantley."
    },
    {
        file: "GPX/48KM Gravel to Blackbushe CCW.gpx",
        title: "Gravel Ride to Blackbushe CCW",
        description: "48km to Blackbushe CCW - From Peach Place heading off towards Swallowfield, cutting through Wellington country park and Bramshill,down to the Pathfinder cafe at Blackbushe. Heading back to Wokingham taking the single tracks through Yateley and Gorrick Plantation"
    },
    {
        file: "GPX/60KM Gravel ride to Blackbushe CW.gpx",
        title: "60KM Gravel ride to Blackbushe CW",
        description: "60km to Blackbushe CW - Heading out of Wokingham and down through East berks golf club, along the edge of Wellington college and down to Minley looping round to Blackbushe for coffee at the Pathfinder cafe. Off through Bramshill and Eversley cutting through the tri lakes and heading  back through Simons wood to the start."
    },
    {
        file: "GPX/71KM Gravel ride to Pamber Forest.gpx",
        title: "71KM Gravel ride to Pamber Forest",
        description: "71km Pamber Forest - Heading out towards California country park and  Riseley then following the Roman walls at Silchester before looping round Padworth and heading in to Mortimer for coffee, then along towards Beech hill crossing the A33 and through Swallowfield, Arborfield  and back into Wokingham."
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
        <a href="${route.file}" download class="download-btn">Download GPX</a>
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
