const jwt = require("jsonwebtoken");
const { getToken } = require("../middleware/auth-middleware");
const { db } = require("../db/persist");

const tenDays = 10 * 24 * 60 * 60;
const thirtyMinutes = 30 * 60;

function createToken(user, age) {
  const userDataToSign = { ...user };
  delete userDataToSign.password;
  return jwt.sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: age,
  });
}

function tryLogin(username, password) {
  const user = db.findUserByUsernameAndPassword(username, password);
  if (!user) {
    return new Error("Auth error");
  }
  return user;
}

async function login(req, res) {
  try {
    const { username, password, rememberMe } = req.body;
    const user = tryLogin(username, password);
    if (user instanceof Error) {
      res.status(401).json({
        message: "Invalid username or password",
      });
    } else {
      const age = rememberMe ? tenDays : thirtyMinutes;
      const token = createToken(user, age);

      res.status(201).json({
        ...user,
        password: undefined,
        jwt: token,
      });
      db.logActivity(username, "Login");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function refresh(req, res) {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.send("Token invalid");
      } else {
        const user = db.findUserByUsername(decodedToken.username);
        res.status(201).json(user);
      }
    });
    return;
  }
  res.send({ status: "no token" });
}

async function logout(req, res) {
  const { username } = res.locals.token;
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.status(200).json({
    logged_out: true,
  });

  db.logActivity(username, "Logout");
}

async function signup(req, res) {
  const { username, password, fullName } = req.body;
  try {
    const userExist = db.findUserByUsername(username);
    if (userExist) {
      throw new Error("User already exist");
    }

    const newUser = db.createUser({
      username,
      password,
      fullName,
      type: "user",
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

module.exports = {
  login,
  logout,
  signup,
  refresh,
  deleteUser: async (req, res) => {
    const { username } = req.params;
    const { token } = res.locals;
    try {
      const user = db.findUserByUsername(username);
      if (!user) {
        throw new Error("User does not exist");
      }
      if (user.username === token.username) {
        throw new Error("Cannot delete yourself");
      }
      db.deleteUser(username);
      res.status(201).json({
        message: "User deleted successfully",
      });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ message: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = db.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  followUser: async (req, res) => {
    const { username } = req.params;
    const { token } = res.locals;
    try {
      const user = db.findUserByUsername(username);
      if (!user) {
        throw new Error("User does not exist");
      }
      if (user.username === token.username) {
        throw new Error("Cannot follow yourself");
      }
      const currentUser = db.findUserByUsername(token.username);
      const isCurrentlyFollowing = currentUser.following.includes(
        user.username
      );

      if (isCurrentlyFollowing) {
        currentUser.following.splice(
          currentUser.following.indexOf(user.username),
          1
        );
      } else {
        currentUser.following.push(user.username);
      }
      db.editUser(currentUser);
      res.status(201).json({
        message:
          (isCurrentlyFollowing ? "Unfollowed" : "Followed") + " successfully",
        following: currentUser.following,
      });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ message: err.message });
    }
  },
};
