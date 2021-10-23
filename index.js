import express from "express";
import mongoose from "mongoose";
import Item from "./models/Item.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const items = await Item.find();
  res.render("index", { items });
});

app.post("/add", async (req, res) => {
  try {
    const item = new Item({
      title: req.body.todo,
    });

    await item.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/:id/delete", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

mongoose
  .connect("mongodb://localhost:27017/todo", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("MongoDB is connected and server is running");
    });
  });
