# Reddit Clone

This is a full stack web application modeled after Reddit. The objective was to include the core features of the platform, including users, profiles, subreddits, posts, comments, trending posts, and upvotes. This project was built with PostgreSQL, ExpressJS, ReactJS, and NodeJS - and is deployed through Netlify at https://redditv2.netlify.app/.

# Overview

- [Overview](#overview)
  - [Font-end](#front-end)
    - [Technologies Used](#technologies-used)
    - [Dependencies](#dependencies)
  - [Back-end](#back-end)
    - [Technologies Used](#technologies-used-1)
    - [Dependencies](#dependencies-1)
    - [Authentication](#authentication)
    - [Routes Available](#routes-available)

## Front-end

### Technologies Used

- [JavaScript](https://www.javascript.com/)
- [NodeJS](https://nodejs.org/en/)
- [Netlify](https://www.netlify.com/) - A free website hosting service

### Dependencies

- [ReactJS](https://reactjs.org/) - A client-side JavaScript library for building interfaces
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [React-Router](https://www.npmjs.com/package/react-router) - A package providing dynamic routing functionality for web apps
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) - A package containing the DOM bindings for react-router

## Back-end 

### Technologies Used

- [NodeJS](https://nodejs.org/en/) - An event-driven JavaScript runtime designed to build scalable network applications
- [ExpressJS](https://www.heroku.com/) - A NodeJS framework used for server side development
- [PostgreSQL](https://expressjs.com/) - An open source SQL database

### Dependencies

- [Django](https://www.djangoproject.com/) - A high level Python Web Framework
- [Django Rest Framework](https://www.django-rest-framework.org/) - A Django extension for building APIs

### Authentication

In order to sign up or sign in, you must veryfy your identity with google authentication

### Routes Available

The following routes are available

| **Route name**  | **URL**                 | **HTTP Verb** | **Description**                                                         |
| --------------- | ----------------------- | ------------- | ----------------------------------------------------------------------- |
| Index*          | /{resource}             | GET           | Display a list of all Project or Comment                                |
| Show ID*        | /{resource}/{:id}       | GET           | Display a specific Project or Comment based on their ID                 |
| Create*         | /{resource}/create      | POST          | Add new Project or Comment to the database, returns the newly created entry |
| Edit By Id*     | /{resource}/{:id}       | PUT           | Update a particular Game or Review, returns the new entry               |
| Delete By Id*   | /{resource}/{:id}       | DELETE        | Delete a particular Game or Review                                      |
| Login           | /users/login            | POST          | Logs in with a username and password, returns an authentication token   |
| Create          | /users/create           | POST          | Creates a user and returns an authentication token                      |

Routes marked with `*` need authentication to be accessed
