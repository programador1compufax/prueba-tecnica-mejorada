import express from 'express';
import direccionController from '../controllers/addressController.js';

const router = express.Router();

router.get('/', direccionController.getAllAddresses.bind(direccionController));
router.post('/', direccionController.updateAddress.bind(direccionController));

export default router;