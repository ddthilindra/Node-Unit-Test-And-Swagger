const express = require("express");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// ###### YAML JS ########
// const YAML = require("yamljs");
// const swaggerJsDoc = YAML.load("./api.yaml");

const app = express();

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API Docs",
      version: "1.0.0",
      description: "API Documentation",
      contact: {
        name: "Amazing developers",
        email: "deshitha.hewa@ddthilindra.com",
        url: "ddthilindra.com",
      },
    },
    basePath: "/",
    servers: [
      {
        url: "http://localhost:4000",
        description: "This is local server",
      },
      {
        url: "http://company.com/",
        description: "This is company server",
      },
    ],
    tags: [
      {
        name: "API DOCs",
        description: "API for users in the system",
      },
    ],
  },
  //   apis: ["./routes/*.js"],
  apis: ["server.js"],
};

const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(fileUpload());

var users = [
  { id: 1, name: "Tom, Cruise" },
  { id: 2, name: "John Cena" },
];

/**
 * @swagger
 * /string:
 *  get:
 *      summary: Returns a string
 *      description: Checks if the server is alive
 *      parameters:
 *        - name: X-Request-ID
 *          in: header
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Successul Response
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.get("/string", (req, res) => {
  console.log(req.headers);
  res.status(200).send("Success");
});

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Get user
 *      description: Return user
 *      responses:
 *        200:
 *          description: Successul Response
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.get("/user", (req, res) => {
  res.status(200).send({ id: 1, name: "Tom, Cruise" });
});

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get users
 *      description: Returns a list of users
 *      responses:
 *        200:
 *          description: Successul Response
 *          schema:
 *            type: array
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.get("/users", (req, res) => {
  res.status(200).send(users);
});

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *      summary: Returns a user by ID
 *      description: Returns the Specific User
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            example: {name: syed}
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.get("/users/:id", (req, res) => {
  res.status(200).send(users.find((x) => x.id === parseInt(req.params.id)));
});

/**
 * @swagger
 * /create:
 *  post:
 *     summary: Register a user
 *     description: Adds a new user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          required: true
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - id
 *            properties:
 *              id:
 *                type: integer
 *                default: 3
 *              name:
 *                type: string
 *                default: asdasdas
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Not found
 *      500:
 *        description: Server error
 */
app.post("/create", (req, res) => {
  console.log(req.body);
  users = [req.body, ...users];
  res.send(users);
});

/**
 * @swagger
 * /usersQuery:
 *  get:
 *      summary: Returns a user by ID
 *      description: Returns the Specific User
 *      parameters:
 *          - in: query
 *            name: id
 *            type: integer
 *            required: true
 *          - in: query
 *            name: age
 *            type: integer
 *            enum: [21, 22]
 *            required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            example: {name: syed}
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.get("/usersQuery", (req, res) => {
    console.log(req.query.id)
  res.send(users.find((x) => x.id === parseInt(req.query.id)));
});

/**
 * @swagger
 * /users/{userId}:
 *  put:
 *     summary: Register a user
 *     description: Adds a new user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          required: true
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: asdasdas
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Not found
 *      500:
 *        description: Server error
 */
app.put("/users/:id", (req, res) => {
    const user=users.find((x) => x.id === parseInt(req.params.id))
    user.name=req.body.name
    res.status(200).send(user);
  });

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *      summary: Returns a user by ID
 *      description: Returns the Specific User
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            example: {name: syed}
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.delete("/users/:id", (req, res) => {
    const user=users.find((x) => x.id != parseInt(req.params.id))
    res.status(200).send(user);
  });

/**
 * @swagger
 * /upload:
 *  post:
 *      summary: Upload File
 *      description: Upload Video/Image for Inferring
 *      consumes: 
 *        - multipart/form-data 
 *      parameters:
 *          - in: formData
 *            name: file
 *            type: file
 *            required: true
 *            description: The file to upload
 *          - in: formData
 *            name: app
 *            type: string
 *            required: true
 *            description: Name of the model
 *          - in: formData
 *            name: id
 *            type: integer
 *            required: true
 *            description: ID of integer
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Not found
 *        500:
 *          description: Server error
 *  */
app.post("/upload", (req, res) => {
  const file = req.files.file;
  let uploadPath = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  res.status(200).send("Success");
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
