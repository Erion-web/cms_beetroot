const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3030;

const { mongoUri } = require("./const/config");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected DB");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Welcome to beetroot!",
  });
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
