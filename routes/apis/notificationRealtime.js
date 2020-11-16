const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");

// GET realtimeSetting
router.get("/", async (req, res) => {
  try {
    conn.query(
      "SELECT * FROM notification_realtime",
      (error, results, fields) => {
        if (error) throw error;
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST & UPDATE realtimeSetting
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    type,
    show_product,
    background_left,
    background_right,
    background_popup,
    random_min,
    random_max,
    text_display,
    color_text,
    position,
  } = req.body;

  // build ReatimeSettings object
  const realtimeFields = {};
  if (show_product) realtimeFields.show_product = show_product;
  if (type) realtimeFields.type = type;
  if (background_left) realtimeFields.background_left = background_left;
  if (background_right) realtimeFields.background_right = background_right;
  if (background_popup) realtimeFields.background_popup = background_popup;
  if (text_display) realtimeFields.text_display = text_display;
  if (color_text) realtimeFields.color_text = color_text;
  if (position) realtimeFields.position = position;
  if (random_min) realtimeFields.random_min = random_min;
  if (random_max) realtimeFields.random_max = random_max;
  try {
    conn.query(
      "SELECT * FROM notification_realtime",
      (error, results, fields) => {
        if (error) throw error;
        if (results.length === 0) {
          conn.query(
            "INSERT INTO notification_realtime SET ?",
            realtimeFields,
            async (error, results, fields) => {
              if (error) throw error;
              return res.send(results);
            }
          );
        }
        conn.query(
          "UPDATE notification_realtime SET ? WHERE 1",
          realtimeFields,
          (error, results, fields) => {
            if (error) throw error;
            return res.send(realtimeFields);
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
