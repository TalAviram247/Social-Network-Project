const { db } = require("../db/persist");

const contactController = {
  saveContactForm: (req, res) => {
    const { title, email, message } = req.body;
    db.saveContactForm({ title, email, message });
    res.status(200).json({
      title,
      email,
      message,
    });
  },
};

module.exports = { contactController };
