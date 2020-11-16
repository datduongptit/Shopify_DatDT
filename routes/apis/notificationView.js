const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");

// CREATE Notification Setting
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    show_notifications,
    type_order,
    show_custom_order,
    number_of_live,
    order_status,
    time_loop,
    time_display,
    type_date,
    show_device,
    text_popup,
    effect_display,
    effect_hidden,
    position,
    color_highlight,
    color_text,
    color_date,
    border_radius,
  } = req.body;

  const notiFields = {};
  if (show_notifications) notiFields.show_notifications = show_notifications;
  if (type_order) notiFields.type_order = type_order;
  if (show_custom_order) notiFields.show_custom_order = show_custom_order;
  if (number_of_live) notiFields.number_of_live = number_of_live;
  if (order_status) notiFields.order_status = order_status;
  if (time_loop) notiFields.time_loop = time_loop;
  if (time_display) notiFields.time_display = time_display;
  if (type_date) notiFields.type_date = type_date;
  if (show_device) notiFields.show_device = show_device;
  if (text_popup) notiFields.text_popup = text_popup;
  if (effect_display) notiFields.effect_display = effect_display;
  if (effect_hidden) notiFields.effect_hidden = effect_hidden;
  if (position) notiFields.position = position;
  if (color_highlight) notiFields.color_highlight = color_highlight;
  if (color_text) notiFields.color_text = color_text;
  if (color_date) notiFields.color_date = color_date;
  if (border_radius) notiFields.border_radius = border_radius;
  // if (order_status) {
  //     notiFields.order_status = order_status.split(',').map((item) => item.trim());
  //   }
  try {
    conn.query("SELECT * FROM notification_view", (error, results, fields) => {
      if (error) throw error;
      if (results.length === 0) {
        conn.query(
          "INSERT INTO notification_view SET ?",
          notiFields,
          async function (error, results, fields) {
            if (error) throw error;
            return res.send({
              error: false,
              data: results,
              message: "Created",
            });
          }
        );
      }
      conn.query(
        "UPDATE notification_view SET ? WHERE 1",
        notiFields,
        async function (error, results, fields) {
          if (error) throw error;
          return res.send(notiFields);
        }
      );
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET Notification
router.get("/", async (req, res) => {
  try {
    conn.query("SELECT * FROM notification_view", (error, results, fields) => {
      if (error) throw error;
      return res.send(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
