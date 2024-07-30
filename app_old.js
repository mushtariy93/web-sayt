require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const PORT = process.env.PORT;

const createViewPath = (page) => {
  return path.join(
    __dirname,
    "views",
    `${page}.html`
  );
};

const app = express();
app.use(morgan("combined")); //middleware ulash

app.get("/", (req, res) => {
  res.sendFile(createViewPath("index"));
});
app.get("/users", (req, res) => {
  res.sendFile(createViewPath("users"));
});
app.get("/jobs", (req, res) => {
  res.sendFile(createViewPath("jobs"));
});
app.get("/gallery", (req, res) => {
  res.sendFile(createViewPath("gallery"));
});
app.get("/contact", (req, res) => {
  res.sendFile(createViewPath("contact"));
});
app.use((req, res) => {
  res.sendFile(createViewPath("error404"));
});

app.listen(PORT, () => {
  console.log(
    `Server ${PORT}-portda ishga tushdi`
  );
});

// app.get("/about", function (req, res) {
//   res.send("about");
// });

// app.get("/users?", function (req, res) {
//   res.send("user");
// });

// app.get("/ab?cd", function (req, res) {
//   res.send("ab?cd");
// });

// app.get("/ab+cd", (req, res) => {
//   res.send("ab+cd");
// });
// app.get("/ab*cd", (req, res) => {
//   res.send("ab*cd");
// });

// app.get("/admin/:adminId", (req, res) => {
//   //   res.send(req.params);
//   res.send(req.params.adminId);
// });
// app.get(
//   "/admin/:adminId/staff/:staffId",
//   (req, res) => {
//     //   res.send(req.params);
//     //   res.send(req.params.adminId);
//     res.send(req.params.staffId);
//   }
// );
