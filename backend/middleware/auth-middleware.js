const jwt = require("jsonwebtoken");

function getToken(req) {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    return token;
  }
}

// middleware to check if the user is logged in
const requireAuth = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.send("Token invalid");
      } else {
        res.locals.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send("Please login");
  }
};

const requireAdmin = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.send("Token invalid");
      } else {
        res.locals.token = decodedToken;
        if (decodedToken.type !== "admin") {
          res.status(401).send("Admins only");
          return;
        }
        next();
      }
    });
  } else {
    res.status(401).send("Please login");
  }
};

module.exports = { requireAuth, getToken, requireAdmin };
