<h1 align="center">
Challenge Equizilla API
</h1>

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Mongodb](	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

</div>

## Requirements:

Develop a mini application that demonstrates your skills in data extraction, storage, and
visualization. You have the freedom to choose the programming language and frameworks,
with JavaScript being preferred. The application should consist of the following functionalities
and can be completed within a week.
Requirements:


* Data Extraction: Implement an endpoint that retrieves data from a specified source. This could be an API, a web scraper, or any other data extraction method. Customize the endpoint to accept parameters for filtering or searching specific data, if applicable. (Examples for this would be a weather API, news API, movies API,
Twitter API, or anything you consider suitable).

* Data Storage: Store the extracted data in a database of your choice. You can opt for
SQL-based databases like MySQL, NoSQL databases like MongoDB, or any other
suitable option. Ensure that the data is appropriately structured and stored for
efficient retrieval and analysis.

## Development

### Previous requirements

* Have installed a version 14 or higher of [Node Js](https://nodejs.org/en)

### Setup

The project repository should be cloned:
```
git clone https://github.com/CristhianLeal/CriptoTest-back.git
```

### Install the dependencies: 

```
npm install 
```
### Additional Information and clarifications

* In order to deploy the project, it is necessary to complete the .env file in the way it is in the .env.example example

* For the correct functioning of the project, the Frontend and the Backend are necessary


### Available Scripts

| Script         | Descripción                                         |
| -------------- | --------------------------------------------------- |
| npm run lint   | Checks for style errors                             |
| npm run dev    | Start the server in development mode                |
| npm start      | Start the server in production mode                 |  


## Dependencias 
- [cors](https://github.com/expressjs/cors#readme) Proporciona un middleware para conectar express.
- [dotenv](https://github.com/motdotla/dotenv#readme) Carga las variables de entorno desde el archivo .env
- [express](https://expressjs.com/) framework para Node.js.
- [axios](https://axios-http.com/) Promise-based HTTP client for making asynchronous requests in browser and Node.js environments
- [mongoose](https://mongoosejs.com/) MongoDB object modeling tool designed to work in an asynchronous environment, providing a schema-based solution for data modeling in Node.js

## Estructura de carpetas

```
CRIPTOTEST-BACK
├── node_modules
└── src
    ├── api
    ├── controllers
    ├── db
    ├── helpers
    ├── model
    ├── routes
    ├── server.js
├── .env
├── .eslintrc.cjs
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
```