const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");

// get data
router.get("/", async (req, res) => {
  try {
    conn.query("SELECT * FROM data_product", async function (
      error,
      results,
      fields
    ) {
      if (error) throw error;
      return res.send(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
