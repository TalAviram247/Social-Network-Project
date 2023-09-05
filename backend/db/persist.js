const fs = require("fs");
const data = require("./db.json");
const path = require("path");

const randomString = () => Math.random().toString(36).slice(2);

function saveDb() {
  fs.writeFileSync(
    path.join(__dirname, "./db.json"),
    JSON.stringify(data, null, 2)
  );
}

const user = {
  findUserByUsernameAndPassword: function (username, password) {
    return data.users.find(
      (user) => user.username === username && user.password === password
    );
  },
  findUserByUsername: function (username) {
    return data.users.find((user) => user.username === username);
  },
  createUser: function ({ username, password, fullName, type = "user" }) {
    const newUser = {
      username,
      password,
      fullName,
      type,
      following: [],
      createdAt: new Date(),
    };
    data.users.push(newUser);
    saveDb();
    return newUser;
  },
  getAllUsers: function () {
    return data.users.map((user) => {
      return {
        ...user,
        password: undefined,
      };
    });
  },
  getAllContactForms: function () {
    return data.contactForms;
  },

  editUser: (user) => {
    const index = data.users.findIndex((u) => u.username === user.username);
    data.users[index] = user;
    saveDb();
  },
  deleteUser: (username) => {
    data.users = data.users.filter((user) => user.username !== username);
    saveDb();
  },
  logActivity: (username, activity) => {
    const user = data.users.find((user) => user.username === username);
    if (!user.activity) {
      user.activity = [];
    }
    user.activity.push({ date: new Date(), activity });
    saveDb();
  },
};

const settings = {
  getSettings: () => {
    return data.settings;
  },
  updateSettings: (settingName) => {
    data.settings[settingName] = !data.settings[settingName];
    saveDb();
    return data.settings;
  },
};

const db = {
  ...user,
  ...settings,
  saveContactForm: (contactForm) => {
    data.contactForms.push(contactForm);
    saveDb();
  },
  addNewPost: ({ content, username }) => {
    const newPost = {
      id: randomString(),
      content,
      username,
      likes: [],
      createdAt: new Date(),
    };
    data.posts.push(newPost);
    saveDb();
    return newPost;
  },
  getAllPosts: () => {
    return data.posts
      .map((post) => {
        const user = db.findUserByUsername(post.username);
        return {
          ...post,
          username: user.username,
          fullName: user.fullName,
        };
      })
      .reverse();
  },
  likePost: (postId, username) => {
    const post = data.posts.find((post) => post.id === postId);
    if (!post) throw new Error("Post not found");
    if (post.likes.includes(username)) {
      post.likes = post.likes.filter((u) => u !== username);
    } else {
      post.likes.push(username);
    }
    saveDb();
    return post;
  },
  deletePost: (postId, username) => {
    const post = data.posts.find((post) => post.id === postId);
    if (!post) throw new Error("Post not found");
    if (post.username !== username) throw new Error("Not authorized");
    data.posts = data.posts.filter((post) => post.id !== postId);
    saveDb();
  },
};
module.exports = { db };
