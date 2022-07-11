require("dotenv").config();

module.exports = {
  development: {
    username: "wuicilrtrjxcte",
    password: "8dab27229eaba68befb4b810c78c92b309dd0d39f4ce8af4c5f6091e4959b3cb",
    database: "d95qhsbvcghl4e",
    host: "ec2-44-198-82-71.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: "postgres",
    password: "irvine123",
    database: "Final_Challenge",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "wuicilrtrjxcte",
    password: "8dab27229eaba68befb4b810c78c92b309dd0d39f4ce8af4c5f6091e4959b3cb",
    database: "d95qhsbvcghl4e",
    host: "ec2-44-198-82-71.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  },
};
