module.exports = {
    HOST: "localhost",
    USER: "mysqladmin",
    PASSWORD: "Kapz@2414",
    DB: "tpc.interview.db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };