const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const restaurantSchema = new mongoose.Schema({
  name: String,
  title: String,
  fullName: String,
  phoneNumber: String,
  email: String,
  cuisineType: String,
  address: String,
  county: String,
  averageDailyOrders: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.get("/", async (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/restaurant", async (req, res) => {
  const {
    name,
    title,
    fullName,
    phoneNumber,
    email,
    cuisineType,
    address,
    county,
    averageDailyOrders,
  } = req.body;

  if (
    !name ||
    !title ||
    !fullName ||
    !phoneNumber ||
    !email ||
    !cuisineType ||
    !address ||
    !county ||
    !averageDailyOrders
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const restaurant = new Restaurant({
      name,
      title,
      fullName,
      phoneNumber,
      email,
      cuisineType,
      address,
      county,
      averageDailyOrders,
    });

    await restaurant.save();

    res.json({ message: "Restaurant created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating restaurant" });
  }
});

app.get("/restaurant", async (req, res) => {
  const restaurants = await Restaurant.find();

  res.json({ restaurants });
});

// Connect to your MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/gladni", {
  useNewUrlParser: true,
});

module.exports = app;
