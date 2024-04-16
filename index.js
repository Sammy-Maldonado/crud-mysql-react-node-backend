import express from 'express';
//import mysql from 'mysql';
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

//DB mysql local
/* const db = mysql.createConnection({
  host: config.sql.HOST,
  user: config.sql.USER,
  password: config.sql.PASSWORD,
  database: config.sql.DATABASE_NAME
}) */

//DB Deploy
const pool = new pg.Pool({
  connectionString: config.sql.DATABASE_URL,  //Esta string de conexion tiene todos los datos necesarios para poder conectarse usando PostgreSQL.
})

// Código para crear la tabla 'empleados' si no existe
const createTable = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS empleados (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        edad INT,
        pais VARCHAR(100),
        cargo VARCHAR(100),
        anios INT
      );
    `);

    console.log('Tabla empleados creada exitosamente.');
  } catch (error) {
    console.error('Error al crear la tabla empleados:', error);
  } finally {
    client.release();
  }
};

// Ejecutar la función para crear la tabla
createTable().catch(error => console.error('Error en la inicialización de la base de datos:', error));

// Puerto de escucha
const PORT = config.app.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}`);
})

// Middleware para el manejo de JSON y datos estáticos
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/empleados', empleadosRouter);


export default pool;  //se puede exportar db para usar la BD local