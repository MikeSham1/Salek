const places = [
  "Downtown Hub",
  "Riverside Cafe",
  "North Station",
  "Harbor Point",
  "Green Park",
  "Sunset Plaza"
];

const placeCoordinates = {
  "Downtown Hub": { lat: 40.758, lng: -73.9855 },
  "Riverside Cafe": { lat: 40.762, lng: -73.9712 },
  "North Station": { lat: 40.782, lng: -73.9747 },
  "Harbor Point": { lat: 40.728, lng: -74.0013 },
  "Green Park": { lat: 40.742, lng: -73.9859 },
  "Sunset Plaza": { lat: 40.769, lng: -73.9586 }
};

const routes = {
  "Downtown Hub|Riverside Cafe": {
    title: "Downtown to Riverside",
    distance: "3.2 km",
    eta: "12 min",
    summary: "Fast route via Main Avenue with a smooth, low-traffic path.",
    steps: [
      "Head north on Maple Street.",
      "Turn right at Central Avenue.",
      "Follow the riverfront signs for 1.4 km.",
      "Arrive at Riverside Cafe."
    ]
  },
  "North Station|Sunset Plaza": {
    title: "North Station to Sunset Plaza",
    distance: "5.7 km",
    eta: "19 min",
    summary: "A scenic route using the skyline loop and park access.",
    steps: [
      "Take the eastbound express lane.",
      "Merge onto Beacon Boulevard.",
      "Continue along the park edge.",
      "Turn left near Sunset Plaza."
    ]
  },
  "Harbor Point|Green Park": {
    title: "Harbor Point to Green Park",
    distance: "4.1 km",
    eta: "15 min",
    summary: "Direct route with pedestrian-friendly intersections.",
    steps: [
      "Leave Harbor Point through the eastern gate.",
      "Cross Market Bridge.",
      "Follow the bike lane into Green Park.",
      "You have arrived."
    ]
  }
};

const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
const routeTitle = document.getElementById("routeTitle");
const distanceLabel = document.getElementById("distanceLabel");
const timeLabel = document.getElementById("timeLabel");
const summaryText = document.getElementById("summaryText");
const directionsList = document.getElementById("directionsList");
const statusBadge = document.getElementById("statusBadge");
const mapStatus = document.getElementById("mapStatus");
const planBtn = document.getElementById("planBtn");
const startBtn = document.getElementById("startBtn");
let mapInstance = null;
let startMarker = null;
let destinationMarker = null;

function populatePlaces() {
  places.forEach((place) => {
    const option = document.createElement("option");
    option.value = place;
    option.textContent = place;
    originSelect.appendChild(option.cloneNode(true));
    destinationSelect.appendChild(option.cloneNode(true));
  });

  originSelect.value = "Downtown Hub";
  destinationSelect.value = "Riverside Cafe";
}

function updateMapView() {
  if (!window.google?.maps || !mapInstance) {
    if (mapStatus) {
      mapStatus.textContent = "Replace YOUR_GOOGLE_MAPS_API_KEY with a real key to view the live map.";
    }
    return;
  }

  const originLocation = placeCoordinates[originSelect.value] || placeCoordinates["Downtown Hub"];
  const destinationLocation = placeCoordinates[destinationSelect.value] || placeCoordinates["Riverside Cafe"];

  if (!startMarker) {
    startMarker = new window.google.maps.Marker({
      position: originLocation,
      map: mapInstance,
      title: originSelect.value
    });
  } else {
    startMarker.setPosition(originLocation);
  }

  if (!destinationMarker) {
    destinationMarker = new window.google.maps.Marker({
      position: destinationLocation,
      map: mapInstance,
      title: destinationSelect.value
    });
  } else {
    destinationMarker.setPosition(destinationLocation);
  }

  const bounds = new window.google.maps.LatLngBounds();
  bounds.extend(originLocation);
  bounds.extend(destinationLocation);
  mapInstance.fitBounds(bounds);

  if (mapStatus) {
    mapStatus.textContent = `Showing ${originSelect.value} to ${destinationSelect.value}`;
  }
}

function renderRoute() {
  const key = `${originSelect.value}|${destinationSelect.value}`;
  const route = routes[key];

  if (!route) {
    routeTitle.textContent = "Custom route";
    distanceLabel.textContent = "--";
    timeLabel.textContent = "--";
    summaryText.textContent = "Choose two different stops to generate a route.";
    directionsList.innerHTML = "";
    statusBadge.textContent = "Ready";
    return;
  }

  routeTitle.textContent = route.title;
  distanceLabel.textContent = route.distance;
  timeLabel.textContent = route.eta;
  summaryText.textContent = route.summary;
  directionsList.innerHTML = route.steps
    .map((step) => `<li>${step}</li>`)
    .join("");
  statusBadge.textContent = "Planned";
  updateMapView();
}

planBtn.addEventListener("click", () => {
  renderRoute();
});

startBtn.addEventListener("click", () => {
  const route = routes[`${originSelect.value}|${destinationSelect.value}`];
  if (!route) {
    statusBadge.textContent = "No route";
    return;
  }

  statusBadge.textContent = "En route";
});

originSelect.addEventListener("change", renderRoute);
destinationSelect.addEventListener("change", renderRoute);
populatePlaces();
renderRoute();

window.initMap = function () {
  const mapElement = document.getElementById("map");
  if (!mapElement || !window.google?.maps) {
    if (mapStatus) {
      mapStatus.textContent = "Google Maps could not be loaded. Replace YOUR_GOOGLE_MAPS_API_KEY with a real key.";
    }
    return;
  }

  mapInstance = new window.google.maps.Map(mapElement, {
    center: placeCoordinates["Downtown Hub"],
    zoom: 12,
    mapTypeControl: false,
    streetViewControl: false
  });

  updateMapView();
};
