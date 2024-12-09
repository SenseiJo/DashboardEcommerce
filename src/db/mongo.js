const { MongoClient } = require("mongodb");

const mongoUrl = "mongodb://localhost:27017";

const getCollection = async (name, database = "northwind") => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(database);
    return db.collection(name);
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    console.log(err);
  }
};

module.exports = { getCollection };
