import { Router } from 'express';
import * as controller from './equipmentController';

const router = Router();

router.get('/equipment', controller.getAllEquipment);

router.get('/equipment/:id', controller.getEquipmentById);

router.get('/types', controller.getAllTypes);

router.get('/locations', controller.getAllLocations);

router.post('/equipment', controller.createEquipment);

router.put('/equipment/:id', controller.updateEquipmentLocation);

router.delete('/equipment/:id', controller.deleteEquipment);

export default router;