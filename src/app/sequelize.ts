

import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "./config/db.config"
import { Sequelize } from "sequelize-typescript"

const sequelize = new Sequelize(DB!, USER!, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  models: [__dirname + "/models"],
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle, 
  },
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
}) 

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err)
    })

export default sequelize 