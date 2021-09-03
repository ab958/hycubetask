const express = require("express");
const app = express();
const Product = require("./model/product");
const User = require("./model/user");
const menu = require("./model/Menulist");
const mongoose = require("mongoose");
const us = require("./router/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/hycube")
  .then(() => {
    console.log("connected SuccessFully");
  })
  .catch(() => {
    console.log("Not Connected");
  });

app.post("/user", async (req, res) => {
  const wahab = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  await wahab.save();
  res.send(wahab);
});
app.post("/product", async (req, res) => {
  const wahab = new Product({
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
  });
  await wahab.save();
  res.send(wahab);
});

app.post("/order", async (req, res) => {
  const wahab = new menu({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    size: req.body.size,
  });
  await wahab.save();
  res.send(wahab);
});

app.use("/user", us);
// app.post("/user")
app.listen(4000, () => {
  console.log("server is op");
});
