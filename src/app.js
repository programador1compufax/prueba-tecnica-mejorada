import express, { json, urlencoded } from 'express';
import clientRoutes from './routes/clientRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas
app.use('/clientes', clientRoutes);
app.use('/direcciones', addressRoutes);
app.use('/ordenes', orderRoutes);

app.use(notFound);

// Manejo de Errores
app.use(errorHandler);

export default app;