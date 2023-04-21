const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const indexRoutes = require('./routes/index');
const listEndpoints = require('express-list-endpoints');


// ###### YAML JS ########
const YAML = require("yamljs");
const swaggerJsDoc = YAML.load("./api.yaml");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(fileUpload());

app.use('/', indexRoutes);

// Count the total number of APIs 
const routes = listEndpoints(app);
let totalAPIs = 0;
routes.forEach(route => {
    const routeMethods = route.methods.filter(method => method !== 'OPTIONS');
    totalAPIs += routeMethods.length;
});

// console.log("🚀 ~ file: server.js ~ totalAPIs:", totalAPIs)

exports.totalAPIs = totalAPIs;
exports.app = app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
