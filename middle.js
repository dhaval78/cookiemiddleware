const express = require("express");
const db = require("./dbconnection.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend is working fine");
});

const insertRequest = async (req, res, next) => {
  try {
    const url = "/allRequestsFromDB";
    const method = "GET";

    const insertQuery = `
      INSERT INTO "allRequests" (url, method)
      VALUES ($1, $2)
      RETURNING id;
    `;

    const values = [url, method];

    const result = await db.query(insertQuery, values);

    const insertedId = result.rows[0].id;

    res.json({ message: `New request created with ID: ${insertedId}` });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  
  app.use(insertRequest);
  
  app.get('/allRequestsFromDB', async (req, res) => {
    try {
      const result = await db.query(`SELECT * FROM "allRequests"`);
  
      res.json(result.rows);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const port=2410
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });