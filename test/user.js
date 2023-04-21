const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const expect = chai.expect;

// Assertion
chai.should();

chai.use(chaiHttp);

let apiCount = 0;

describe("User API", () => {
  /**
   * Test GET Route
   */

  describe("GET /users", () => {
    it("It should GET all users", (done) => {
      chai
        .request(server.app)
        .get("/users")
        .end((err, res) => {
          //   res.should.have.status(200);
          //   res.body.should.be.a("array");
          //   res.body.length.should.be.eq(2);
          apiCount++;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.eq(2);
          done();
        });
    });

    it("It should NOT GET all users", (done) => {
      chai
        .request(server.app)
        .get("/usersdata")
        .end((err, res) => {
          //   res.should.have.status(404);

          expect(err).to.be.null;
          expect(res).to.have.status(404);

          done();
        });
    });
  });

  /**
   * Test the GET user by id Route
   * */

  describe("GET /users/:id", () => {
    it("It should GET a user by id", (done) => {
      const uid = 1;
      chai
        .request(server.app)
        .get("/users/" + uid)
        .end((err, res) => {
          //   res.should.have.status(200);
          //   res.body.should.be.a("object");
          //   res.body.should.have.property("id");
          //   res.body.should.have.property("name");
          //   res.body.should.have.property("id").eq(1);
          apiCount++;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("id").eq(1);

          done();
        });
    });

    it("It should NOT GET a user by id", (done) => {
      const uid = 123;
      chai
        .request(server.app)
        .get("/users/" + uid)
        .end((err, res) => {
          //   res.should.have.status(404);
          //   res.text.should.be.eq("User does not exist");

          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.text).to.be.eq("User does not exist");

          done();
        });
    });
  });
  /**
   * Test POST route
   */

  describe("POST /users/create", () => {
    it("It should POST a new user", (done) => {
      const user = {
        name: "AAAAAAA",
      };
      chai
        .request(server.app)
        .post("/users/create")
        .send(user)
        .end((err, res) => {
          // res.should.have.status(201);
          // res.body.should.be.a("object");
          // res.body.should.have.property("id");
          // res.body.should.have.property("name");
          // res.body.should.have.property("id").eq(3);
          // res.body.should.have.property("name").eq("AAAAAAA");
          apiCount++;
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("id").eq(3);
          expect(res.body).to.have.property("name").eq("AAAAAAA");

          done();
        });
    });

    it("It should NOT POST a new user without name property", (done) => {
      const user = {
        age: 12,
      };
      chai
        .request(server.app)
        .post("/users/create")
        .send(user)
        .end((err, res) => {
          // res.should.have.status(400);
          // res.text.should.be.eq("User name required");

          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.text).to.be.eq("User name required");

          done();
        });
    });
  });

  /**
   * Test PUT route
   */

  describe("PUT /users/:id", () => {
    it("It should PUT a new user", (done) => {
      const uid = 1;
      const user = {
        name: "AAAAAAA",
      };
      chai
        .request(server.app)
        .put("/users/" + uid)
        .send(user)
        .end((err, res) => {
          // res.should.have.status(200);
          // res.body.should.be.a("object");
          // res.body.should.have.property("id");
          // res.body.should.have.property("name");
          // res.body.should.have.property("id").eq(uid);
          // res.body.should.have.property("name").eq("AAAAAAA");
          apiCount++;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("id").eq(uid);
          expect(res.body).to.have.property("name").eq("AAAAAAA");

          done();
        });
    });

    it("It should NOT PUT a new user with less than 3 characters", (done) => {
      const uid = 1;
      const user = {
        name: "AA",
      };
      chai
        .request(server.app)
        .put("/users/" + uid)
        .send(user)
        .end((err, res) => {
          // res.should.have.status(400);
          // res.text.should.be.eq("User name should be at least 3 characters");

          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.text).to.be.eq(
            "User name should be at least 3 characters"
          );

          done();
        });
    });
  });

  /**
   * Test DELETE route
   */

  describe("DELETE /users/:id", () => {
    it("It should DELETE a user", (done) => {
      const uid = 1;
      chai
        .request(server.app)
        .delete("/users/" + uid)
        .end((err, res) => {
          // res.should.have.status(200);
          // res.body.should.be.a("object");
          // res.body.should.have.property("id");
          // res.body.should.have.property("name");
          apiCount++;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");

          done();
        });
    });
  });
  after(function () {
    
    console.log(apiCount + " APIs tested out of " + server.totalAPIs);
    console.log(
      `API testing coverage: ${((apiCount / server.totalAPIs) * 100).toFixed(2)}%`
    );
  });
});
