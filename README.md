# Calculator

This project is a simple calculator application using Angular for the frontend and NestJS for the backend, with MongoDB for data persistence.

## Prerequisites

Before you begin, ensure you have met the following requirements:

    Node.js (min version 18.13.x)
    npm (usually comes with Node.js)
    Angular CLI (latest version recommended)
    NestJS CLI (latest version recommended)

You can check your Node.js and npm versions by running:

bash

`node -v`

`npm -v`

To install the Angular CLI and NestJS CLI globally, run:

bash

`npm install -g @angular/cli`

`npm install -g @nestjs/cli`

## Project Structure

    The backend code (NestJS) resides in the backend directory.
    The frontend code (Angular) is located in the client directory.

# Getting Started
## Installing Dependencies

Backend:

`cd backend`

`npm install`

Frontend:

`cd client`

`npm install`

## Development Mode

To run both applications in development mode, where you can have hot reloading and debug features, start each application separately in its own terminal.

Backend:

bash

`cd backend`

`npm run start:dev`

Frontend:

bash

`cd client`

`ng serve`

The Angular application will be available by default at http://localhost:4200, and the NestJS API will serve at http://localhost:3000.

## Production Build and Start

By default, the application is already prepared for production 

bash

`cd backend`

`npm run start:prod`


To prepare for production, you need to build both the frontend and backend applications, and then serve them through the NestJS server, which also serves the static files generated by the Angular build.

### Build the Angular application:

bash

`cd client`

`ng build`

This command generates a `dist` directory inside client, containing the production build of your Angular app.

Move Angular build output to the NestJS public directory:

    Manually copy the contents of client/dist/client to backend/public.

### Build and start the NestJS application in production mode:

bash

`cd backend`

`npm install`

`npm run build`

`npm run start:prod`

This will start NestJS build and backend will serve the client at  http://localhost:3000.