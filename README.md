# API REST - Prueba Técnica

API REST desarrollada con Express.js para gestión de clientes, direcciones y órdenes.

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en producción
npm start
```

La API estará disponible en `http://localhost:3000`


## 🔌 Endpoints

### Clientes

- `GET /clientes` - Obtener todos los clientes
- `GET /clientes/:id` - Obtener cliente por ID
- `POST /clientes` - Crear nuevo cliente

### Direcciones

- `GET /direcciones` - Obtener todas las direcciones
- `POST /direcciones?id=3` - Actualizar dirección (ID por query param)

### Órdenes

- `POST /ordenes` - Crear orden con múltiples items
- `GET /ordenes` - Obtener todas las órdenes
- `GET /ordenes/:clientId` - Obtener órdenes por cliente
- `GET /ordenes/folio/:folio` - Obtener órdenes por folio
