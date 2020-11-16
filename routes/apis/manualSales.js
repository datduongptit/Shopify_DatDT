const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");

// GET all Manual Sales
router.get("/", async (req, res) => {
  try {
    conn.query("SELECT * FROM notification_manual_sales", async function (
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

// GET Manual Sales by ID
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide id" });
    }

    conn.query(
      "SELECT * FROM notification_manual_sales where id=?",
      id,
      function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST Create a new Manual Sales
router.post(
  "/",
  [
    check("first_name", "Firstname is required").not().isEmpty(),
    check("last_name", "Lastname is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("product", "Product is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      first_name,
      last_name,
      city,
      product,
      order_date,
      publish_status,
      click_product,
      close_popup,
    } = req.body;
    try {
      conn.query(
        `INSERT INTO notification_manual_sales SET ?`,
        {
          first_name: first_name,
          last_name: last_name,
          city: city,
          product: product,
          order_date: order_date,
          publish_status: publish_status,
          click_product: click_product,
          close_popup: close_popup,
        },
        async (error, results, fields) => {
          if (error) throw error;
          return await res.send({
            first_name: first_name,
            last_name: last_name,
            city: city,
            product: product,
            order_date: order_date,
            publish_status: Number(publish_status),
            click_product,
            close_popup,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// UPDATE Manual Sales by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    first_name,
    last_name,
    city,
    product,
    order_date,
    publish_status,
    click_product,
    close_popup,
  } = req.body;

  let manualFeilds = {};
  if (first_name) manualFeilds.first_name = first_name;
  if (last_name) manualFeilds.last_name = last_name;
  if (city) manualFeilds.city = city;
  if (publish_status) manualFeilds.publish_status = publish_status;
  if (product) manualFeilds.product = product;
  if (order_date) manualFeilds.order_date = order_date;
  if (click_product) manualFeilds.click_product = click_product;
  if (close_popup) manualFeilds.close_popup = close_popup;

  try {
    conn.query(
      `UPDATE notification_manual_sales SET ? WHERE id = ${id}`,
      manualFeilds,
      function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update publish order_date
router.put("/publish_status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const publish_status = req.body;
    conn.query(
      `UPDATE notification_manual_sales SET ? WHERE id = ${id}`,
      publish_status,
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

// DELETE Manual Sales
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    conn.query(
      `DELETE FROM notification_manual_sales WHERE id = ${id}`,
      [id],
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Delete successfully",
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
