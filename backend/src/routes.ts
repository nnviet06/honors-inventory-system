/**
 * API Route Definitions
 * Defines all RESTful endpoints for equipment and location resources.
 */

import { Router } from 'express';
import * as controller from './equipmentController';
import * as dbController from './dbController';

const router = Router();

router.get('/equipment', controller.getAllEquipment);

router.get('/equipment/:id', controller.getEquipmentById);

router.get('/types', controller.getAllTypes);

router.get('/locations', controller.getAllLocations);

router.post('/equipment', controller.createEquipment);

router.put('/equipment/:id', controller.updateEquipment);

router.delete('/equipment/:id', controller.deleteEquipment);

router.post('/reset', dbController.refreshDatabase);

export default router;