import pool from '../../index.js';

const listarEmpleados = (req, res) => {
  try {

    pool.query('SELECT * FROM empleados',
      //captura de error y resultado
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.rows)   //envio solo los datos que quiero, no incluyo metadatos como cuando envío "result" solo
        }
      }
    );
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra dentro del bloque try
    console.error('Error al listar los empleados:', error);
    res.status(500).send('Error al listar los empleados');
  }
}

const createEmpleados = (req, res) => {
  try {
    const { nombre, edad, pais, cargo, anios } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!nombre || !edad || !pais || !cargo || !anios) {
      throw new Error('Todos los campos son obligatorios');
    }

    //Los "?" indican que yo voy a prometer enviar estos valores más adelante.
    //Luego pongo los 5 valores en un array para que sean los que se capturan por la solicitud req.
    pool.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES($1, $2, $3, $4, $5)', [nombre, edad, pais, cargo, anios],

      //captura de error y resultado
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.rows)
        }
      }
    );
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra dentro del bloque try
    console.error('Error al crear empleado:', error);
    res.status(500).send('Error al crear empleado');
  }
}

const updateEmpleados = (req, res) => {
  try {
    const { id, nombre, edad, pais, cargo, anios } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!id || !nombre || !edad || !pais || !cargo || !anios) {
      throw new Error('Todos los campos son obligatorios');
    }

    //Los valores en el array (datos que se solicitan) deben estar en el mismo orden que en el update
    pool.query('UPDATE empleados SET nombre=$1, edad=$2, pais=$3, cargo=$4, anios=$5 WHERE id=$6', [nombre, edad, pais, cargo, anios, id],

      //captura de error y resultado
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.rows)
        }
      }
    );
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra dentro del bloque try
    console.error('Error al actualizar al empleado:', error);
    res.status(500).send('Error al actualizar al empleado');
  }
}

const deleteEmpleados = (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que todos los campos necesarios estén presentes
    if (!id) {
      throw new Error('Debe proporcionarse una ID válida');
    }

    //Los valores en el array (datos que se solicitan) deben estar en el mismo orden que en el update
    pool.query('DELETE FROM empleados WHERE id=$1', id,

      //captura de error y resultado
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result.rows)
        }
      }
    );
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra dentro del bloque try
    console.error('Error al eliminar al empleado:', error);
    res.status(500).send('Error al eliminar al empleado');
  }
}

export default {
  listarEmpleados,
  createEmpleados,
  updateEmpleados,
  deleteEmpleados
}