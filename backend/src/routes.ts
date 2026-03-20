/**
 * API Route Definitions
 * Defines all RESTful endpoints.
 */

import { Router } from 'express';
import { authMiddleware } from './authMiddleware'
import * as controller from './equipmentController';
import * as authController from './authController';


const router = Router();

// Authentication Routes
router.post('/auth/signup', authController.signUp);

router.post('/auth/signin', authController.signIn);

router.use(authMiddleware); // Apply authentication middleware to all routes

// Equipment Routes
router.get('/equipment', controller.getAllEquipment);

router.get('/equipment/:id', controller.getEquipmentById);

router.get('/types', controller.getAllTypes);

router.get('/locations', controller.getAllLocations);

router.post('/equipment', controller.createEquipment);

router.put('/equipment/:id', controller.updateEquipment);

router.delete('/equipment/:id', controller.deleteEquipment);

// router.delete('/equipment/bulk', controller.bulkDelete);

export default router;