require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const axios = require("axios");

const PORT = process.env.PORT || 3002;

const createViewPath = (page) => {
  return path.join(__dirname, "views", `${page}.ejs`);
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("styles"));

app.set("view engine", "ejs");
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.render(createViewPath("index"), {
    title: "Main",
    page_name: "main",
  });
});

app.get("/users", async (req, res) => {
  try {
    const { data: users } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.render(createViewPath("users"), {
      title: "Users",
      users,
      page_name: "users",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: user } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    res.render(createViewPath("user"), {
      title: "User",
      user,
      page_name: "user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

app.get("/add-user", (req, res) => {
  res.render(createViewPath("add-user"), {
    title: "Add User",
    page_name: "users",
  });
});

app.post("/add-user", async (req, res) => {
  const { username, email } = req.body;
  try {
    const { data: user } = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      {
        username,
        email,
      }
    );
    res.render(createViewPath("user"), {
      title: "New User",
      user,
      page_name: "users",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user");
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204); // Successfully deleted, no content
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data: user } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    res.render(createViewPath("edit-user"), {
      title: "Edit User",
      user,
      page_name: "users",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user for edit");
  }
});

app.get("/posts", async (req, res) => {
  try {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    res.render(createViewPath("posts"), {
      title: "Posts",
      posts,
      page_name: "posts",
    });
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).send("Error fetching posts");
  }
});

app.post("/add-post", async (req, res) => {
  const { title, body } = req.body; // Ensure the fields are 'title' and 'body'
  try {
    const { data: post } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title,
        body,
      }
    );
    res.render(createViewPath("post"), {
      title: "New Post",
      post,
      page_name: "posts",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding post");
  }
});

app.get("/jobs", (req, res) => {
  res.render(createViewPath("jobs"), {
    title: "Jobs",
    page_name: "jobs",
  });
});

app.get("/gallery", (req, res) => {
  res.render(createViewPath("gallery"), {
    title: "Gallery",
    page_name: "gallery",
  });
});

app.get("/contact", (req, res) => {
  res.render(createViewPath("contact"), {
    title: "Contact",
    page_name: "contact",
  });
});

app.use((req, res) => {
  res.status(404).render(createViewPath("error404"), {
    title: "Error",
    page_name: "error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
