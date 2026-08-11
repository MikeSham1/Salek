# Salek Navigation

A simple starter navigation app built with plain HTML, CSS, and JavaScript.

## What it includes
- Route planner UI
- Destination selection
- Turn-by-turn directions
- A visual route map preview

## Run locally
Open `index.html` in your browser, or use one of the local server options below.

### Google Maps API
To see the live map, replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html` with a real Google Maps JavaScript API key.

### Image recognition (client-side)
The app now includes a client-side image recognition demo using TensorFlow.js and MobileNet. Open the app, choose an image from your device, and click `Predict` to see the top class predictions. This runs entirely in the browser — no server or credentials required.

### Image recognition API key support
A `config.js` placeholder has been added to support future API key imports. Replace the value in `config.js` with your image recognition provider key once you have one, and the app is ready to wire in server-backed or external AI services later.

### Commit of the day
The app also includes a small "Commit of the Day" helper panel that shows a fresh commit idea every time you open the page or click `New suggestion`.

### With npm
Install the local dependencies once:

```bash
npm install
```

Run the app:

```bash
npm start
```

Then open:

```text
http://127.0.0.1:8000/
```

### Without npm
Use Python's built-in static server:

```bash
python3 -m http.server 8000
```

Then visit `http://127.0.0.1:8000/`.

<!-- small daily update -->
