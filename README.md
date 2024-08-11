# Asset Trading Tracker

## Overview

The Asset Trading Tracker is a backend API built using Node.js, Express, and MongoDB. It allows users to create, update, and trade assets within a marketplace. Users can propose prices for assets, negotiate, and finalize trades. The application includes JWT-based authentication and follows RESTful principles.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Asset Management**: Create, update, and publish assets to the marketplace.
- **Marketplace**: View published assets, propose purchases, negotiate prices, and finalize trades.
- **Trading History**: Track the trading journey of assets, including price history and ownership changes.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### Clone the repository:

```bash
    git clone https://github.com/rajdhanwar-suraj/asset-trading-tracker.git
    cd asset-trading-tracker
```

# Install dependencies:

```
    npm install
```

# Environment variables

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

# Run the server:

Start the server using the following command:

```
npm run server
```
The server will start on http://localhost:5000.

# API Endpoints

# Authentication

POST /auth/signup: Register a new user.

POST /auth/login: Log in a user and receive a JWT.

# Asset Management

POST /assets/create: Create a new asset.

PUT /assets/update/:id: Update an existing asset.

GET /assets/:id: Get details of a specific asset.

GET /assets/: Get all assets owned by the logged-in user.

PUT /assets/publish/:id: Publish an asset to the marketplace.

# Marketplace

GET /marketplace/: View all published assets.

POST /marketplace/request/:id: Propose a purchase for a specific asset.

PUT /marketplace/negotiate/:id: Negotiate the price of a purchase request.

PUT /marketplace/accept/:id: Accept a purchase request and transfer ownership.

PUT /marketplace/deny/:id: Deny a purchase request.

GET /marketplace/requests: View all purchase requests made by the logged-in user.

# Testing

The application includes unit and integration tests using Jest and Supertest.

Run the tests:

```
npm test
```

# Technologies Used

Node.js: JavaScript runtime for building the server.

Express: Web framework for Node.js.

MongoDB: NoSQL database for storing asset and user data.

Mongoose: ODM for MongoDB, used to define schemas and interact with the database.

JWT: JSON Web Tokens for authentication.

Jest: JavaScript testing framework for unit and integration tests.

Supertest: HTTP assertions library for testing API endpoints.