# Travel App

## Project Description

The Travel App is a web application that allows users to plan their trips by entering a destination and a travel date. The app fetches weather information and an image of the destination from various APIs and displays the details on the page.

## Technologies Used

- **HTML, SCSS, and JavaScript** for the front-end
- **Node.js and Express.js** for the back-end server
- **Webpack** for building and bundling the application
- **GeoNames, Weatherbit, and Pixabay APIs** for data retrieval

## Prerequisites

- **Node.js** (v22.4.0)
- **npm** (version 10.8.2)

## Installation Instructions

1. Clone the repository:

   ```bash
    git clone https://github.com/yourusername/travel-app.git


2. Install the required dependencies:
   ```bash
     npm ci

3. API Keys Setup
The app relies on API keys for accessing the GeoNames, Weatherbit, and Pixabay services. Follow these steps to configure the API keys:

- Create a .env file in the root directory of the project.
- Add the following lines to the .env file, replacing YOUR_API_KEY with your actual API keys:

   ```bash
     GEONAMES_USERNAME=YOUR_GEONAMES_USERNAME
     WEATHERBIT_API_KEY=YOUR_WEATHERBIT_API_KEY
     PIXABAY_API_KEY=YOUR_PIXABAY_API_KEY

- If you are not using dotenv, update the API keys directly in the respective files:

  - **GeoNames**: Update the username in src/server/geonames.js.
  - **Weatherbit**: Update the API key in src/server/weatherbit.js.
  - **Pixabay**: Update the API key in src/server/pixabay.js.


## Usage
- To run the app in development mode:

   ```bash
     npm run build-dev


- To build the app for production:

   ```bash
     npm run build-prod


- To start the server:

bash
Copy code
npm start
Future Improvements
Add user authentication for personalized trip planning.
Implement a feature for saving and sharing trip itineraries.
Improve the UI with responsive design enhancements.
Additional Resources
For more tips on writing excellent README files, check out:

Make a README
Basic writing and formatting syntax
vbnet
Copy code

This version includes information on setting up API keys, installation instructions, usage commands, and future improvements. It also maintains the use of correct markdown and project-specific text as suggested.
```
