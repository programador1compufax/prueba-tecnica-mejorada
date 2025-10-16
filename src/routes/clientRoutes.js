import express from 'express';
import clientController from "../controllers/clientController.js";

const router = express.Router();

router.get('/', clientController.getAllClients.bind(clientController));
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);

export default router;