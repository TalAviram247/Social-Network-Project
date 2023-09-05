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
  getAllContactForms: (req, res) => {
    try {
      const contactForms = db.getAllContactForms();
      res.status(200).json(contactForms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { contactController };
