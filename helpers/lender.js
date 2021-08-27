const Lender = require("../models/lender");

const createLenderHelper = (userId) => {
  return new Promise((resolve, reject) => {
    Lender.findOne({ userId })
      .then(async (response) => {
        if (response) {
          resolve(response);
        } else {
          Lender.create({ userId })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { createLenderHelper };
