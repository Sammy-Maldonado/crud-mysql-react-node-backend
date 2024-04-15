import express from 'express';
import mysql from 'mysql';
import empleadosRouter from './src/routes/empleados.router.js'
import __dirname from './utils.js';
import cors from 'cors';

//init
const app = express();
app.use(cors());

//DB mysql
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'empleados_crud'
})

//port
app.listen(3001, () => {
  console.log('Corriendo en el puerto 3001');
})

//utils
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

//Router
app.use('/api/empleados', empleadosRouter);


export default db;