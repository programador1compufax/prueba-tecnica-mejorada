import express from 'express';
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get('/', orderController.getAllOrders.bind(orderController));
router.get('/:clientId', orderController.getOrdersUser.bind(orderController));
router.get('/folio/:folio', orderController.getOrdersByFolio.bind(orderController));
router.post('/', orderController.createOrder.bind(orderController));

export default router;