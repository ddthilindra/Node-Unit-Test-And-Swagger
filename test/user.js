const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

// Assertion
chai.should();

chai.use(chaiHttp);

let apiCount = 0;

// ###### TDD ######
describe("Test TDD", () => {
  /**
   * Test API fields & keys
   */

  // define fields
  const fields = [
    "id",
    "privateName",
    "owner",
    "type",
    "tier",
    "status",
    "tracking",
    "theme",
    "coach",
    "coachingType",
    "converstionMessage",
    "pushNotifications",
    "requireLearnerConfirmation",
    "description",
    "pin",
    "createdAt",
    "updatedAt",
    "contractStartDate",
    "contractEndDate",
    "NumberOfLicenses",
    "licensesConsumed",
    "licensesPurchased",
    "accountType",
  ];
  
  it("It should return all required JSON keys provided by the fields in request query.", (done) => {
    chai
      .request(server.app)
      .get("/test")
      .query({ fields: fields.join(",") })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("array");

        function checkAPI(obj) {
          fields.forEach((field) => {
            expect(res.request.url).to.include(field) // check field has expected fields
            if (field in obj) {
              expect(res.body.every((key) => key.should.have.property(field))).to.be.true; // check response has expected keys

              
            Object.keys(obj).forEach((key) => {
              if ( obj[key] !== undefined && obj[key] !== null && typeof obj[key] === "object" ) {
                if (field in obj[key]) {
                  var prop = key;

                  expect(res.body.every(key => key.should.have.property(prop).deep.property(field))).to.be.true; // check detail object has expected keys

                  Object.keys(obj.detail).forEach((key) => {
                    if ( obj.detail[key] !== undefined &&  obj.detail[key] !== null && typeof obj.detail[key] === "object" ) {
                      for (const subkey in obj.detail[key]) {
                        if (fields.includes(subkey)) {
                          var val = key;
                          expect(res.body.every(key => key.should.have.property("detail").deep.property(val).deep.property(subkey))).to.be.true; // check the key of sub object under detail object
                        }
                      }
                    }
                  });
                }
              }
            });
            }

          });
        }

        res.body.forEach((item) => {
          checkAPI(item);
        });

        done();

        // #### SOURCE ####

        // // fields and response key
        // if(expect(res.request).to.have.property('url').that.includes("id")){
        //   expect(res.body.every(key => key.should.have.property("id"))).to.be.true;

        //   //value check
        //   expect(res.body.some(key => key.id === "123fsd23fs")).to.be.true;
        // };

        // // deep.property
        // if(expect(res.request).to.have.property('url').that.includes("privateName")){
        //   expect(res.body.every(key => key.should.have.property("detail").deep.property("settings"))).to.be.true;
        // };
      });
  });
});

// API Testing and test coverage

// describe("User API", () => {
//   /**
//    * Test GET Route
//    */

//   describe("GET /users", () => {
//     apiCount++;

//     it("It should GET all users", (done) => {
//       chai
//         .request(server.app)
//         .get("/users")
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("array");
//           expect(res.body.length).to.be.eq(2);
//           done();
//         });
//     });

//     // check invalid route
//     it("It should NOT GET all users", (done) => {
//       chai
//         .request(server.app)
//         .get("/usersdata")
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(404);

//           done();
//         });
//     });
//   });

//   /**
//    * Test the GET user by id Route
//    * */

//   describe("GET /users/:id", () => {
//     apiCount++;

//     it("It should GET a user by id", (done) => {
//       const uid = 1;
//       chai
//         .request(server.app)
//         .get("/users/" + uid)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property("id");
//           expect(res.body).to.have.property("name");
//           expect(res.body).to.have.property("id").eq(1);

//           done();
//         });
//     });

//     it("It should NOT GET a user by id", (done) => {
//       const uid = 123;
//       chai
//         .request(server.app)
//         .get("/users/" + uid)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(404);
//           expect(res.text).to.be.eq("User does not exist");

//           done();
//         });
//     });
//   });
//   /**
//    * Test POST route
//    */

//   describe("POST /users/create", () => {
//     apiCount++;

//     it("It should POST a new user", (done) => {
//       const user = {
//         name: "AAAAAAA",
//       };
//       chai
//         .request(server.app)
//         .post("/users/create")
//         .send(user)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property("id");
//           expect(res.body).to.have.property("name");
//           expect(res.body).to.have.property("id").eq(3);
//           expect(res.body).to.have.property("name").eq("AAAAAAA");

//           done();
//         });
//     });

//     it("It should NOT POST a new user without name property", (done) => {
//       const user = {
//         age: 12,
//       };
//       chai
//         .request(server.app)
//         .post("/users/create")
//         .send(user)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.text).to.be.eq("User name required");

//           done();
//         });
//     });
//   });

//   /**
//    * Test PUT route
//    */

//   describe("PUT /users/:id", () => {
//     apiCount++;

//     it("It should PUT a new user", (done) => {
//       const uid = 1;
//       const user = {
//         name: "AAAAAAA",
//       };
//       chai
//         .request(server.app)
//         .put("/users/" + uid)
//         .send(user)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property("id");
//           expect(res.body).to.have.property("name");
//           expect(res.body).to.have.property("id").eq(uid);
//           expect(res.body).to.have.property("name").eq("AAAAAAA");

//           done();
//         });
//     });

//     it("It should NOT PUT a new user with less than 3 characters", (done) => {
//       const uid = 1;
//       const user = {
//         name: "AA",
//       };
//       chai
//         .request(server.app)
//         .put("/users/" + uid)
//         .send(user)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.text).to.be.eq(
//             "User name should be at least 3 characters"
//           );

//           done();
//         });
//     });
//   });

//   /**
//    * Test DELETE route
//    */

//   describe("DELETE /users/:id", () => {
//     apiCount++;

//     it("It should DELETE a user", (done) => {
//       const uid = 1;
//       chai
//         .request(server.app)
//         .delete("/users/" + uid)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property("id");
//           expect(res.body).to.have.property("name");

//           done();
//         });
//     });
//   });
//   after(function () {
//     // Print the testing coverage
//     console.log(apiCount + " APIs tested out of " + server.totalAPIs);
//     console.log(
//       `API testing coverage: ${((apiCount / server.totalAPIs) * 100).toFixed(
//         2
//       )}%`
//     );
//   });
// });
