let swag = require('../models/swag');

module.exports = {
  add: (req, res, next) => {
    let { id } = req.query;
    let { cart } = req.session.user;
    let index = cart.findIndex( swag => swag.id == id);
    if (index === -1) {
      const selectedSwag = swag.find(swag => swag.id == id);
      cart.push(selectedSwag);
      req.session.user.total += selectedSwag.price;
    }
    res.status(200).send(req.session.user);
  },

  delete: (req, res, next) => {
    let { id } = req.query;
    let { cart } = req.session.user;
    let index = cart.findIndex(swag => swag.id == id);
    if(cart[index] !== -1) {
      let price = cart[index].price;
      req.session.user.total -= price; 
      cart.splice(index, 1);
    }
    res.status(200).send(req.session.user)

  },

  checkout: (req, res, next) => {
    let { user } = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).send(req.session.user);
  },
}