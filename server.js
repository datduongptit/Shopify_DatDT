const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api/notification_manual_sales", require("./routes/apis/manualSales"));
app.use("/api/notification_view", require("./routes/apis/notificationView"));
app.use("/api/data_product", require("./routes/apis/dataProduct"));
app.use(
  "/api/notification_realtime",
  require("./routes/apis/notificationRealtime")
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
