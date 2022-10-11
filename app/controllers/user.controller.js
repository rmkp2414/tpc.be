const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const md5 = require('md5')
const mailer = require('../service/email.service')

// Create and Save a new User
exports.create = (req, res) => {

  // Validate request
  if (!req.jsonBody) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

//   console.log('Normal password : ', password)
//   console.log('Hashed password : ', md5(password))

  // Create a User
  const user = {
        country:req.jsonBody.country.label,
        gender: req.jsonBody.gender.label,
        city: req.jsonBody.city.label,
        firstname: req.jsonBody.firstname,
        lastname: req.jsonBody.lastname,
        email: req.jsonBody.email,
        contactnumber: req.jsonBody.contactnumber,
        designation: req.jsonBody.designation,        
        password: md5(req.jsonBody.password),
        confirmpassword: req.jsonBody.confirmpassword,
        companyname: req.jsonBody.companyname,
        companyemail: req.jsonBody.companyemail,
        companyaddress1: req.jsonBody.companyaddress1,
        companyaddress2: req.jsonBody.companyaddress2,        
        state: req.jsonBody.state,
        zip: req.jsonBody.zip
    };

  // Save User in the database
  User.create(user)
    .then(data => {
    
      mailer(data.email)

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.login = (req, res) => {
    var e = req.jsonBody.email
    // var condition = e ? { email: { e } } : null;

    User.findOne({ where: { email: e } })
        .then(data => {
            if (data) {

                var pwd = md5(req.jsonBody.password)
                if(pwd == data.password){
                    res.send(data);
                }
                else{
                    res.status(404).send({
                        message: `Incorrect email or password`
                    });                   
                }                
            } else {
                res.status(404).send({
                    message: `Cannot find User with email ${e}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        })
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};