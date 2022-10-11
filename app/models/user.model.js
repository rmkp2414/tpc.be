module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    country: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contactno: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },      
      gender: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      companyname: {
        type: Sequelize.STRING
      },
      companyemail: {
        type: Sequelize.STRING
      },
      companyaddress1: {
        type: Sequelize.STRING
      },
      companyaddress2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };