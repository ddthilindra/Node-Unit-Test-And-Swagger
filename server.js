const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
const indexRoutes = require('./routes/index');

// ###### YAML JS ########
const YAML = require("yamljs");
const swaggerJsDoc = YAML.load("./api.yaml");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(fileUpload());

app.use('/', indexRoutes);

module.exports = app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
