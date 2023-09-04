const { db } = require("../db/persist");

const settingsController = {
  getSettings: (req, res) => {
    const settings = db.getSettings();

    res.status(200).json(settings);
  },
  updateSettings: (req, res) => {
    const { settingName } = req.body;
    const updatedSettings = db.updateSettings(settingName);
    res.status(200).json(updatedSettings);
  },
};

module.exports = { settingsController };
