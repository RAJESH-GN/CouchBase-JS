const couchbase = require("couchbase");

const cluster = new couchbase.Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "March18@1993",
});
const bucket = cluster.bucket("person-sample");
const collection = bucket.defaultCollection();

module.exports = collection;
