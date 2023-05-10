const router = require("express").Router();

var users = [
  { id: 1, name: "Tom, Cruise" },
  { id: 2, name: "John Cena" },
];

// Dev test route TDD
router.get("/test", async (req, res) => {
  /**
   * View All accounts
   * [GET /v1/accounts/{fields}=id,privateName,publicName,owner,type,tier,status,tracking,theme,
   * coach,coachingType,converstionMessage,pushNotifications,requireLearnerConfirmation,description,
   * pin,createdAt,updatedAt,contractStartDate,contractEndDate,
   * NumberOfLicenses,licensesConsumed,licensesPurchased&{filters}=accountType]
   */
  const result = [
    {
      id: "111111111111111",
      createdAt: "2023-04-26T08:40:51.620Z",
      updatedAt: "2023-04-26T08:40:51.620Z",
      detail: {
        publicName: "Test Account",
        privateName: "1 Test Account",
        description: "This is a test account to test the API.",
        pin: "15325",
        accountOwner: {
          name: "Tom Broody",
          id: "2345sdsf345fs2",
        },
        accountType: {
          name: "Public Sector",
          id: 1,
        },
        accountTier: {
          name: "Tier 1",
          id: 1,
        },
        coach: {
          name: "Shannon",
          id: "63sdg4f345fs2",
        },
        coachType: {
          name: "Public Sector",
          id: 1,
        },
        settings: {
          conversationMessages: {
            number: "+61378976357492",
          },
          brandingTheme: {
            name: "Cell-Ed (Default)",
            id: 1,
          },
          allowNewUsers: false,
          automaticallyInactivateLearners: false,
          restrictedAccount: false,
          pushNotifications: false,
          requireLearnerConfirmation: false,
        },
        healthData: {
          activityTracking: false,
        },
      },
      license: {
        contractName: "Contract 1",
        numberOfLicenses: 10000,
        allowRollover: false,
        contractStartDate: "2023-04-26T00:00:00.000Z",
        contractEndDate: "2025-04-26T00:00:00.000Z",
      },
    },
    {
      id: "2222222222222222222",
      createdAt: "2023-04-26T08:40:51.620Z",
      updatedAt: "2023-04-26T08:40:51.620Z",
      detail: {
        publicName: "Test Account",
        privateName: "1 Test Account",
        description: "This is a test account to test the API.",
        pin: "15325",
        accountOwner: {
          name: "Jeff Broody",
          id: "2345sdsf345fs2",
        },
        accountType: {
          name: "Public Sector",
          id: 1,
        },
        accountTier: {
          name: "Tier 1",
          id: 1,
        },
        coach: {
          name: "Sarah",
          id: "443g4f345fs2",
        },
        coachType: {
          name: "Public Sector",
          id: 1,
        },
        settings: {
          conversationMessages: {
            number: "+61378976357492",
          },
          brandingTheme: {
            name: "Cell-Ed (Default)",
            id: 1,
          },
          allowNewUsers: false,
          automaticallyInactivateLearners: false,
          restrictedAccount: false,
          pushNotifications: false,
          requireLearnerConfirmation: false,
        },
        healthData: {
          activityTracking: false,
        },
      },
      license: {
        contractName: "Contract 2",
        numberOfLicenses: 10000,
        allowRollover: false,
        contractStartDate: "2023-04-26T00:00:00.000Z",
        contractEndDate: "2025-04-26T00:00:00.000Z",
      },
    },
  ];

  res.status(200).send(result);
});

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
