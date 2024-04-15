import express from 'express';
import mysql from 'mysql';
import empleadosRouter from './src/routes/empleados.router.js'
import __dirname from './utils.js';
import cors from 'cors';
import config from './config/config.js';

//init
const app = express();
app.use(cors());

//DB mysql
const db = mysql.createConnection({
  host: config.sql.HOST,
  user: config.sql.USER,
  password: config.sql.PASSWORD,
  database: config.sql.DATABASE
})

//port
const PORT = config.app.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}`);
})

//utils
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

//Router
app.use('/api/empleados', empleadosRouter);


export default db;