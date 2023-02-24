# Simple line chart

## Assignment

Using React and the d3 library https://d3js.org/, create a simple line chart.
Simulate loading data into the chart (attached).
When hovering over the points on the chart, auxiliary lines projected onto the x and y axes should be displayed.
Add a grid to the chart and a button that changes the background color of the chart. Each click changes the color to the next one from a predefined array of colors.
For those interested (optional): add zoom from the d3 library, so that the chart can be zoomed in and out using the scroll.

## Local App

To run the Web app locally, follow these steps:

1. Clone or download the repository to your local machine
2. Open a terminal or command prompt in the root directory of the project
3. Run the following command to install all dependencies:

```
npm install
```

4. Once the dependencies have been installed, run the following command to start the app:

```
npm run start
```

5. This script will serve the data via json-server on port 3002, while the web app will be hosted on port 3001

6. You can visit your web app in the web browser on `localhost:3001`.

7. If the app for some reason not working, make sure you have json-server installed correctly, if not, run

```
npm install -g json-server
```
Alternatively, one of the ports might be already in use.