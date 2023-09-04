require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user-router");
const contactRouter = require("./router/contact-router");
const postRouter = require("./router/post-router");
const settingsRouter = require("./router/settings-router");

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/contact", contactRouter);
app.use("/post", postRouter);
app.use("/settings", settingsRouter);

const appReadyPromise = new Promise((resolve, reject) => {
  app.listen(port, (error) => {
    if (error) {
      reject(error);
    } else {
      console.log(`Server listening at http://localhost:${port}`);

      resolve();
    }
  });
});

module.exports = appReadyPromise;
