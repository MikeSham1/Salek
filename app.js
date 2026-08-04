const places = [
  "Downtown Hub",
  "Riverside Cafe",
  "North Station",
  "Harbor Point",
  "Green Park",
  "Sunset Plaza"
];

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
const routeLine = document.getElementById("routeLine");
const planBtn = document.getElementById("planBtn");
const startBtn = document.getElementById("startBtn");

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
    routeLine.style.width = "0%";
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
  routeLine.style.width = "78%";
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
  routeLine.style.width = "92%";
});

originSelect.addEventListener("change", renderRoute);
destinationSelect.addEventListener("change", renderRoute);
populatePlaces();
renderRoute();
