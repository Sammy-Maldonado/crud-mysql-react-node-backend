import express from 'express';
import mysql from 'mysql';
import empleadosRouter from './src/routes/empleados.router.js'
import __dirname from './utils.js';
import cors from 'cors';
import config from './config/config.js';
import pg from 'pg';

//init
const app = express();

app.use(cors({
  origin: config.react.BASEURL,
  credentials: true
}));

//DB Deploy
const pool = new pg.Pool({
  connectionString: config.sql.DATABASE_URL,  //Esta string de conexion tiene todos los datos necesarios para poder conectarse usando PostgreSQL.
})

//DB mysql local
/* const db = mysql.createConnection({
  host: config.sql.HOST,
  user: config.sql.USER,
  password: config.sql.PASSWORD,
  database: config.sql.DATABASE_NAME
}) */

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


export default pool;  //se puede exportar db para usar la BD local