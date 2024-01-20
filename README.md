# <p>AEC 2024 — Atlantic Engineering Competition — Fredericton, NB<p>

<p align="center"><img src="assets/pHGuard_Logo.png" style="width: 300px;"/></p>

## pHGuard 
pHGuard is a software designed to help farmers visualize and optimize the quality of their soil to maximize farming efficiency. The system uses an industry standard tech stack that can be found below.

## pHGuard-Backend
Public Repository for pHGuard backend

## Getting Started
To build the project from source, clone this repository and run it as shown below:

```sh
git clone https://github.com/AEC-2024/pHGuard-Backend.git
cd pHGuard-Backend
npm i
npm run dev
```

This will start a development server running on localhost:5000 and allow for the [frontend project](https://github.com/AEC-2024/pHGuard-Frontend) to interact with the database.

## Tech Stack
Express JS used to create REST API and endpoints for UI to call

AWS DynamoDB used to store data from CSV file - we timed database queries using the performance API, our time is logged in the console every time a query is made


## Software Design Architecture
This project uses a client-server architectural pattern which offers scalability, increases cohesion ,product management, abstracts business logic from UI and more. 

## Client-server architecture Diagram
<p align="center"><img width = "500" src="https://user.oc-static.com/upload/2020/04/28/15880577088892_15874712483517_export.png"></p>
image from openclassrooms.com



