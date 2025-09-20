# Urbex Finder

This project is a web application that helps users find urban exploration (urbex) locations using Google Maps. It is built with a React frontend and a Node.js backend.

## Setup

### Prerequisites

- Node.js and npm installed
- A Google Maps API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Urbex-Finder.git
    cd Urbex-Finder
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### API Key Setup

1.  **Backend:**
    -   In the `backend` directory, create a `.env` file by copying the `.env.example` file.
    -   Open the `.env` file and replace `YOUR_API_KEY_HERE` with your Google Maps API key.

2.  **Frontend:**
    -   In the `frontend` directory, create a `.env` file by copying the `.env.example` file.
    -   Open the `.env` file and replace `YOUR_API_KEY_HERE` with your Google Maps API key.

## Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    node server.js
    ```
    The backend server will start on `http://localhost:5000`.

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm start
    ```
    The frontend application will open in your browser at `http://localhost:3000`.

## How to Use

1.  Open the application in your browser.
2.  Enter a location (e.g., a city or address) in the search bar.
3.  Select a category from the dropdown menu.
4.  Click the "Search" button.
5.  The map will update with markers for the locations that match your search.
6.  Click on a marker to see more information about the location.
