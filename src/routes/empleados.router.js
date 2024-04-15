import { Router } from "express";
import empleadosController from '../controllers/empleados.controllers.js'

const router = Router();

/* mySql */

router.get('/listarEmpleados', empleadosController.listarEmpleados);
router.post('/create', empleadosController.createEmpleados);
router.put('/updateEmpleados', empleadosController.updateEmpleados);
router.delete('/deleteEmpleados/:id', empleadosController.deleteEmpleados);


export default router;