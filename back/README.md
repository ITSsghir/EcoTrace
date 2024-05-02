# API

## Prerequisites

Before running the API, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Yarn
- Docker
- Docker Compose

## Installation

To install the API, follow these steps:

1. Run `yarn install` to install the dependencies.
2. Run `yarn start` to start the API.

> Note: The API will be running on `http://localhost:3000`.
>
> You have to set up the database before running the API. To do this, run `yarn setup-db`.

## Usage

To use the API, you can send requests to the following endpoints:

- `POST /login`: Log in to the API.
- `POST /register`: Register a new user.
- `GET /logout`: Log out of the API.
- `GET /protected`: Get a protected resource (requires authentication).
