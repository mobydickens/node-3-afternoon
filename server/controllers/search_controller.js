let swag = require('../models/swag');

module.exports = {
  search: (req, res, next) => {
    let { category } = req.query;
    if(category === false) {
      res.status(200).send(swag);
    } else {
      let filtered = swag.filter(swaggy => swaggy.category === category);
      res.status(200).send(filtered);
    }
  }
}