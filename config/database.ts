import {Sequelize} from "sequelize";
import fs from "fs";

const logStream = fs.createWriteStream('sequelize.log', {flags: 'a'});

const sequelize = new Sequelize(
    process.env.DB_NAME, // Tên database
    process.env.DB_USERNAME, // Username
    process.env.DB_PASS, // Password
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false
      //* Output to a file
      // logging: (msg) => logStream.write(msg + '\n') 
    }
  );

  sequelize.authenticate().then(() => {
    console.log('Connect database successfully!');
  }).catch((error) => {
    console.error('Connect database fail', error);
  });

export default sequelize;