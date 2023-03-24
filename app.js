const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const FoodRoute = require("./routes/FoodRoute");
const MenuRoute = require("./routes/MenuRoute");
const UserRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/order", FoodRoute);
app.use("/api/menu", MenuRoute);
app.use("/api/user", UserRoute);

module.exports = app;
