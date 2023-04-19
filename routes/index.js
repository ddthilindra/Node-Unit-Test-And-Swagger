const router = require("express").Router();
var users = [
  { id: 1, name: "Tom, Cruise" },
  { id: 2, name: "John Cena" },
];

router.get("/string", (req, res) => {
  console.log(req.headers);
  res.status(200).send("Success");
});

router.get("/user", (req, res) => {
  res.status(200).send({ id: 1, name: "Tom, Cruise" });
});

router.get("/users", (req, res) => {
  res.status(200).send(users);
});

router.get("/users/:id", (req, res) => {
  const user = users.find((x) => x.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User does not exist");
  }
  res.status(200).send(user);
});

router.post("/users/create", (req, res) => {
  if (!req.body.name) {
    res.status(400).send("User name required");
  } else {
    const user = {
      id: users.length + 1,
      name: req.body.name,
    };

    users = [user, ...users];
    res.status(201).send(user);
  }
});

router.get("/usersQuery", (req, res) => {
  console.log(req.query.id);
  res.send(users.find((x) => x.id === parseInt(req.query.id)));
});

router.put("/users/:id", (req, res) => {
  if (req.body.name.length < 3) {
    res.status(400).send("User name should be at least 3 characters");
  } else {
    console.log(req.params.id);

    const user = users.find((x) => x.id === parseInt(req.params.id));
    user.name = req.body.name;
    res.status(200).send(user);
  }
});

router.delete("/users/:id", (req, res) => {
  const user = users.find((x) => x.id != parseInt(req.params.id));
  res.status(200).send(user);
});

router.post("/upload", (req, res) => {
  const file = req.files.fileName;
  let uploadPath = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  res.status(200).send("Success");
});

module.exports = router;
