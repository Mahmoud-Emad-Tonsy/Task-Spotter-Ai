# FMSCA Data Viewer

## Task  Description

This Task is a React-based web application designed for a US company offering autonomous dispatching to long-haul spot market trucking. The application fetches and displays data from an external CSV source, efficiently handling large datasets of up to 100,000 records. It provides a dynamic table view with filtering capabilities, allowing users to search and sort through data. The interface also includes skeleton loading indicators to enhance the user experience during data retrieval.

## Features

- Efficiently handles and displays up to 100,000 data records.
- Fetches data from a CSV URL using the PapaParse library.
- Displays data in a user-friendly Material-UI table.
- Includes dynamic filters for each column to facilitate data search.
- Uses skeleton loaders to indicate the data loading state, ensuring a smooth user experience.

## Dependencies

- React
- PapaParse
- Material-UI

## Steps to Run the Project

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the application using `npm start`.

# Note :warning: :warning:
if You have problem in install You Can Folow This Instructions  

## Clear npm cache
`npm cache clean --force`

## Remove existing node_modules and package-lock.json
rm -rf node_modules package-lock.json

## Install the dependencies
`npm install --legacy-peer-deps`.

## Start the application using
`npm start`

## Links

- **Live Deployment**: https://task-spotter-ai.vercel.app


