const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  //#1
  test("Test 10L: GET /api/convert", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=10l")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(
          JSON.parse(res.text).string,
          "10 liters converts to 2.64172 gallons"
        );
        done();
      });
  });
  //#2
  test("Test 32g: GET /api/convert", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(JSON.parse(res.text), "invalid unit");
        done();
      });
  });
  //#3
  test("Test 3/7.2/4kg: GET /api/convert", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(JSON.parse(res.text), "invalid number");
        done();
      });
  });
  //#4
  test("Test 3/7.2/4kilomegagram: GET /api/convert", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(JSON.parse(res.text), "invalid number and unit");
        done();
      });
  });
  //#5
  test("Test kg: GET /api/convert", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.equal(
          JSON.parse(res.text).string,
          "1 kilograms converts to 2.20462 pounds"
        );
        done();
      });
  });
});
