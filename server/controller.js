const db = require("../database/models/index.js");
const passport = require('./middleware/passport.js');
const Promise = require('bluebird');

const post = {};
const get = {};
const patch = {};

post.user = (req, res) => {
  // console.log('Recieved post for user', req.body);
  res.status(200);
  res.end();
}

post.signup = (req, res) => {
  db.saveUser(req.body)
    .then((result) => {
      result === false ? res.sendStatus(422) : res.sendStatus(200);
    })
};

post.login = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    
    if (err || !user) {
      res.status(422).send(info);
    
    } else {

      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
        if (err) {
          console.log('error logging in', err);
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

get.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}

get.user = (req, res) => {
  db.sequelize.query(`select * from "Users"`, { type: db.sequelize.QueryTypes.SELECT})
  .then(users => console.log(users))
  .catch(err => console.log('error'))
}

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;